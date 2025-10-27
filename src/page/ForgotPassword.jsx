import React, { useState } from "react";
// import ForgetKey from "../assets/images/forget.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import CustomCard from "../shared/Card/CustomCard";
import { allValidations } from "../utils/formValidations";
import { CustomInput, CustomPassword } from "../shared/inputs/AllInputs";
import PrimaryButton from "../shared/Button/PrimaryButton";
import {
  ForgetPasswordAction,
  ResetForgotPassword,
} from "../redux/actions/loginAction";
import { showFormErrors } from "../utils/commonFunctions";
// import Background from "../shared/Background/Background";

const ForgotPassword = () => {
  //   const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [data, setData] = useState({
    email: "",
  });

  const [forgotPassword, setForgotPassword] = useState({
    otpCode: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = ({ name, value }) => {
    const formErrors = allValidations(name, value, data);
    setData((prev) => ({ ...prev, [name]: value, formErrors }));
  };
  const handleChange1 = ({ name, value }) => {
    const formErrors = allValidations(name, value, forgotPassword);
    setForgotPassword((prev) => ({ ...prev, [name]: value, formErrors }));
  };

  const [forgetPassword, setForgetPassword] = useState();

  const handleForgot = () => {
    if (showFormErrors(data, setData)) {
      dispatch(ForgetPasswordAction(data, setLoading, setForgetPassword));
    }
  };
  const handleResetPassword = () => {
    if (showFormErrors(forgotPassword, setForgotPassword)) {
      dispatch(
        ResetForgotPassword(
          forgotPassword,
          setLoading,
          history,
          setForgetPassword,
          data?.email
        )
      );
    }
  };

  const sendEmail = () => {
    return (
      <>
          <div>
            <div className="text-center">
              <h2>
                Forgot<span style={{ color: "#d4c526" }}>Password</span>
              </h2>
              {/* <img src={ForgetKey} alt="logo" style={{ width: "100px" }} /> */}
            </div>
            <CustomInput
              col="12"
              data={data}
              onChange={handleChange}
              name="email"
              label="Email"
              required
            />
            <PrimaryButton
              label="Send OTP"
              loading={loading}
              onClick={handleForgot}
            />

            <div className="text-right mt-4">
              <Link to="/login" className="text-decoration-none">
                &nbsp;
                <span className="h6 navyColor font_bolder text-right">
                  Go to Login
                </span>
              </Link>
            </div>
          </div>
      </>
    );
  };
  const OTPBox = () => {
    return (
      <div>
        <div className="text-center">
          <h2>
            Forgot<span style={{ color: "#d4c526" }}>Password</span>
          </h2>
          <img src={ForgetKey} alt="logo" style={{ width: "100px" }} />
        </div>
        <CustomInput
          col="12"
          data={forgotPassword}
          onChange={handleChange1}
          name="otpCode"
          label="Enter Your Otp"
          required
          keyfilter="int"
        />
        <CustomPassword
          col="12"
          data={forgotPassword}
          onChange={handleChange1}
          name="password"
          label="Password"
          required
        />
        <CustomPassword
          col="12"
          data={forgotPassword}
          onChange={handleChange1}
          name="confirmPassword"
          label="Password"
          required
        />
        <PrimaryButton
          label="Reset Password"
          loading={loading}
          onClick={handleResetPassword}
        />
      </div>
    );
  };
  return (
    <div className="grid mt-5">
      <div className="col-11 md:col-6 mx-auto">
        {forgetPassword ? OTPBox() : sendEmail()}
      </div>
    </div>
  );
};

export default ForgotPassword;
