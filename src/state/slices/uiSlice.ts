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

  showSidebar: boolean;
  viewSuggestions: boolean;
};

const initialState: UIState = {
  pageTitles: {},
  expandedLinks: {},
  showSidebar: false,
  viewSuggestions: false,
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

    setShowSidebar(state, action: PayloadAction<boolean>) {
      state.showSidebar = action.payload;
    },
    setViewSuggestions(state, action: PayloadAction<boolean>) {
      state.viewSuggestions = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setOpenModal,
  setCloseModal,
  setExpandedLinks,
  setShowSidebar,
  setViewSuggestions,
} = uiSlice.actions;

export default uiSlice.reducer;
