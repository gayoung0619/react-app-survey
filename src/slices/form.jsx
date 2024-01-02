import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		addForm: (state, action) => {
			state.items.push(action.payload)
		},
		updateFormOrder: (state, action) => {
			state.items = action.payload;
		},
	},
});

export const { addForm, updateFormOrder } = formSlice.actions
export default formSlice.reducer;