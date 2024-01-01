import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/form';
import questionReducer from "../slices/question"

export const store = configureStore({
	reducer: {
		form: formReducer,
		question: questionReducer
	},
});
