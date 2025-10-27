import api from "../../services/api";
import Constants from "../../services/constant";
import { authenticate, isAuthenticated } from "../../services/auth";
import { types } from "../types/types";
import { showToast } from "../slices/toastSlice";

export const loginAction = (data, setLoading, navigate) => async (dispatch) => {
  setLoading(true);
  const res = await api("post", Constants.END_POINT.LOGIN, data);
  console.log(res);
  if (res.success) {
    if (res.data) {
      dispatch({
        type: types.USER_DETAIL,
        payload: res.data,
      });
      authenticate(res.data.token, res.data.role, () => {
        if (isAuthenticated()) {
          navigate("/dashboard");
        }
        if (!isAuthenticated) {
          navigate("/login");
        }
      });
    }
  } else {
    dispatch(showToast({ severity: "error", summary: res.message }));
  }
  setLoading(false);
};

export const changePasswordAction =
  (data, setLoading, navigate) => async (dispatch) => {
    setLoading(true);
    const res = await api("post", Constants.END_POINT.CHANGEPASSWORD, data);
    if (res.success) {
      if (res.data) {
        console.log("change password ");
        navigate("/login");

        // dispatch({
        //   type: types.USER_DETAIL,
        //   payload: res.data,
        // });
        // authenticate(res.data.token, res.data.role, () => {
        //   if (isAuthenticated()) {
        //     navigate("/dashboard");
        //   }
        //   if (!isAuthenticated) {
        //     navigate("/login");
        //   }
        // });
      }
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
    setLoading(false);
  };

export const ForgetPasswordAction =
  (data, setLoading, setForgetPassword) => async (dispatch) => {
    setLoading(true);
    const res = await api("post", Constants.END_POINT.FORGET_PASSWORD, data);
    if (res.success) {
      if (res.data) {
        setForgetPassword(res.data.email);
      }
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
    setLoading(false);
  };

export const ResetForgotPassword =
  (forgotPassword, setLoading, history, setForgetPassword, email) =>
  async (dispatch) => {
    setLoading(true);
    const payload = {
      email: email,
      otpCode: forgotPassword?.otpCode,
      password: forgotPassword?.password,
    };
    const res = await api("post", Constants.END_POINT.RESET_PASSWORD, payload);
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      history.push("/login");
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
    setLoading(false);
  };
