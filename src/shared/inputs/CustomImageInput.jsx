import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Gallery from "../../assets/gallery.svg";
import InputLayout from "./InputLayout";
import { getImageURL } from "../../utils/imageUrl.js";
import { showToast } from "../../redux/slices/toastSlice.js";

export default function CustomImageInput({
  label,
  name,
  onFilesChange,
  errorMessage,
  extraClassName,
  value,
  data,
  limit,
  multiple,
  col,
  required,
  removeable,
  editable = true,
  ...props
}) {
  const [files, setFiles] = useState(value || data?.[name] || []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value || data?.[name]) {
      if (JSON.stringify(value || data?.[name]) !== JSON.stringify(files)) {
        setFiles(value || data?.[name]);
      }
    }
  }, [value, data?.[name]]);

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange({ name, value: files });
    }
  }, [files, name]);

  const onDelete = (id) => {
    if (editable) {
      const s = files.filter((_, index) => index !== id);
      setFiles([...s]);
    }
  };

  const onFileChange = (e) => {
    if (editable) {
      const chosenFiles = e.target.files;
      handleFileChange(Object.values(chosenFiles));
    }
  };

  const handleFileChange = (uploadedFiles) => {
    let newFiles = [...files];
    uploadedFiles.forEach((file) => {
      if (!newFiles.find((f) => f.name === file.name)) {
        newFiles.push(file);
      }
    });

    if (limit && newFiles.length > limit) {
      newFiles = newFiles.slice(0, limit);
      dispatch(
        showToast({
          severity: "warn",
          summary: "Limit Exceeded",
          detail: `Max. file limit is ${limit}.`,
        })
      );
    }

    setFiles(newFiles);
  };

  return (
    <>
      <input
        name={name}
        onChange={onFileChange}
        id={name}
        type="file"
        accept="image/*"
        hidden
        {...props}
        multiple={multiple}
      />
      <InputLayout
        col={col || 12}
        label={label || "Upload Photo"}
        name={name}
        required={required}
        extraClassName={extraClassName}
        errorMessage={errorMessage}
      >
        <div className="image-box">
          {files && files.length ? (
            <div className="md:col-12 grid">
              {Object.values(files).map((image, i) => (
                <div
                  key={i}
                  className="mr-2 my-1 photoDiv"
                  style={{
                    height: "90px",
                    width: "90px",
                    position: "relative",
                  }}
                >
                  {removeable && (
                    <i
                      onClick={() => onDelete(i)}
                      className="fa-solid fa-circle-xmark cursor-pointer absolute top-0 right-0 text-red-500"
                    ></i>
                  )}

                  <label htmlFor={name}>
                    <img
                      className="w-full h-full object-cover rounded-md"
                      src={
                        typeof image === "string"
                          ? getImageURL(image)
                          : URL.createObjectURL(image)
                      }
                      alt=""
                      onError={(e) => (e.target.src = Gallery)}
                    />
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="photo-upload flex justify-content-center align-items-center border border-gray-300 rounded-md"
              style={{ height: "85px", width: "85px" }}
            >
              <label htmlFor={name}>
                <img width={50}
                  className=" object-cover cursor-pointer"
                  src={Gallery}
                  alt=""
                />
              </label>
            </div>
          )}
        </div>
      </InputLayout>
    </>
  );
}
