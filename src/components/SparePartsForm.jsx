import React, { useEffect, useState } from "react";
import { CustomForm, CustomInput } from "../shared/inputs/AllInputs";
import PrimaryButton, {
  PrimaryButtonOutlined,
} from "../shared/Button/PrimaryButton";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import CustomImageInput from "../shared/inputs/CustomImageInput";
import {
  addSparepart,
  EditSpareParts,
} from "../redux/actions/SparepartsAction";

function SparePartsForm({ visible, setVisible, editData, setEditData }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    designation: "",
    category: "",
    image: "",
  });

  // Load edit data if available
  useEffect(() => {
    if (editData) {
      setData({
        name: editData.name || "",
        image: editData.image || "",
      });
    } else {
      setData({ name: "", image: "" });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setData((prev) => ({ ...prev, [name]: value }));
  };

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
      dispatch(EditSpareParts(editData._id, data, setVisible, setLoading));
      console.log("object");
    } else {
      dispatch(addSparepart(data, setLoading, setVisible));
    }
  };

  // Cancel handler
  const handleCancel = () => {
    setVisible(false);
    if (!editData) {
      setData({ name: "", image: "" });
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
              label="Spare Part Name"
              placeholder="Enter Spare Part name"
              required
              value={data.name}
              onChange={handleChange}
            />

            <CustomImageInput
              name="image"
              label="Spare Part Image"
              onChange={handleImageChange}
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

export default SparePartsForm;
