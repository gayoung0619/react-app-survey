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
	},
});

export const { addForm } = formSlice.actions
export default formSlice.reducer;