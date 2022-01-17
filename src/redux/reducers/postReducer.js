import { createSlice } from "@reduxjs/toolkit";
import { getPostByID, postNewArticle } from "../../WebAPI";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoadingPost: true,
    post: null,
    newPostResp: null,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setNewPostResp: (state, action) => {
      state.newPostResp = action.payload;
    },
  },
});

// redux-thunk
export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostByID(id)
    .then((res) => {
      dispatch(setPost(res));
      dispatch(setIsLoadingPost(false));
    })
    .catch(() => {
      dispatch(setIsLoadingPost(true));
      console.log("error occur when get post");
    });
};

export const newPost = (data) => (dispatch) => {
  postNewArticle(data.postTitle, data.postBody).then((res) => {
    dispatch(setNewPostResp(res));
  });
};

export const { setIsLoadingPost, setPost, setNewPostResp } =
  postReducer.actions;
export default postReducer.reducer;
