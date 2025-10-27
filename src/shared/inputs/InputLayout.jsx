import React from "react";

export default function InputLayout({
  label,
  name,
  required,
  col,
  extraClassName,
  errorMessage,
  data,
  children,
  maxLength,
}) {
  return (
    <>
      <div className={`px-1 mb-3 col-${col} ${extraClassName}`}>
        <div className="flex flex-column gap-1">
          <div className="flex justify-content-between">
            <label htmlFor={name} className="text-lg flex font-font-medium">
              {label}
              {required ? <span className="error_text">*</span> : ""}
            </label>

            {maxLength && (
              <div>
                Maxlength: {maxLength - data?.[name].length}/{maxLength}
              </div>
            )}
          </div>
          {children}
          {errorMessage || data?.formErrors?.[name] ? (
            <small className="error_text">
              {errorMessage || data?.formErrors?.[name]}
            </small>
          ) : null}
        </div>
      </div>
    </>
  );
}
