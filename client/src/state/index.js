import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setSavedPosts: (state, action) => {
      if (state.user) {
        state.user.savedPosts = action.payload.savedPosts;
      } else {
        console.error("user does not have any saved posts");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
            if (post._id === action.payload.post._id) return action.payload.post_id;
            return post;
        });
        state.posts = updatedPosts;
    }
  },
});

export const { setMode, setLogin, setLogout, setSavedPosts, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
