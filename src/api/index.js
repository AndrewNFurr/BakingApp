export function buildHeaders() {
    let base = {
      "Content-Type": "application/json",
    };
  
    if (getToken()) {
      base["Authorization"] = `Bearer ${getToken()}`;
    }
  
    return base;
  }

    export const getToken = () => {
    if (localStorage.getItem("auth-token")) {
        return localStorage.getItem("auth-token");
    } else {
        localStorage.removeItem("auth-token");
    }
  };
  
  export const clearToken = () => {
    localStorage.removeItem("auth-token");
  };
  
  export const setToken = (token) => {
    localStorage.setItem("auth-token", token);
  };