import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	titleData: { title: '', detail: '' },
	formType: '객관식 질문',
	options: [
		{ id: '1', name: '옵션1'},
		{ id: '2', name: '옵션2' },
	]
};

const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {
		updateTitle: (state, action) => {
			state.titleData.title = action.payload
		},
		updateDetail: (state, action) => {
			state.titleData.detail = action.payload
		},
		updateFormType: (state, action) => {
			state.formType = action.payload;
		},
		updateQuestion: (state, action) => {
			state.question = action.payload;
		},
		updateOptions: (state, action) => {
			state.options = action.payload;
		},
		addOption: (state, action) => {
			state.options.push(action.payload);
		},
		removeOption: (state, action) => {
			state.options = state.options.filter((option) => option.id !== action.payload);
		},
		updateOptionName: (state, action) => {
			const { id, newName } = action.payload;
			const option = state.options.find((option) => option.id === id);
			if (option) {
				option.name = newName;
			}
		},
	},
});

export const { updateTitle, updateDetail, updateFormType, updateQuestion, updateOptions, addOption, removeOption, updateOptionName } = questionSlice.actions
export default questionSlice.reducer;