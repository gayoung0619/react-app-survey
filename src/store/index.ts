import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/form.ts';
import titleReducer from "../slices/title.ts";
import questionReducer from "../slices/question.ts";


export const store = configureStore({
	reducer: {
		form: formReducer,
		title: titleReducer,
		question: questionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;