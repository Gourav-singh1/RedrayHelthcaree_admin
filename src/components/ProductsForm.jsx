import React, { useEffect, useState } from "react";
import {
  CustomDropDown,
  CustomForm,
  CustomInput,
} from "../shared/inputs/AllInputs";
import PrimaryButton, {
  PrimaryButtonOutlined,
} from "../shared/Button/PrimaryButton";
import { Dialog } from "primereact/dialog";
import {
  addCategory,
  categoryEdit,
  getCategory,
} from "../redux/actions/CategoryAction";
import { useDispatch, useSelector } from "react-redux";
import CustomImageInput from "../shared/inputs/CustomImageInput";
import { addProducts, EditProduct } from "../redux/actions/ProductsAction";

function ProductsForm({ visible, setVisible, editData, setEditData }) {
  const category = useSelector((state) => state.category.data);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    designation: "",
    category: "",
    image: "",
  });

  // Fetch categories
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  // Load edit data if available
  useEffect(() => {
    if (editData) {
      setData({
        name: editData.name || "",
        designation: editData?.designation || "",
        category: editData?.category || "",
        image: editData.image || "",
      });
    } else {
      setData({ name: "", designation: "", category: "", image: "" });
    }
  }, [editData]);
  // console.log(editData.category);
  // console.log(data.category);
  // Handle normal input & dropdown changes
  const handleChange = (e) => {
    const { name, value } = e.target || e; // support for PrimeReact dropdown
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload & convert to Base64
  const handleImageChange = (e) => {
    if (!e?.target?.files?.[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData((prev) => ({ ...prev, image: reader.result }));
    };
  };

  // Submit handler
  const handleSubmit = () => {
    console.log("Submitting data:", data);

    if (!data.name.trim()) return;
    if (editData) {
      dispatch(EditProduct(editData._id, data, setVisible, setLoading));
      console.log("object");
    } else {
      dispatch(addProducts(data, setLoading, setVisible));
    }
  };

  // Cancel handler
  const handleCancel = () => {
    setVisible(false);
    if (!editData) {
      setData({ name: "", designation: "", category: "", image: "" });
    }
  };

  return (
    <div className="card flex justify-content-center bg_lightDark">
      <Dialog
        draggable={false}
        closable={false}
        visible={visible}
        modal
        onHide={() => setVisible(false)}
      >
        <div className="p-4">
          <CustomForm>
            <CustomInput
              col="12"
              name="name"
              label="Product Name"
              placeholder="Enter product name"
              required
              value={data.name}
              onChange={handleChange}
            />

            <CustomInput
              col="12"
              name="designation"
              label="Product Designation"
              placeholder="Enter product designation"
              required
              value={data.designation}
              onChange={handleChange}
            />

            <CustomDropDown
              className="w-full"
              name="category"
              label="Category"
              options={category}
              value={data.category}
              onChange={handleChange}
            />
            <CustomImageInput
              name="image"
              label="Product Image"
              onChange={handleImageChange} // Remove value prop
            />

            {/* Image Preview */}
            {data.image && (
              <img
                src={data.image}
                alt="preview"
                style={{
                  width: "120px",
                  height: "120px",
                  marginTop: "10px",
                  objectFit: "cover",
                }}
              />
            )}

            <div className="text-right w-full mt-4">
              <PrimaryButtonOutlined label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                loading={loading}
                label={editData ? "Update" : "Add"}
                onClick={handleSubmit}
              />
            </div>
          </CustomForm>
        </div>
      </Dialog>
    </div>
  );
}

export default ProductsForm;
