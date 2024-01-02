import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	formType: '객관식 질문',
	question: '',
};

const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {
		updateFormType: (state, action) => {
			state.formType = action.payload;
		},
		updateQuestion: (state, action) => {
			state.question = action.payload;
		}
	},
});

export const { updateFormType, updateQuestion } = questionSlice.actions
export default questionSlice.reducer;