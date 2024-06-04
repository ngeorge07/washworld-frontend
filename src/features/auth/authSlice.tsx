import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "../../app/axios";
import { AppDispatch } from "../../app/store";

export interface AuthState {
  isSignedIn: boolean;
  user: ReceivedUser | null;
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

type SignInPayloadType = {
  email: string;
  password: string;
};

type ReceivedUser = {
  sub: number;
  fullName: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
};

export type AuthResponse = {
  access_token: string;
};

export type ValidateResponse = {
  user: ReceivedUser;
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

    signinSuccess: (state: AuthState) => {
      state.isSignedIn = true;
      state.status = "success";
    },

    signoutSuccess: (state: AuthState) => {
      state.user = null;
      state.isSignedIn = false;
      state.status = "success";
    },

    failure: (state: AuthState) => {
      state.user = null;
      state.isSignedIn = false;
      state.status = "failure";
    },

    setUser: (state: AuthState, action: PayloadAction<ReceivedUser>) => {
      state.user = action.payload;
    },
  },
});

async function getToken() {
  return await SecureStore.getItemAsync("token");
}

async function saveToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}
const deleteToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

export const signIn =
  (payload: SignInPayloadType) => async (dispatch: AppDispatch) => {
    // set the status to loading
    dispatch(authSlice.actions.request());
    try {
      const response = await axios.post<AuthResponse>("/auth/login", payload);
      const token = response.data.access_token;

      if (token) {
        await saveToken(token);

        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get<ValidateResponse>("/auth/validate", {
          headers,
        });
        const { user } = res.data;
        dispatch(authSlice.actions.signinSuccess());
        dispatch(authSlice.actions.setUser(user));
      }
    } catch (error) {
      dispatch(authSlice.actions.failure());
      throw error;
    } finally {
      dispatch(authSlice.actions.initial());
    }
  };

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

export const autoSignIn = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.request());
  try {
    const storedToken = await getToken();
    if (storedToken) {
      const headers = { Authorization: `Bearer ${storedToken}` };
      const res = await axios.get<ValidateResponse>("/auth/validate", {
        headers,
      });
      const { user } = res.data;
      await saveToken(storedToken);
      dispatch(authSlice.actions.signinSuccess());
      dispatch(authSlice.actions.setUser(user));
    } else {
      throw new Error("No token found");
    }
  } catch (error) {
    console.log(error);
    dispatch(authSlice.actions.failure());
  } finally {
    dispatch(authSlice.actions.initial());
  }
};

export const signOut = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.request());
  try {
    await deleteToken();
    axios.defaults.headers.common["Authorization"] = "";
    dispatch(authSlice.actions.signoutSuccess());
  } catch (error) {
    console.log(error);
    dispatch(authSlice.actions.failure());
  } finally {
    dispatch(authSlice.actions.initial());
  }
};

export const fetchUser = (userSub: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<ReceivedUser>(`/users/${userSub}`);
    dispatch(authSlice.actions.setUser(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const { initial, request, failure, signupSuccess, signinSuccess } =
  authSlice.actions;

export default authSlice.reducer;
