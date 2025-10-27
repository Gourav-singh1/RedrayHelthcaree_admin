import { HOST } from "../constants";

export const getImageURL = (path) => {

  if (typeof path === "object") {
    return URL.createObjectURL(path)
  } else if (path.includes("http")) {
    return path;
  } else {
    return HOST + path;
  }
};
