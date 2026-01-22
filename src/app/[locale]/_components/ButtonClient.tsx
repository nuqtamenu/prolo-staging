"use client";

import { useLocale } from "next-intl";
import { Icon } from "@iconify/react";

type Props = {
  type?: "button" | "submit" | "reset";
  text: string;
  className?: string;
  direction?: "forward" | "backward";
  icon?: boolean;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function ButtonClient({
  type = "button",
  text,
  className,
  direction,
  icon = true,
  onClick,
  disabled,
  loading = false,
}: Props) {
  const locale = useLocale();
  return (
    <button
      disabled={loading || disabled}
      type={type}
      onClick={onClick && onClick}
      className={`group h-45px flex w-fit items-center rounded-full px-6 py-2 text-base font-medium transition duration-300 ${
        className && className
      } cursor-pointer disabled:opacity-60`}
    >
      {!loading ? (
        <>
          {text}
          {false && icon && direction && direction === "forward" ? (
            <Icon
              icon={"hugeicons:arrow-up-right-02"}
              className={`mx-2 hidden transition-transform ${locale}f size-5 duration-300`}
            />
          ) : (
            <Icon
              icon={"hugeicons:arrow-down-left-02"}
              className={`mx-2 hidden transition-transform ${locale}b size-5 duration-300`}
            />
          )}
        </>
      ) : (
        <Icon icon={"line-md:loading-twotone-loop"} className="size-5" />
      )}
    </button>
  );
}
