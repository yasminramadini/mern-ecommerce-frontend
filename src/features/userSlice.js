import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: 0,
      name: "",
      isAdmin: false,
      token: null,
    },
  },
  reducers: {
    initializeUser: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
    },
    setUser: (state, action) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.isAdmin = action.payload.isAdmin;
      state.user.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    deleteUser: (state) => {
      state.user.id = 0;
      state.user.name = "";
      state.user.isAdmin = false;
      state.user.token = "";
      localStorage.removeItem("user");
    },
  },
});

export const { initializeUser, setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
