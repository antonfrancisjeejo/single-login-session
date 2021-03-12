import axios from "../../axios";

export const SET_USER = "SET_USER";

export const setUser = (user) => {
  return {
    type: SET_USER,
    user: user,
  };
};

export const LOGOUT = "LOGOUT";

export const login = (token) => {
  return async (dispatch) => {
    try {
      console.log(token);
      const res = await axios.get("/api/student/account/get/user/data", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(await res.data.user));
    } catch (err) {
      console.log(err.response.data);
      dispatch(autoLogout());
    }
  };
};

export const userLogout = () => {
  return {
    type: LOGOUT,
  };
};

export const autoLogout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch(userLogout());
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const logout = (email, token) => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      const config = {
        headers: {
          ContentType: "application/json",
        },
      };
      await axios.post("/api/student/account/logout", { email, token }, config);
      dispatch(userLogout());
    } catch (err) {
      dispatch(userLogout());
    }
  };
};
