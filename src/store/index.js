import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/form';

export const store = configureStore({
	reducer: {
		form: formReducer
	},
});
