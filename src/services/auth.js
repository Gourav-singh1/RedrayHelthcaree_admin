import * as jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("authToken")) {
    return JSON.parse(
      localStorage.getItem("authToken"),
      localStorage.getItem("role")
    );
  } else {
    return false;
  }
};

export const getMyId = () => {
  if (localStorage.getItem("authToken")) {
    let decoded = jwt_decode(JSON.parse(localStorage.getItem("authToken")));
    return decoded.userId;
  }
};

export const getMyRole = () => {
  if (localStorage.getItem("authToken")) {
    let decoded = jwt_decode(JSON.parse(localStorage.getItem("authToken")));
    return decoded.role;
  }
};
export const authenticate = (authToken, role, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", JSON.stringify(authToken));
    localStorage.setItem("role", JSON.stringify(role));
    next();
  }
};
export const logout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    next();
  }
};
