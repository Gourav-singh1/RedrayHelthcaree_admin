import React, { useEffect, useState } from "react";
import { CustomForm, CustomInput } from "../shared/inputs/AllInputs";
import PrimaryButton, {
  PrimaryButtonOutlined,
} from "../shared/Button/PrimaryButton";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { addStates } from "../redux/actions/StatsAction";

function StateForm({ visible, setVisible, editData }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    totalInstallations: "",
    happyCustomers: "",
    citiesCovered: "",
    countriesCovered: "",
  });

  // Load existing data into form
  useEffect(() => {
    if (editData) {
      setData({
        totalInstallations: editData.totalInstallations || "",
        happyCustomers: editData.happyCustomers || "",
        citiesCovered: editData.citiesCovered || "",
        countriesCovered: editData.countriesCovered || "",
      });
    }
  }, [editData]);

  // handle change — all number inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow only numeric input
    const numericValue = value.replace(/\D/g, "");
    setData((prev) => ({ ...prev, [name]: numericValue }));
  };

  // Update data
  const handleSubmit = () => {
    if (!editData?._id) return;
    dispatch(addStates( data, setVisible, setLoading));
  };

  // Cancel button
  const handleCancel = () => setVisible(false);

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
              type="number"
              col="12"
              name="totalInstallations"
              label="Total Installations"
              placeholder="Enter Total Installations"
              required
              value={data.totalInstallations}
              onChange={handleChange}
            />
            <CustomInput
              type="number"
              col="12"
              name="happyCustomers"
              label="Happy Customers"
              placeholder="Enter Happy Customers"
              required
              value={data.happyCustomers}
              onChange={handleChange}
            />
            <CustomInput
              type="number"
              col="12"
              name="citiesCovered"
              label="Cities Covered"
              placeholder="Enter Cities Covered"
              required
              value={data.citiesCovered}
              onChange={handleChange}
            />
            <CustomInput
              type="number"
              col="12"
              name="countriesCovered"
              label="Countries Covered"
              placeholder="Enter Countries Covered"
              required
              value={data.countriesCovered}
              onChange={handleChange}
            />

            <div className="flex justify-content-end gap-2 mt-4 w-full">
              <PrimaryButtonOutlined label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                loading={loading}
                label="Update"
                onClick={handleSubmit}
              />
            </div>
          </CustomForm>
        </div>
      </Dialog>
    </div>
  );
}

export default StateForm;
