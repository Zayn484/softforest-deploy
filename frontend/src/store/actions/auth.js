import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("occupation");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTime = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
      window.location.reload();
    }, expirationTime * 1000);
  };
};

export const authSuccess = (token, id, username, occupation) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: id,
    username: username,
    occupation: occupation
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authSignUpSuccess = () => {
  return {
    type: actionTypes.Auth_SignUp_Success
  };
};

export const auth = (
  email,
  username,
  password,
  occupation,
  recommendations
) => {
  return dispatch => {
    dispatch(authStart());
    let url = "/register/";

    const authData = {
      email: email,
      username: username,
      password: password,
      occupation: occupation,
      recommendations: recommendations
    };
    axios
      .post(url, authData)
      .then(response => {
        dispatch(authSignUpSuccess());
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(authFail(err.response.data));
      });
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    let url = "/login/";
    const authData = {
      username: username,
      password: password
    };
    axios
      .post(url, authData)
      .then(response => {
        const token = response.data.token;
        const userId = response.data.id;
        const username = response.data.user_data[0].username;
        const occupation = response.data.user_data[0].occupation;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationDate);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("occupation", occupation);
        dispatch(authSuccess(token, userId, username, occupation));
        dispatch(checkAuthTime(3600));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
      });
  };
};
export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    authPath: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        const occupation = localStorage.getItem("occupation");
        dispatch(authSuccess(token, userId, username, occupation));
        dispatch(
          checkAuthTime(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
