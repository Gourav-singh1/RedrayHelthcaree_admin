import React, { useEffect, useState } from "react";
import { CustomForm, CustomInput } from "../shared/inputs/AllInputs";
import PrimaryButton, {
  PrimaryButtonOutlined,
} from "../shared/Button/PrimaryButton";
import { Dialog } from "primereact/dialog";
import { addCategory, categoryEdit } from "../redux/actions/CategoryAction";
import { useDispatch } from "react-redux";

function CategoryForm({ visible, setVisible, editData, setEditData }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "" });
  useEffect(() => {
    if (editData) {
      setData({ name: editData.name });
    } else {
      setData({ name: "" });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!data.name.trim()) return;
    if (editData) {
      const id = editData._id;
      dispatch(categoryEdit(id, data, setVisible, setLoading));
    } else {
      dispatch(addCategory(data, setLoading, setVisible));
    }
  };

  const handleCancel = () => {
    setVisible(false);
    if (!editData) {
      setData({ name: "" });
    }
  };

  return (
    <div className="card flex justify-content-center bg_lightDark">
      <Dialog
        className=""
        draggable={false}
        closable={false}
        visible={visible}
        modal
        // style={{ width: "50rem" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="p-4">
          <CustomForm>
            <CustomInput
              col="12"
              name="name"
              label="Category Name"
              placeholder="Enter category name"
              required
              value={data.name}
              onChange={handleChange}
            />
            <div className="text-right w-full">
              <PrimaryButtonOutlined
                label="Cancel"
                onClick={() => handleCancel()}
              />
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

export default CategoryForm;
