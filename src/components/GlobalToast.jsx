import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from "react-redux";
import { clearToast } from "../redux/slices/toastSlice";

function GlobalToast() {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.current.show({
        severity: toastMessage.severity || "info",
        summary: toastMessage.summary || "",
        detail: toastMessage.detail || "",
        life: toastMessage.life || 3000,
      });

      // Clear toast after display
      setTimeout(() => {
        dispatch(clearToast());
      }, toastMessage.life || 3000);
    }
  }, [toastMessage, dispatch]);

  return <Toast ref={toast} position="top-right" />;
}

export default GlobalToast;
