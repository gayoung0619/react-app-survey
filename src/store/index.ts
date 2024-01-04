import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/form.ts';
import titleReducer from "../slices/title.ts";


export const store = configureStore({
	reducer: {
		form: formReducer,
		title: titleReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;