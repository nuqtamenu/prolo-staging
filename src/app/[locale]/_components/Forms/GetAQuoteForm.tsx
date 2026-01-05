"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, SelectServices, Textarea, ButtonClient } from "../components";
import { useLocale, useMessages } from "next-intl";
import axios from "axios";
import { useState } from "react";

type Services = {
  individualServices: {
    title: string;
    links: { text: string; link: string; slug: string }[];
  };
  commercialSectorServices: {
    title: string;
    links: { text: string; link: string; slug: string }[];
  };
};

type ServicesOptions = {
  individualServices: {
    title: string;
    services: { text: string; value: string }[];
  };
  commercialSectorServices: {
    title: string;
    services: { text: string; value: string }[];
  };
};

type Inputs = {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  details: string;
};

type FormFields = {
  name: {
    label: string;
    placeholder: string;
    error: string;
  };
  email: {
    label: string;
    placeholder: string;
    error: string;
  };
  phone: {
    label: string;
    placeholder: string;
    error: string;
  };
  service: {
    label: string;
    placeholder: string;
    error: string;
  };
  address: {
    label: string;
    placeholder: string;
    error: string;
  };
  details: {
    label: string;
    placeholder: string;
  };
  submit: {
    text: string;
  };
};

type FormMessages = {
  fields: FormFields;
  messages: {
    getAQuote: string;
  };
};

export default function GetAQuoteForm({ slug }: { slug?: string }) {
  const getServices = (services: Services): ServicesOptions => {
    const individualServices = {
      title: services.individualServices.title,
      services: services.individualServices.links.map(link => {
        return { text: link.text, value: link.slug };
      }),
    };
    const commercialSectorServices = {
      title: services.commercialSectorServices.title,
      services: services.commercialSectorServices.links.map(link => {
        return { text: link.text, value: link.slug };
      }),
    };

    return { individualServices, commercialSectorServices };
  };
  const messages = useMessages();
  const servicesLinks = messages.links.services as Services;
  const services = getServices(JSON.parse(JSON.stringify(servicesLinks)));
  const formMessages = messages.forms as FormMessages;
  const fileds: FormFields = formMessages.fields;

  const getSelectedService = (slug: string | undefined) => {
    const getServiceText = (slug: string, text: string) => {
      const serviceType =
        slug.split("-")[0] === "individual"
          ? services.individualServices.title
          : slug.split("-")[0] === "commercial"
            ? services.commercialSectorServices.title
            : "";

      if (serviceType) {
        return `${text} (${serviceType})`;
      } else {
        return text;
      }
    };
    if (slug) {
      const service = [
        ...servicesLinks.individualServices.links,
        ...servicesLinks.commercialSectorServices.links,
      ].find(link => link.slug === slug);

      if (service) {
        return {
          value: service.slug,
          text: getServiceText(service.slug, service.text),
        };
      }
    }

    return {
      value: "",
      text: "",
    };
  };

  const defaultService: string = getSelectedService(slug).value;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      service: defaultService,
    },
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const locales = useLocale();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsLoading(true);
    try {
      const reqBody = {
        locales,
        data: { ...data, service: getSelectedService(data.service).text || "Service Unknown" },
      };
      axios.post("/api/get-a-quote", reqBody);
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsLoading(false);
      console.log("Error occured in Contact Us Form", error);
    }
  };

  if (isSubmitted) {
    return (
      <p className="text-theme-blue text-center text-2xl font-bold">
        {formMessages.messages.getAQuote}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full grid-cols-1 gap-2 md:grid-cols-2"
    >
      {/* Name */}
      <Input
        label={fileds.name.label}
        id="name"
        type="text"
        placeholder={fileds.name.placeholder}
        error={errors.name && fileds.name.error}
        icon="fluent:rename-a-20-regular"
        registerProps={{ ...register("name", { required: true }) }}
      />

      {/* Email */}
      <Input
        label={fileds.email.label}
        id="email"
        type="email"
        placeholder={fileds.email.placeholder}
        error={errors.email && fileds.email.error}
        icon="material-symbols:alternate-email"
        registerProps={{ ...register("email", { required: true }) }}
      />

      {/* Phone */}
      <Input
        label={fileds.phone.label}
        id="phone"
        type="tel"
        placeholder={fileds.phone.placeholder}
        error={errors.phone && errors.phone.message}
        icon="hugeicons:call-02"
        registerProps={{
          ...register("phone", {
            required: true,
          }),
        }}
      />

      {/* Service Select */}
      <SelectServices
        label={fileds.service.label}
        icon="hugeicons:truck-delivery"
        options={services}
        id="service"
        placeholder={fileds.service.placeholder}
        registerProps={{ ...register("service", { required: true }) }}
        error={errors.service && fileds.service.error}
      />

      {/* Address */}
      <div className="w-full md:col-span-2">
        <Input
          label={fileds.address.label}
          id="address"
          type="text"
          placeholder={fileds.address.placeholder}
          error={errors.name && fileds.address.error}
          icon="iconamoon:location-light"
          registerProps={{ ...register("address", { required: true }) }}
        />
      </div>

      {/* Message */}
      <div className="w-full md:col-span-2">
        <Textarea
          label={fileds.details.label}
          icon="solar:notes-linear"
          placeholder={fileds.details.placeholder}
          id="details"
          registerProps={{ ...register("details") }}
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-end md:col-span-2">
        <ButtonClient
          type="submit"
          loading={isLoading}
          text={messages.ctas.getAQuote}
          direction="forward"
          className="bg-theme-blue hover:bg-blue-hover text-white"
        />
      </div>
    </form>
  );
}
