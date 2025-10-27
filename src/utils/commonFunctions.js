import { entries, notEqual, values } from "./javascript";
import { allValidations } from "./formValidations";
import { confirmDialog } from "primereact/confirmdialog";
import moment from "moment";

export const showFormErrors = (data, setData, ignore) => {
  let formErrors = {};
  entries(data).forEach(([key, value]) => {
    formErrors = {
      ...formErrors,
      ...allValidations(key, value, data, ignore),
    };
  });
  setData({ ...data, formErrors });
  return !values(formErrors).some((v) => notEqual(v, ""));
};

export const removeEmpty = (obj) => {
  const newObj = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v === Object(v)) {
      newObj[k] = removeEmpty(v);
    } else if (v !== "" && v !== null) {
      newObj[k] = obj[k];
    }
  });
  return newObj;
};

export const getSearchedData = (arr, keyword, keys) => {
  if (keyword.length) {
    arr = arr.filter((obj) =>
      keys.some((key) => {
        const keys = key.split(".");
        let value = obj;
        keys.forEach((k) => (value = value[k]));
        return value.toLowerCase()?.includes(keyword?.toLowerCase());
      })
    );
  }
  return arr;
};
export const confirmDelete = (
  onDeleteAction,
  confirmationMessage,
  position
) => {
  confirmDialog({
    message: confirmationMessage,
    icon: "pi pi-info-circle",
    header: "Delete Confirmation",
    acceptClassName: "bg-main",
    position,
    accept: () => {
      onDeleteAction();
    },
    reject: () => {},
  });
};
export const getFormattedTime = (startTime) => {
  const hours = new Date(startTime)?.getHours();
  const minutes = new Date(startTime)?.getMinutes();
  const formattedMinutes = ("00" + minutes)?.slice(-2);
  return hours + ":" + formattedMinutes;
};
export const timeformat = () => {
  const date = Date.now();
  const month = date.toLocaleString("en-us", { month: "long" });
  const mdate = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${mdate}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  return strTime;
};
export const convertTimestampToAMPM = (timestamp) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const ampm = hour < 12 ? "AM" : "PM";
  return `${hour}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`;
};
export const setTime = (time, date = new Date()) => {
  let hour = time?.split(":")[0];
  let min = time?.split(":")[1];
  date.setHours(hour);
  date.setMinutes(min);
  return date;
};

export const getTimeFromTimestamp = (time) => {
  if (time) {
    return moment(time).format("hh:mm:ss:A");
  } else {
    return "";
  }
};
