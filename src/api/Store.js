import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "./features/authSlice";
import { authApi } from "./authApi";
import { teacherEnrollSubjectApi } from "./teacherEnrollSubjectApi";
import { techersPaperReportApi } from "./techersPaperReportApi";
import { teachersAssignedClassReportApi } from "./teachersAssignedClassReportApi";
import { teachersAssignedResultReportApi } from "./teachersAssignedResultReportApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [teacherEnrollSubjectApi.reducerPath]: teacherEnrollSubjectApi.reducer,
    [techersPaperReportApi.reducerPath]: techersPaperReportApi.reducer,
    [teachersAssignedClassReportApi.reducerPath]:
      teachersAssignedClassReportApi.reducer,
    [teachersAssignedResultReportApi.reducerPath]:
      teachersAssignedResultReportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      teacherEnrollSubjectApi.middleware,
      techersPaperReportApi.middleware,
      teachersAssignedClassReportApi.middleware,
      teachersAssignedResultReportApi.middleware
    ),
});

setupListeners(store.dispatch);