import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ApplicationState, AppDispatch } from "@state/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;
