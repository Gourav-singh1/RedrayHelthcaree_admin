import api from "../../services/api";
import Constants from "../../services/constant";
import { setCategory } from "../slices/CategorySlice";
import { showToast } from "../slices/toastSlice";

export const getCategory = () => async (dispatch) => {
  const res = await api("get", Constants.END_POINT.CATEGORY);
  if (res.success && res.data) {
    dispatch(setCategory(res.data));
  } else {
    // optional: handle error
  }
};
export const addCategory =
  (data, setLoading, setVisible) => async (dispatch) => {
    setLoading(true);
    const res = await api("post", Constants.END_POINT.CATEGORY, data);
    if (res.success && res.data) {
      dispatch(getCategory());
      dispatch(
        showToast({
          severity: "success",
          summary: "Success",
          detail: "Category add successfully!",
        })
      );
      setVisible(false);
    } else {
      dispatch(
        showToast({
          severity: "warn",
          summary: "Failed",
          detail: res.message,
        })
      );
    }
    setLoading(false);
    setVisible(false);
  };

export const categoryEdit =
  (id, data, setVisible, setLoading) => async (dispatch) => {
    setLoading(true);
    const res = await api("put", Constants.END_POINT.CATEGORY + id, data);
    if (res.success && res.data) {
      dispatch(getCategory());
      dispatch(
        showToast({
          severity: "success",
          summary: "Success",
          detail: "Category updated successfully!",
        })
      );
      setVisible(false);
    } else {
      dispatch(
        showToast({
          severity: "warn",
          summary: "Failed",
          detail: res.message,
        })
      );
    }
    setLoading(false);
  };

export const deleteCategory =
  (id, data = []) =>
  async (dispatch) => {
    try {
      const res = await api("delete", Constants.END_POINT.CATEGORY + id, data);
      if (res.success) {
        dispatch(getCategory());
        dispatch(showToast({ severity: "success", summary: res.message }));
      } else {
        dispatch(showToast({ severity: "error", summary: res.message }));
      }
    } catch (error) {
      console.log(error);
    }
  };
