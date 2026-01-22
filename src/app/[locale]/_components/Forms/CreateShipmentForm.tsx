"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Select, Textarea, ButtonClient } from "../components";
import { useMessages } from "next-intl";
import { useLocale, useTranslations } from "use-intl";
import englishAddresses from "@/adresses/english.json";
import arbicAddresses from "@/adresses/arabic.json";
import { useRouter } from "next/navigation";
import type {
  CreateShipmentFormInputs,
  PaymentLinkTranslation,
  SaveFormAndPaymentReqBody,
} from "@/lib/types";
import axios from "axios";
import { createShipmentReference } from "./utils/createShipmentReferece";
import { getLinkExpiryDate } from "./utils/getLinkExpiryDate";
import { getPaymentLink } from "./utils/getPaymentLink";

export default function CreateShipmentForm() {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateShipmentFormInputs>({
    defaultValues: {
      cod: "0",
      shipmentType: "COD",
      quantity: "1",
    },
  });

  const locale = useLocale();
  const isEn = locale === "en";
  const [loader, setLoader] = useState<boolean>(false);

  const [step, setStep] = useState(1);

  const shipmentTypeOptions = [
    { value: "COD", name: "COD" },
    { value: "REGULAR", name: "PREPAID" },
  ];

  const router = useRouter();

  // 🟦 Validation map for each step
  const stepValidationMap: Record<number, (keyof CreateShipmentFormInputs)[]> = {
    1: [
      "senderName",
      "senderEmail",
      "senderPhone",
      "originRegionId",
      "originCityId",
      "originVillageId",
      "originAddressLine1",
    ],
    2: [
      "receiverName",
      "receiverEmail",
      "receiverPhone",
      "destinationRegionId",
      "destinationCityId",
      "destinationVillageId",
      "destinationAddressLine1",
    ],
    3: ["cod", "notes", "shipmentType", "quantity", "description"],
  };

  // STEP CONTROLLERS
  // 1. Next Step
  const nextStep = async () => {
    const fieldsToValidate = stepValidationMap[step] || [];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(prev => prev + 1);
  };
  // 2. Previous Step
  const prevStep = () => setStep(prev => prev - 1);

  // TRANSLATIONS & MESSAGES
  const ctas = useTranslations("ctas");
  const messagesData = useMessages();
  const messages = messagesData.forms.fields;
  const legends = messagesData.forms.legends;
  const formSteps: string[] = messagesData.createShipmentPage.formSteps;
  const loadingText = messagesData.createShipmentPage.loadingText as string;
  const paymentLinkMessages = messagesData.createShipmentPage.paymentLink as PaymentLinkTranslation;

  // ADDRESS DATA & DEPENDENCIES
  const addresses = isEn ? englishAddresses : arbicAddresses;
  function getAddresses(villId: string) {
    const engAdd = englishAddresses.find(add => add.villageId === villId);
    const arAdd = arbicAddresses.find(add => add.villageId === villId);

    return {
      englishAddress: `${engAdd?.villageName}, ${engAdd?.cityName}, ${engAdd?.regionName}`,
      arabicAddress: `${arAdd?.villageName}, ${arAdd?.cityName}, ${arAdd?.regionName}`,
    };
  }

  // 1. For Cities (both Origin & Destination)
  const cities = addresses
    .filter((addr, ind, self) => {
      return ind === self.findIndex(t => t.cityId === addr.cityId);
    })
    .map(addr => {
      return {
        value: addr.cityId,
        name: addr.cityName,
      };
    })
    .sort((a, b) =>
      a.name
        .toLocaleLowerCase()
        .localeCompare(b.name.toLocaleLowerCase(), locale, { sensitivity: "base" })
    );

  // 2. For Destination Adresses
  const [destinationVillages, setDestinationVillages] = useState<
    { value: string | number; name: string }[]
  >([]);
  const destinationCityId = watch("destinationCityId");

  useEffect(() => {
    // Destination City is changed
    if (destinationCityId) {
      // Reset Villages
      setDestinationVillages([]);
      setValue(
        "destinationRegionId",
        addresses.find(addr => addr.cityId === destinationCityId)?.regionId || ""
      );
      setValue("destinationVillageId", "");

      const villages = addresses
        .filter(addr => addr.cityId === destinationCityId)
        .map(addr => {
          return {
            value: addr.villageId,
            name: addr.villageName,
          };
        })
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale, { sensitivity: "base" })
        );
      setDestinationVillages(villages);
    }
  }, [destinationCityId, addresses, setValue, locale]);

  // 3. For Origin Adresses
  const [originVillages, setOriginVillages] = useState<{ value: string | number; name: string }[]>(
    []
  );
  const originCityId = watch("originCityId");

  useEffect(() => {
    // City is changed
    if (originCityId) {
      // Reset Villages
      setOriginVillages([]);
      setValue(
        "originRegionId",
        addresses.find(addr => addr.cityId === originCityId)?.regionId || ""
      );
      setValue("originVillageId", "");

      const villages = addresses
        .filter(addr => addr.cityId === originCityId)
        .map(addr => {
          return {
            value: addr.villageId,
            name: addr.villageName,
          };
        })
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale, { sensitivity: "base" })
        );
      setOriginVillages(villages);
    }
  }, [originCityId, addresses, setValue, locale]);

  // SHIPMENT TYPE & COD LOGIC
  const [disableCod, setDisableCod] = useState(false);
  const shipmentType = watch("shipmentType");

  useEffect(() => {
    if (shipmentType && shipmentType !== "COD") {
      setDisableCod(true);
      setValue("cod", "0");
    }
    if (shipmentType === "COD") {
      setDisableCod(false);
    }
  }, [shipmentType, setValue]);

  // FORM SUBMISSION & PAYMENT LINK GENERATION
  const [paymentLink, setPaymentLink] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [amount, setAmount] = useState(0);

  const visitPaymentLink = (link: string) => {
    return router.push(link);
  };
  // HANDLE FORM SUBMISSION
  const onSubmit: SubmitHandler<CreateShipmentFormInputs> = async data => {
    const referenceNumber = createShipmentReference(locale as "en" | "ar");
    const linkExpiry = getLinkExpiryDate(2);
    const shipmentAmount = data.originCityId === data.destinationCityId ? 35 : 75;
    setAmount(shipmentAmount);

    // Generate Link
    setLoader(true);

    const paymentLinkResponse = await getPaymentLink({
      firstName: data.senderName,
      email: data.senderEmail,
      urlExpiry: linkExpiry,
      referenceNumber: referenceNumber,
      amount: shipmentAmount,
      currency: "SAR",
      reportingField1: "Testing 1",
    });

    if (paymentLinkResponse && paymentLinkResponse !== null) {
      setPaymentLink(paymentLinkResponse.paymentLink.paymentLink);
      setNotifyEmail(data.senderEmail);

      // Save Shipment Data & Payment Link

      // Build addresses
      const originAddr = getAddresses(data.originVillageId);
      const destAddr = getAddresses(data.destinationVillageId);

      const reqBody: SaveFormAndPaymentReqBody = {
        formData: {
          ...data,
          destinationAddressArabic: `${data.destinationAddressLine1}, ${destAddr.arabicAddress}`,
          destinationAddressEnglish: `${data.destinationAddressLine1}, ${destAddr.englishAddress}`,
          originAddressArabic: `${data.originAddressLine1}, ${originAddr.arabicAddress}`,
          originAddressEnglish: `${data.originAddressLine1}, ${originAddr.englishAddress}`,
          paymentLinkId: paymentLinkResponse.id,
          referenceNumber: referenceNumber,
          locale: locale as "en" | "ar",
        },
        paymentLink: paymentLinkResponse,
      };

      await axios.post("/api/save-form-and-payment-data", reqBody);
      setLoader(false);
      nextStep();
    }

    if (!paymentLinkResponse || paymentLinkResponse === null) {
      setLoader(false);
      nextStep();
    }

    return;
  };

  if (loader) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
        <div className="loader"></div>
        <h3 className="mt-6 text-center text-2xl">{loadingText}</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full space-y-6">
      {/* Step Indicator */}
      <div className="mb-6 flex items-center justify-between">
        {formSteps.map((label, index) => (
          <div
            key={index}
            className={`flex-1 border-b-4 py-2 text-center ${
              step === index + 1 ? "border-theme-blue" : "border-gray-300"
            }`}
          >
            {index + 1}. {label}
          </div>
        ))}
      </div>

      {/* -------------------- STEP 1 -------------------- */}
      {step === 1 && (
        <div>
          <fieldset className="col-span-2">
            <legend className="text-theme-blue my-4 text-xl font-medium">
              {legends?.senderInformation}
            </legend>
            <div className="form-grid">
              <Input
                icon="fluent:rename-a-20-regular"
                label={messages.senderName.label}
                id="senderName"
                placeholder={messages.senderName.placeholder}
                error={errors.senderName && messages.senderName.error}
                registerProps={{ ...register("senderName", { required: true }) }}
              />

              <Input
                icon="material-symbols:alternate-email"
                label={messages.senderEmail.label}
                id="senderEmail"
                placeholder={messages.senderEmail.placeholder}
                error={errors.senderEmail && messages.senderEmail.error}
                registerProps={{ ...register("senderEmail", { required: true }) }}
              />

              <Input
                icon="famicons:business-outline"
                label={messages.businessSenderName.label}
                id="businessSenderName"
                placeholder={messages.businessSenderName.placeholder}
                error={errors.businessSenderName && messages.businessSenderName.error}
                registerProps={{ ...register("businessSenderName") }}
              />

              <Input
                icon="hugeicons:call-02"
                label={messages.senderPhone.label}
                id="senderPhone"
                type="tel"
                placeholder={messages.senderPhone.placeholder}
                error={errors.senderPhone && messages.senderPhone.error}
                registerProps={{
                  ...register("senderPhone", {
                    required: true,
                    pattern: {
                      value: /^[0-9+\-\s()]{7,15}$/, // ✅ allows digits, +, -, spaces, (), length 7–15
                      message: messages.senderPhone.error || "Please enter a valid phone number",
                    },
                  }),
                }}
              />
            </div>
          </fieldset>
          <fieldset className="col-span-2">
            <legend className="text-theme-blue py-4 text-xl font-medium">
              {legends?.originAddress}
            </legend>
            <div className="form-grid">
              <Select
                icon="solar:city-outline"
                label={messages.originCityId.label}
                id="originCityId"
                options={cities}
                placeholder={messages.originCityId.placeholder}
                registerProps={{ ...register("originCityId", { required: true }) }}
                error={errors.originCityId && messages.originCityId.error}
              />

              <Select
                icon="fontisto:holiday-village"
                label={messages.originVillageId.label}
                id="originVillageId"
                options={originVillages}
                placeholder={messages.originVillageId.placeholder}
                registerProps={{ ...register("originVillageId", { required: true }) }}
                error={errors.originVillageId && messages.originVillageId.error}
              />

              <Input
                icon="fluent:street-sign-20-regular"
                label={messages.originAddressLine1.label}
                id="originAddressLine1"
                placeholder={messages.originAddressLine1.placeholder}
                error={errors.originAddressLine1 && messages.originAddressLine1.error}
                registerProps={{ ...register("originAddressLine1", { required: true }) }}
              />
            </div>
          </fieldset>
        </div>
      )}

      {/* -------------------- STEP 2 -------------------- */}
      {step === 2 && (
        <div>
          <fieldset className="col-span-2">
            <legend className="text-theme-blue py-4 text-xl font-medium">
              {legends?.receiverInformation}
            </legend>
            <div className="form-grid">
              <Input
                icon="fluent:rename-a-20-regular"
                label={messages.receiverName.label}
                id="receiverName"
                placeholder={messages.receiverName.placeholder}
                error={errors.receiverName && messages.receiverName.error}
                registerProps={{ ...register("receiverName", { required: true }) }}
              />

              <Input
                icon="material-symbols:alternate-email"
                label={messages.receiverEmail.label}
                id="receiverEmail"
                placeholder={messages.receiverEmail.placeholder}
                error={errors.receiverEmail && messages.receiverEmail.error}
                registerProps={{ ...register("receiverEmail", { required: true }) }}
              />

              <Input
                icon="hugeicons:call-02"
                label={messages.receiverPhone.label}
                id="receiverPhone"
                type="tel"
                placeholder={messages.receiverPhone.placeholder}
                error={errors.receiverPhone && messages.receiverPhone.error}
                registerProps={{
                  ...register("receiverPhone", {
                    required: true,
                    pattern: {
                      value: /^[0-9+\-\s()]{7,15}$/, // ✅ allows digits, +, -, spaces, (), length 7–15
                      message: messages.senderPhone.error || "Please enter a valid phone number",
                    },
                  }),
                }}
              />
            </div>
          </fieldset>

          <fieldset className="col-span-2">
            <legend className="text-theme-blue py-4 text-xl font-medium">
              {legends?.destinationAddress}
            </legend>
            <div className="form-grid">
              <Select
                icon="solar:city-outline"
                label={messages.destinationCityId.label}
                id="destinationCityId"
                options={cities}
                placeholder={messages.destinationCityId.placeholder}
                registerProps={{ ...register("destinationCityId", { required: true }) }}
                error={errors.destinationCityId && messages.destinationCityId.error}
              />

              <Select
                icon="fontisto:holiday-village"
                label={messages.destinationVillageId.label}
                id="destinationVillageId"
                options={destinationVillages}
                placeholder={messages.destinationVillageId.placeholder}
                registerProps={{ ...register("destinationVillageId", { required: true }) }}
                error={errors.destinationVillageId && messages.destinationVillageId.error}
              />

              <Input
                icon="fluent:street-sign-20-regular"
                label={messages.destinationAddressLine1.label}
                id="destinationAddressLine1"
                placeholder={messages.destinationAddressLine1.placeholder}
                error={errors.destinationAddressLine1 && messages.destinationAddressLine1.error}
                registerProps={{ ...register("destinationAddressLine1", { required: true }) }}
              />
            </div>
          </fieldset>
        </div>
      )}

      {/* -------------------- STEP 3 -------------------- */}
      {step === 3 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            icon="streamline-ultimate:shipment-star"
            label={messages.shipmentType.label}
            id="shipmentType"
            options={shipmentTypeOptions}
            placeholder={messages.shipmentType.placeholder}
            registerProps={{ ...register("shipmentType", { required: true }) }}
            error={errors.shipmentType && messages.shipmentType.error}
          />

          <Input
            icon="mdi:cod"
            label={messages.cod.label}
            id="cod"
            disabled={disableCod}
            min="0"
            type="number"
            placeholder={messages.cod.placeholder}
            error={errors.cod && messages.cod.error}
            registerProps={{ ...register("cod", { required: true }) }}
          />

          <Input
            icon="fluent-mdl2:quantity"
            label={messages.quantity.label}
            id="quantity"
            type="number"
            min="1"
            placeholder={messages.quantity.placeholder}
            error={errors.quantity && messages.quantity.error}
            registerProps={{ ...register("quantity", { required: true }) }}
          />

          <div className="form-grid md:col-span-2">
            <Textarea
              icon="hugeicons:note"
              label={messages.notes.label}
              id="notes"
              placeholder={messages.notes.placeholder}
              error={errors.notes && messages.notes.error}
              registerProps={{ ...register("notes", { required: false }) }}
            />

            <Textarea
              icon="hugeicons:package-open"
              label={messages.description.label}
              id="description"
              placeholder={messages.description.placeholder}
              error={errors.description && messages.description.error}
              registerProps={{ ...register("description", { required: false }) }}
            />
          </div>
        </div>
      )}

      {/* -------------------- STEP 4 -------------------- */}
      {step === 4 && paymentLink ? (
        <div className="mx-auto w-full max-w-[600px] p-4">
          <h3 className="font-capitalize mb-4 text-center text-xl font-medium">
            {paymentLinkMessages.linkGenerated}
          </h3>
          <h3 className="font-capitalize mb-4 text-center text-xl font-medium">
            {amount} {paymentLinkMessages.amountToPay}
          </h3>
          <p className="my-2">{paymentLinkMessages.expiryNotice}</p>
          <p>{paymentLinkMessages.successNote}</p>
          <ul>
            <li>{paymentLinkMessages.shipmentCreated}</li>
            <li>
              {paymentLinkMessages.emailNotification}
              <span className="font-medium">{notifyEmail}</span>
            </li>
          </ul>
          <p className="mt-2 mb-4">{paymentLinkMessages.supportNote}</p>
          <div className="flex items-center justify-center">
            <ButtonClient
              type="button"
              text={paymentLinkMessages.payNow}
              icon={false}
              className="rounded-x bg-theme-blue hover:bg-blue-hover text-white"
              onClick={() => visitPaymentLink(paymentLink)}
            />
          </div>
        </div>
      ) : (
        step === 4 && (
          <div className="mx-auto w-full max-w-[600px] p-4">
            <h3 className="font-capitalize mb-4 text-center text-xl font-medium text-red-600">
              {paymentLinkMessages.failedTitle}
            </h3>
            <p className="text-center">{paymentLinkMessages.failedMessage}</p>
          </div>
        )
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <ButtonClient
            disabled={step === 4}
            type="button"
            text={ctas("back")}
            icon={false}
            className={`rounded-xl bg-gray-300 text-black ${step === 4 ? "hidden" : ""}`}
            onClick={prevStep}
          />
        )}

        {step < 3 && (
          <ButtonClient
            disabled={step === 4}
            type="button"
            text={ctas("next")}
            icon={false}
            className="bg-theme-blue rounded-xl text-white"
            onClick={nextStep}
          />
        )}

        {step === 3 && (
          <ButtonClient
            type="submit"
            text={`${ctas("checkout")}`}
            icon={false}
            className="rounded-xl bg-green-500 text-white"
          />
        )}
      </div>
    </form>
  );
}
