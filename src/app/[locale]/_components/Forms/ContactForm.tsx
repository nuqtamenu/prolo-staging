"use client";
type ContactInputs = {
  name: string;
  email: string;
  city: string;
  phone: string;
  company?: string;
  message: string;
};

type ContactFormFields = {
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
  city: {
    label: string;
    placeholder: string;
    error: string;
  };
  phone: {
    label: string;
    placeholder: string;
    error: string;
    contactPageError: string;
  };
  company: {
    label: string;
    placeholder: string;
  };
  message: {
    label: string;
    placeholder: string;
    error: string;
  };
  submit: {
    text: string;
  };
};

type FormMessages = {
  fields: ContactFormFields;
  messages: {
    contact: string;
  };
};

import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Textarea, ButtonClient } from "../components";
import { useLocale, useMessages } from "next-intl";
import axios from "axios";
import { useState } from "react";
export default function ContactForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInputs>();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const locales = useLocale();

  const onSubmit: SubmitHandler<ContactInputs> = async data => {
    setIsLoading(true);

    const { name, email, phone, city, company, message } = data;
    try {
      const reqBody = {
        locales,
        data: { name, email, phone, city: city || "-", company: company || "-", message },
      };
      axios.post("/api/contact", reqBody);
      setIsLoading(false);
      reset();
      setIsSubmitted(true);
    } catch (error) {
      setIsLoading(false);
      console.log("Error occured in Contact Us Form", error);
    }
  };

  const messages = useMessages();
  const formMessages = messages.forms as FormMessages;
  const fields: ContactFormFields = formMessages.fields;

  if (isSubmitted) {
    return (
      <p className="text-theme-blue text-center text-2xl font-bold">
        {formMessages.messages.contact}
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
        label={fields.name.label + `*`}
        id="name"
        type="text"
        placeholder={fields.name.placeholder}
        error={errors.name && fields.name.error}
        icon="fluent:rename-a-20-regular"
        registerProps={{ ...register("name", { required: true }) }}
      />

      {/* Email */}
      <Input
        label={fields.email.label + `*`}
        id="email"
        type="email"
        placeholder={fields.email.placeholder}
        error={errors.email && fields.email.error}
        icon="material-symbols:alternate-email"
        registerProps={{ ...register("email", { required: true }) }}
      />

      {/* City */}
      <Input
        label={fields.city.label}
        id="city"
        type="text"
        placeholder={fields.city.placeholder}
        error={errors.city && fields.city.error}
        icon="solar:city-outline"
        registerProps={{ ...register("city") }}
      />

      {/* Phone */}
      <Input
        label={fields.phone.label + `*`}
        id="phone"
        type="tel"
        placeholder={fields.phone.placeholder}
        error={errors.phone && errors.phone.message}
        icon="hugeicons:call-02"
        registerProps={{
          ...register("phone", {
            required: true,
          }),
        }}
      />

      {/* Company */}
      <div className="w-full md:col-span-2">
        <Input
          label={fields.company.label}
          id="company"
          type="text"
          placeholder={fields.company.placeholder}
          icon="mdi:office-building"
          registerProps={{ ...register("company") }}
        />
      </div>

      {/* Message */}
      <div className="w-full md:col-span-2">
        <Textarea
          label={fields.message.label + `*`}
          icon="solar:notes-linear"
          placeholder={fields.message.placeholder}
          id="message"
          error={errors.message && fields.message.error}
          registerProps={{ ...register("message", { required: true }) }}
        />
      </div>

      {/* Submit */}
      <div className="mt-4 flex w-full items-center justify-end md:col-span-2">
        <ButtonClient
          type="submit"
          text={messages.ctas.sendMessage}
          loading={isLoading}
          direction="forward"
          className="bg-theme-blue hover:bg-blue-hover text-white"
        />
      </div>
    </form>
  );
}
