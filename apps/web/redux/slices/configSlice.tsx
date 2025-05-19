import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Breadcrumb } from '@/types/breadcrumbs';

// Define a type for the slice state
export interface ConfigState {
  applicationName?: string;
  breadcrumbs?: Breadcrumb[];
}

// Define the initial state using that type
const initialState: ConfigState = {
  applicationName: 'Template',
  breadcrumbs: [],
};

export const configSlice = createSlice({
  name: 'config',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setApplicationName: (state, action: PayloadAction<string>) => ({
      ...state,
      applicationName: action.payload,
    }),
    setBreadcrumbs: (state, action: PayloadAction<Breadcrumb[]>) => ({
      ...state,
      breadcrumbs: action.payload,
    }),
    clearBreadcrumbs: (state) => ({
      ...state,
      breadcrumbs: [],
    }),
  },
});

export const {
  setApplicationName,
  setBreadcrumbs,
  clearBreadcrumbs,
} = configSlice.actions;

export default configSlice.reducer;
