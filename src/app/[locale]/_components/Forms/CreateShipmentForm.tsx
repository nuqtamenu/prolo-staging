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
  ShipmentResponse,
  ApiError,
  CreateShipmentFormData,
} from "@/lib/types";

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
      "senderPhone",
      "originRegionId",
      "originCityId",
      "originVillageId",
      "originAddressLine1",
    ],
    2: [
      "receiverName",
      "receiverPhone",
      "destinationRegionId",
      "destinationCityId",
      "destinationVillageId",
      "destinationAddressLine1",
    ],
    3: ["cod", "notes", "shipmentType", "quantity", "description"],
  };

  const nextStep = async () => {
    const fieldsToValidate = stepValidationMap[step] || [];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const ctas = useTranslations("ctas");
  const messagesData = useMessages();
  const messages = messagesData.forms.fields;
  const legends = messagesData.forms.legends;
  const formSteps: string[] = messagesData.createShipmentPage.formSteps;

  const addresses = isEn ? englishAddresses : arbicAddresses;
  const regions = addresses
    .filter((addr, ind, self) => {
      return ind === self.findIndex(t => t.regionId === addr.regionId);
    })
    .map(addr => {
      return {
        value: addr.regionId,
        name: addr.regionName,
      };
    })
    .sort((a, b) =>
      a.name
        .toLocaleLowerCase()
        .localeCompare(b.name.toLocaleLowerCase(), locale, { sensitivity: "base" })
    );

  const destinationRegionId = watch("destinationRegionId");
  const [destinationCities, setDestinationCities] = useState<
    { value: string | number; name: string }[]
  >([]);
  const [destinationVillages, setDestinationVillages] = useState<
    { value: string | number; name: string }[]
  >([]);
  const destinationCityId = watch("destinationCityId");

  useEffect(() => {
    // Destination Region is changed
    if (destinationRegionId) {
      // Reset Cities & Villages
      setDestinationCities([]);
      setDestinationVillages([]);
      setValue("destinationCityId", "");
      setValue("destinationVillageId", "");
      // Find cities in that destination
      const cities = addresses
        .filter(addr => addr.regionId === destinationRegionId)
        .map(addr => {
          return {
            value: addr.cityId,
            name: addr.cityName,
          };
        })
        .filter((city, ind, self) => {
          return ind === self.findIndex(cit => cit.value === city.value);
        })
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale, { sensitivity: "base" })
        );

      setDestinationCities(cities);
    }
  }, [destinationRegionId, addresses, locale, setValue]);

  useEffect(() => {
    // Destination City is changed

    if (destinationCityId) {
      // Reset Villages
      setDestinationVillages([]);
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

  // For Origin Adresses
  const originRegionId = watch("originRegionId");
  const [originCities, setOriginCities] = useState<{ value: string | number; name: string }[]>([]);
  const [originVillages, setOriginVillages] = useState<{ value: string | number; name: string }[]>(
    []
  );
  const originCityId = watch("originCityId");

  useEffect(() => {
    // Origin is changed
    if (originRegionId) {
      // Reset Cities & Villages
      setOriginCities([]);
      setOriginVillages([]);
      setValue("originCityId", "");
      setValue("originVillageId", "");
      // Find cities in that origin
      const cities = addresses
        .filter(addr => addr.regionId === originRegionId)
        .map(addr => {
          return {
            value: addr.cityId,
            name: addr.cityName,
          };
        })
        .filter((city, ind, self) => {
          return ind === self.findIndex(cit => cit.value === city.value);
        })
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale, { sensitivity: "base" })
        );
      console.log("cities: ", cities);

      setOriginCities(cities);
    }
  }, [originRegionId, addresses, locale, setValue]);

  useEffect(() => {
    // City is changed
    if (originCityId) {
      // Reset Villages
      setOriginVillages([]);
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

  // Shipment type functionality
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

  const onSubmit: SubmitHandler<CreateShipmentFormInputs> = async data => {
    setLoader(true);

    const shipmentResponse: ShipmentResponse | ApiError = await fetch("/api/create-shipment", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(res => res.json());

    if ("error" in shipmentResponse) {
      router.push(`/${locale}/create-shipment/failure`);
      return;
    }

    // Build addresses
    const originAddr = addresses.find(addr => addr.villageId === data.originVillageId);
    const destAddr = addresses.find(addr => addr.villageId === data.destinationVillageId);

    const shipmentData: CreateShipmentFormData = {
      id: shipmentResponse.id,
      barcode: shipmentResponse.barcode,
      cod: data.cod,
      senderName: data.senderName,
      senderBusinessName: data.businessSenderName,
      senderPhone: data.senderPhone,
      originAddress: !originAddr
        ? ""
        : [
            data.originAddressLine1,
            originAddr.villageName,
            originAddr.cityName,
            originAddr.regionName,
          ].join(", "),
      receiverName: data.receiverName,
      receiverPhone: data.receiverPhone,
      destinationAddress: !destAddr
        ? ""
        : [
            data.destinationAddressLine1,
            destAddr.villageName,
            destAddr.cityName,
            destAddr.regionName,
          ].join(", "),
      shipmentType: data.shipmentType as "COD" | "REGULAR" | "SWAP" | "BRING",
      quantity: data.quantity,
      notes: data.notes,
      description: data.description,
    };

    fetch("/api/save-shipment", {
      method: "POST",
      body: JSON.stringify(shipmentData),
    }).finally(() => {
      // Redirect After Saving
      router.push(
        `/${locale}/create-shipment/success?id=${shipmentResponse.id}&barcode=${shipmentResponse.barcode}`
      );
    });
  };

  if (loader) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
        <div className="loader"></div>
        <h3 className="mt-6 text-center text-2xl">Creating Your Shipment</h3>
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
            {index + 1}.{label}
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
                icon="oui:vis-map-region"
                label={messages.originRegionId.label}
                id="originRegionId"
                options={regions}
                placeholder={messages.originRegionId.placeholder}
                registerProps={{ ...register("originRegionId", { required: true }) }}
                error={errors.originRegionId && messages.originRegionId.error}
              />

              <Select
                icon="solar:city-outline"
                label={messages.originCityId.label}
                id="originCityId"
                options={originCities}
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
                icon="oui:vis-map-region"
                label={messages.destinationRegionId.label}
                id="destinationRegionId"
                options={regions}
                placeholder={messages.destinationRegionId.placeholder}
                registerProps={{ ...register("destinationRegionId", { required: true }) }}
                error={errors.destinationRegionId && messages.destinationRegionId.error}
              />

              <Select
                icon="solar:city-outline"
                label={messages.destinationCityId.label}
                id="destinationCityId"
                options={destinationCities}
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

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <ButtonClient
            type="button"
            text={ctas("back")}
            icon={false}
            className="rounded-xl bg-gray-300 text-black"
            onClick={prevStep}
          />
        )}

        {step < 3 && (
          <ButtonClient
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
            text={ctas("createShipment")}
            icon={false}
            className="rounded-xl bg-green-500 text-white"
          />
        )}
      </div>
    </form>
  );
}
