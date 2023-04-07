import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginModal: false,
  createServerModal: false,
  signupModal: false
};

export const counterSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModal = true;
    },

    closeLoginModal: (state) => {
      state.loginModal = false;
    },

    openCreateServerModal: (state) => {
      console.log("open")
      state.createServerModal = true;
    },

    closeCreateServerModal: (state) => {
      state.createServerModal = false;
    },

    openSignupModal: (state) => {
      console.log("open")
      state.signupModal = true;
    },

    closeSignupModal: (state) => {
      state.signupModal = false;
    }
  },
});

// Action creators are generated for each case reducer function
export const { openLoginModal, closeLoginModal, openCreateServerModal, closeCreateServerModal, openSignupModal, closeSignupModal } = counterSlice.actions;

export default counterSlice.reducer;
