import { createSlice } from "@reduxjs/toolkit";
import { getAuthToken, setAuthToken } from "../../utils";
import { getMe, login } from "../../WebAPI";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    name: null,
    errMsg: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    },
    setErrMsg: (state, action) => {
      state.errMsg = action.payload;
    },
  },
});

// redux-thunk
export const getUser = () => (dispatch) => {
  if (getAuthToken() !== "null") {
    getMe().then((response) => {
      if (!response.ok) {
        return;
      }
      dispatch(setErrMsg(null));
      dispatch(setUser(response.data));
    });
  }
};

export const userLogin = (data) => (dispatch) => {
  login(data.username, data.password).then((response) => {
    if (!response.ok) {
      dispatch(setErrMsg(response.message));
      return;
    }
    setAuthToken(response.token);
    dispatch(getUser());
  });
};

export const { setUser, setErrMsg } = userReducer.actions;
export default userReducer.reducer;
