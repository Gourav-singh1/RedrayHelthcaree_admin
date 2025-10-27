import api from "../../services/api";
import Constants from "../../services/constant";
import { setStats } from "../slices/statsSlice";
import { showToast } from "../slices/toastSlice";

export const getStats = () => async (dispatch) => {
  const res = await api("get", Constants.END_POINT.STATS);
  if (res.success && res.data) {
    dispatch(setStats(res.data));
  } else {
    // optional: handle error
  }
};

export const addStates = (data, setVisible, setLoading) => async (dispatch) => {
  setLoading(true);
  const res = await api("post", Constants.END_POINT.STATS, data);
  if (res.success && res.data) {
    dispatch(getStats());
    dispatch(
      showToast({
        severity: "success",
        summary: "Success",
        detail: "state updated successfully!",
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
