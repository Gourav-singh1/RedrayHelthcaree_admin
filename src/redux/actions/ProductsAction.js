import api from "../../services/api";
import Constants from "../../services/constant";
import { setProduct } from "../slices/productSlice";
import { showToast } from "../slices/toastSlice";

export const getProducts = () => async (dispatch) => {
  const res = await api("get", Constants.END_POINT.PRODUCT);
  if (res.success && res.data) {
    dispatch(setProduct(res.data));
  } else {
    // optional: handle error
  }
};
export const addProducts =
  (data, setLoading, setVisible) => async (dispatch) => {
    setLoading(true);
    const res = await api("post", Constants.END_POINT.PRODUCT, data);
    if (res.success && res.data) {
      dispatch(getProducts());
      dispatch(
        showToast({
          severity: "success",
          summary: "Success",
          detail: "Product add successfully!",
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

export const EditProduct =
  (id, data, setVisible, setLoading) => async (dispatch) => {
    setLoading(true);
    const res = await api("put", Constants.END_POINT.PRODUCT + id, data);
    if (res.success && res.data) {
      dispatch(getProducts());
      dispatch(
        showToast({
          severity: "success",
          summary: "Success",
          detail: "product updated successfully!",
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

export const deleteProduct = (id) => async (dispatch) => {
  const res = await api("delete", Constants.END_POINT.PRODUCT + id);
  console.log(res);
  if (res.success) {
    dispatch(getProducts());
    dispatch(
      showToast({
        severity: "success",
        summary: "Success",
        detail: res.message,
      })
    );
  } else {
    dispatch(
      showToast({ severity: "error", summary: "error", detail: res.message })
    );
  }
};
