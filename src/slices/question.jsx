import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	formType: '단답형',
};

const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {
		updateFormType: (state, action) => {
			state.formType = action.payload;
		},
	},
});

export const { updateFormType } = questionSlice.actions
export default questionSlice.reducer;