import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	title: '',
	detail: '',
};

const titleSlice = createSlice({
	name: 'title',
	initialState,
	reducers: {
		updateTitle: (state, action) => {
			state.title = action.payload
		},
		updateDetail: (state, action) => {
			state.detail = action.payload
		},
	},
});

export const { updateTitle, updateDetail } = titleSlice.actions
export default titleSlice.reducer;