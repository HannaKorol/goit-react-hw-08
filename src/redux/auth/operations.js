import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* axios.defaults.baseURL = 'https://connections-api.goit.global'; X - we have already a default baseURL in contsáctsOps, we cannot have the second one */

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

const setAuthHeader = (token) => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`; //ми хочемо при кожній нашій логінізації додавати токен
};

export const register = createAsyncThunk(
  "register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("users/signup", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("users/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkApi) => {
  try {
    await goitApi.post("users/logout");
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk('refresh', async (_, thunkApi) => {
   try {
     //коли залогінився, система перевіряє чи є токен і якщо є, то отримуємо доступ без проблем
     const savedToken = thunkApi.getState().auth.token; // токен вже збережений в локальному сховищі і нам вже не потрібно його отримати від бекенду
     console.log(savedToken);

     //якщо там нічого немає-не робимо запит
     if (!savedToken) {
       return thunkApi.rejectWithValue("Token does not exist!");
     }
     //якщо є- встанновлюємо автоматично хедер авторизації для запитів
     setAuthHeader(savedToken);

     //робимо запит за облікоаими данними
     const { data } = await goitApi.get("users/current");
     //повертаємо данні в слайс для опрацьовування
     return data;
   } catch (error) {
     return thunkApi.rejectWithValue(error.message);
   }
})