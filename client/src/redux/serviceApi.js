import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addMyInfo,
  addSingle,
  addToAllPost,
  addUser,
  deleteThePost,
} from "./serviceSlice";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const serviceApi = createApi({
  reducerPath: "serviceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${backendUrl}`,
    credentials: "include",
  }),

  keepUnusedDataFor: 60 * 60 * 24 * 7,

  tagTypes: ["Post", "User", "Me"],

  //we use mutation for post request and query for get request
  
  endpoints: (builder) => ({


    signin: builder.mutation({
      query: (data) => ({
        url: "user/signup",
        method: "POST",
        body: data,
      }),
      invalidateTags: ["Me"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),

    myInfo: builder.query({
      query: () => ({
        url: "user/",
        method: "GET",
      }),
      providesTags: ["Me"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addMyInfo(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    logoutMe: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),

    userDetails: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addUser(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    searchUsers: builder.query({
      query: (query) => ({
        url: `user/search/${query}`,
        method: "GET",
      }),
    }),

    followUser: builder.mutation({
      query: (id) => ({
        url: `user/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "user/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),

    addPost: builder.mutation({
      query: (data) => ({
        url: `post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addSingle(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    allPost: builder.query({
      query: (page) => ({
        url: `post?page=${page}`,
        method: "GET",
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.posts.map(({ _id }) => ({ type: "Post", id: _id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }];
      },
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addToAllPost(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(deleteThePost(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    likePost: builder.mutation({
      query: (id) => ({
        url: `post/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    singlePost: builder.query({
      query: (id) => ({
        url: `post/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    repost: builder.mutation({
      query: (id) => ({
        url: `post/repost/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),

    addComment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteComment: builder.mutation({
      query: ({ postId, id }) => ({
        url: `comment/${postId}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),


  }),
});

export const {
  useSigninMutation,
  useLoginMutation,
  useMyInfoQuery,
  useLogoutMeMutation,
  useUserDetailsQuery,
  useLazySearchUsersQuery,
  useAllPostQuery,
  useFollowUserMutation,
  useAddCommentMutation,
  useAddPostMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useRepostMutation,
  useSinglePostQuery,
  useUpdateProfileMutation,
} = serviceApi;
