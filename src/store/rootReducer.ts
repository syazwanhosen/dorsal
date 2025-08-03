import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import hospitalSlice from "@/features/hospitalSlice";
import hospitalMapReducer from "@/features/hospitalMapSlice";
import hospitalServiceSearchReducer from "@/features/hospitalServiceSearchSlice";
import auditReducer from "@/features/auditSlice";

// Persist config per reducer
const hospitalMapPersistConfig = {
  key: "hospitalMap",
  storage: storageSession,
};

const auditPersistConfig = {
  key: "audit",
  storage: storageSession,
};

const rootReducer = combineReducers({
  hospital: hospitalSlice,
  hospitalMap: persistReducer(hospitalMapPersistConfig, hospitalMapReducer),
  hospitalServiceSearch: hospitalServiceSearchReducer,
  audit: persistReducer(auditPersistConfig, auditReducer),
});

export default rootReducer;
