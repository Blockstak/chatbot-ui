import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  pageTitles: {
    [key: string]: string;
  };

  expandedLinks: {
    [key: string]: boolean;
  };

  modalBoolObject: {
    [key: string]: boolean;
  };
};

const initialState: UIState = {
  pageTitles: {},
  expandedLinks: {},
  modalBoolObject: {},
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<string>) {
      state.modalBoolObject[action.payload] = true;
    },

    setCloseModal(state, action: PayloadAction<string>) {
      state.modalBoolObject[action.payload] = false;
    },

    setExpandedLinks(state, action) {
      const { linkName, expanded } = action.payload;
      state.expandedLinks[linkName] = expanded;
    },
  },

  extraReducers: (builder) => {},
});

export const { setOpenModal, setCloseModal, setExpandedLinks } =
  uiSlice.actions;

export default uiSlice.reducer;
