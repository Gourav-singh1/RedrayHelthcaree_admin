import InputLayout from "./InputLayout";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";

export function CustomForm({ children, ...props }) {
  return (
    <div className="grid grid-nogutter contact-form " {...props}>
      {children}
    </div>
  );
}

// custom input  ======================>
export const CustomInput = ({
  label,
  name,
  data,
  value,
  onChange,
  errorMessage,
  extraClassName,
  required,
  col,
  inputClass,
  maxLength,
  placeholder,
  ...props
}) => {
  return (
    <InputLayout
      col={col || 6}
      label={label}
      name={name}
      required={required}
      extraClassName={extraClassName}
      data={data}
      errorMessage={errorMessage}
      maxLength={maxLength}
    >
      <InputText
        id={name}
        name={name}
        placeholder={placeholder}
        value={value || data?.[name]}
        onChange={(e) =>
          onChange &&
          onChange({
            ...e,
            name: e.target.name,
            value: e.target.value.slice(0, maxLength),
          })
        }
        className={`w-full p-2 text-sm  input-underline ${
          inputClass ? inputClass : ""
        } ${errorMessage ? "p-invalid" : ""}`}
        {...props}
      />
    </InputLayout>
  );
};
// CustomTextArea =================
export const CustomTextArea = ({
  label,
  name,
  onChange,
  data,
  value,
  errorMessage,
  extraClassName,
  required,
  col,
  inputClass,
  maxLength,
  ...props
}) => {
  return (
    <InputLayout
      col={col || 12}
      label={label}
      name={name}
      required={required}
      extraClassName={extraClassName}
      data={data}
      errorMessage={errorMessage}
      maxLength={maxLength}
    >
      <InputTextarea
        id={name}
        name={name}
        value={value || data?.[name]}
        onChange={(e) =>
          onChange &&
          onChange({
            name: e.target.name,
            value: e.target.value.slice(0, maxLength),
            ...e,
          })
        }
        className={`w-full p-2 text-sm  input-underline ${
          inputClass ? inputClass : ""
        } ${errorMessage ? "p-invalid" : ""}`}
        {...props}
      />
      {errorMessage ? <small className="p-error">{errorMessage}</small> : null}
    </InputLayout>
  );
};

// Dropdown ================================>

export const CustomDropDown = ({
  label,
  name,
  onChange,
  data,
  value,
  errorMessage,
  extraClassName,
  required,
  col,
  inputClass,
  ...props
}) => {
  return (
    <InputLayout
      col={col || 6}
      label={label}
      name={name}
      required={required}
      extraClassName={extraClassName}
      data={data}
      errorMessage={errorMessage}
    >
      <Dropdown
        id={name}
        name={name}
        value={value || data?.[name]}
        onChange={(e) =>
          onChange && onChange({ ...e, name: e.target.name, value: e.value })
        }
        className={`w-full ${inputClass ? inputClass : ""} ${
          errorMessage ? "p-invalid" : ""
        }`}
        optionLabel="name"
        placeholder={props.placeholder || `Select ${label}`}
        {...props}
      />
      {errorMessage ? <small className="p-error">{errorMessage}</small> : null}
    </InputLayout>
  );
};

/// password ==============

export const CustomPassword = ({
  label,
  name,
  data,
  value,
  onChange,
  errorMessage,
  extraClassName,
  required,
  col,
  inputClass,
  maxLength,
  ...props
}) => {
  return (
    <InputLayout
      col={col || 6}
      label={label}
      name={name}
      required={required}
      extraClassName={extraClassName}
      data={data}
      errorMessage={errorMessage}
      maxLength={maxLength}
    >
      <Password className="w-full"
        toggleMask
        feedback={false}
        id={name}
        name={name}
        value={value || data?.[name]}
        onChange={(e) =>
          onChange &&
          onChange({
            ...e,
            name: e.target.name,
            value: e.target.value.slice(0, maxLength),
          })
        }
        className={`w-full ${inputClass ? inputClass : ""} ${
          errorMessage ? "p-invalid" : ""
        }`}
        {...props}
      />
    </InputLayout>
  );
};
