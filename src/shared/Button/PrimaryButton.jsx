import React from "react";
import { Button } from "primereact/button";

export default function PrimaryButton({
  type,
  onClick,
  label,
  loading,
  extraClassName,
  ...props
}) {
  return (
    <Button
      type={type}
      label={label}
      onClick={onClick}
      loading={loading}
      className={`mx-1 my-2 py-2 px-4 bg_Primary border_Primary text-white font-semibold text-lg border-rounded-lg border-round-3xl ${extraClassName}`}
      {...props}
    />
  );
}
export function PrimaryButtonOutlined({
  type,
  onClick,
  label,
  loading,
  extraClassName,
  ...props
}) {
  return (
    <Button
      type={type}
      label={label}
      onClick={onClick}
      loading={loading}
      className={`mx-1 p-button-outlined my-2 py-2 px-4 border_Primary  text_Primary bg-white font-semibold text-lg border-rounded-lg border-round-3xl ${extraClassName}`}
      {...props}
    />
  );
}
