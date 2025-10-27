import api from "../../services/api";
import Constants from "../../services/constant";
import { setSparepart } from "../slices/sparepartSlice";
import { showToast } from "../slices/toastSlice";

export const getSpareparts = () => async (dispatch) => {
  const res = await api("get", Constants.END_POINT.SPAREPARTS);
  if (res.success && res.data) {
    dispatch(setSparepart(res.data));
  } else {
    // optional: handle error
  }
};

export const addSparepart =
  (data, setLoading, setVisible) => async (dispatch) => {
    setLoading(true);
    const res = await api("post", Constants.END_POINT.SPAREPARTS, data);
    if (res.success && res.data) {
      dispatch(getSpareparts());
      dispatch(
        showToast({
          severity: "success",
          summary: "Success",
          detail: "Spare part add successfully!",
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

export const EditSpareParts =
  (id, data, setVisible, setLoading) => async (dispatch) => {
    setLoading(true);
    const res = await api("put", Constants.END_POINT.SPAREPARTS + id, data);
    if (res.success && res.data) {
      dispatch(getSpareparts());
      dispatch(
        showToast({
          severity: "success",
          summary: "Success",
          detail: "Spare part updated successfully!",
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

export const deleteSpareParts = (id) => async (dispatch) => {
  const res = await api("delete", Constants.END_POINT.SPAREPARTS + id);
  if (res.success) {
    dispatch(getSpareparts());
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
