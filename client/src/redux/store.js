import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./serviceSlice";
import { serviceApi } from "./serviceApi";

export default configureStore({
  reducer: {
    service: serviceReducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false}).concat(serviceApi.middleware),
 
});
