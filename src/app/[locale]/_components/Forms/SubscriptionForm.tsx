"use client";
type SubscriptionInputs = {
  email: string;
};

type FormFields = {
  email: {
    label: string;
    placeholder: string;
    error: string;
  };
};
type FormMessages = {
  fields: FormFields;
  messages: {
    subscription: string;
  };
};

import { useForm, SubmitHandler } from "react-hook-form";
import { Input, ButtonClient } from "../components";
import { useLocale, useMessages } from "next-intl";
import axios from "axios";
import { useState } from "react";
import { EmailMessages } from "@/lib/types";
import { getSubscritionEmailBody } from "@/lib/emailBodies";

export default function SubscriptionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionInputs>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messages = useMessages();
  const formMessages = messages.forms as FormMessages;
  const fields = formMessages.fields;
  const emailMessages = messages.emails as EmailMessages;
  const locales = useLocale();

  const onSubmit: SubmitHandler<SubscriptionInputs> = async data => {
    setIsLoading(true);
    try {
      await axios.post("/api/subscribe", {
        email: data.email,
      });

      // HTML Content For Email
      const customerHtml = getSubscritionEmailBody("customer", data, locales, emailMessages);
      const companyHtml = getSubscritionEmailBody("company", data, locales, emailMessages);

      // Sending To Customer
      await axios.post("/api/send-email", {
        to: data.email,
        subject: emailMessages.subscription.customer.heading,
        html: customerHtml,
      });
      // Sending To Company
      await axios.post("/api/send-email", {
        to: "nuqtamenu@gmail.com",
        subject: emailMessages.subscription.customer.heading,
        html: companyHtml,
      });

      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsLoading(false);
      console.log("Error occured while subscribing", error);
    }
  };

  if (isSubmitted) {
    return <p className="font-bold text-yellow-300">{formMessages.messages.subscription}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Email */}
      <Input
        id="email"
        type="email"
        placeholder={fields.email.placeholder}
        error={errors.email && fields.email.error}
        icon="material-symbols:alternate-email"
        registerProps={{ ...register("email", { required: true }) }}
        className="text-black"
      />

      {/* Submit */}
      <div className="mt-2">
        <ButtonClient
          type="submit"
          text={messages.ctas.subscribe}
          loading={isLoading}
          direction="forward"
          className="hover:bg-blue-hover rounded-xl bg-white text-sm text-black hover:text-white"
        />
      </div>
    </form>
  );
}
