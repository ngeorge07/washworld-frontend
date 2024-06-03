import { createSlice } from "@reduxjs/toolkit";
import axios from "../../app/axios";
import { AppDispatch } from "../../app/store";
import { User } from "../../types/User";

export interface AuthState {
  isSignedIn: boolean;
  user: User | null;
  status: "initial" | "loading" | "success" | "failure";
}

type SignUpPayloadType = {
  fullName: string;
  email: string;
  password: string;
};

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
  status: "initial",
};

export type SignupResponse = {
  fullName: string;
  email: string;
  id: number;
  password: string;
  roles: string[];
  washCoins: number;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initial: (state: AuthState) => {
      state.status = "initial";
    },
    request: (state: AuthState) => {
      state.status = "loading";
    },
    signupSuccess: (state: AuthState) => {
      state.status = "success";
    },

    failure: (state: AuthState) => {
      state.user = null;
      state.isSignedIn = false;
      state.status = "failure";
    },
  },
});

export const signUp =
  (payload: SignUpPayloadType) => async (dispatch: AppDispatch) => {
    // set the status to loading
    dispatch(authSlice.actions.request());
    try {
      const response = await axios.post<SignupResponse>("/users", payload);
      const user = response.data.id;
      if (user) {
        dispatch(authSlice.actions.signupSuccess());
        return response.data;
      } else {
        dispatch(authSlice.actions.failure());
        throw new Error("Invalid response from server while creating user");
      }
    } catch (error) {
      dispatch(authSlice.actions.failure());
      throw error;
    } finally {
      dispatch(authSlice.actions.initial());
    }
  };

export const { initial, request, failure, signupSuccess } = authSlice.actions;

export default authSlice.reducer;
