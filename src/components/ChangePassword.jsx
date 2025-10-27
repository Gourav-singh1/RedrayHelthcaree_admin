import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../services/auth";
// import logo from "../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { changePasswordAction, loginAction } from "../redux/actions/loginAction";
import { showFormErrors } from "../utils/commonFunctions";
import { allValidations } from "../utils/formValidations";
import {
  CustomForm,
  CustomInput,
  CustomPassword,
} from "../shared/inputs/AllInputs";
import PrimaryButton from "../shared/Button/PrimaryButton";
import { useNavigate, Link } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.style.fontSize = 14 + "px";
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [history]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = ({ name, value }) => {
    const formErrors = allValidations(name, value, data);
    setData((prev) => ({ ...prev, [name]: value, formErrors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showFormErrors(data, setData)) {
      dispatch(changePasswordAction(data, setLoading, navigate));
    }
  };

  return (
    <div className="container">
      <div className=" mt-5">
        <div className="">
          <div className="text-center">
            {/* <img src={logo} alt="logo" style={{ width: "300px" }} /> */}
          </div>
          <h2 className="pb-4">Change Password</h2>
          <CustomForm>
            <CustomPassword
              col="12"
              data={data}
              onChange={handleChange}
              name="oldPassword"
              label="Old Password"
              required
            />
            <CustomPassword
              col="12"
              data={data}
              onChange={handleChange}
              name="newPassword"
              label="New Password"
              required
            />
            <div className="text-right w-full">
              <Link to="/changePassword" className="text-decoration-none">
                &nbsp;
                <span className="h6 navyColor font_bolder text-right">
                  Change Password?
                </span>
              </Link>
            </div>
            <div>
              <PrimaryButton
                label=" Change Password"
                loading={loading}
                onClick={handleSubmit}
              />
            </div>
          </CustomForm>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
