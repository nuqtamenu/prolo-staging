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
  const locales = useLocale();

  const onSubmit: SubmitHandler<SubscriptionInputs> = async data => {
    setIsLoading(true);
    const subscriptionData = { locales, data };
    try {
      axios.post("/api/subscribe", subscriptionData);
      setIsSubmitted(true);
      setIsLoading(false);
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
