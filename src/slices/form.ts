import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";
import { produce } from 'immer';

export type Option = { 
	id: string, 
	name: string
};

export type Question = {
	id: string;
	question: string;
	formType: string;
	options: Option[];
  isRequired: boolean;
}

const question: Question = {
	id: '',
	question: '',
	formType: '객관식 질문',
	options: [
		{ id: '1', name: '옵션1'},
		{ id: '2', name: '옵션2' },
	],
  isRequired: false,
}

const initialState: { items: Question[] } = {
	items: [
		/*{
			question: '',
			formType: '객관식 질문',
			options: [
				{ id: '1', name: '옵션1'},
				{ id: '2', name: '옵션2' },
			]
		},*/
	],
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: { 
		addForm: (state) => {
			/* 
				produce(복사하려는값, (draft) => {
					// draft에는 복사한값이 들어가 있어서 여기서는 자유롭게 값을 변경해도 돼
					// draft.id = '새로운 값'
				})
			*/
			const newItem = produce(question, (draft) => {
				draft.id = `item-${uuidv4()}`;
			})
			state.items.push(newItem);
		},
		updateFormOrder: (state, action) => {
			state.items = action.payload;
		},

		updateFormType: (state, action) => {
			const item = state.items.find((item) => {
				return item.id === action.payload.id 
			});

			if(!item) return state;
			
			item.formType = action.payload.formType
		},

		updateQuestion: (state, action) => {
			const item = state.items.find((item) => {
				return item.id === action.payload.id 
			});

			if(!item) return state;
			
			item.question = action.payload.question
		},

		updateOptions: (state, action) => {
			state.options = action.payload;
		},

		addOption: (state, action) => {
			const item = state.items.find((item) => {
				return item.id === action.payload.id 
			});

			if(!item) return state;

			item.options.push(action.payload.option);
		},

		removeOption: (state, action) => {
			const item = state.items.find((item) => {
				return item.id === action.payload.id 
			});

			if(!item) return state;
			item.options = item.options.filter((option) => option.id !== action.payload.optionId);
		},
		
		updateOptionName: (state, action) => {
			const item = state.items.find((item) => {
				return item.id === action.payload.id 
			});

			if(!item) return state;
			
			const { newName, optionId } = action.payload;
			const option = item.options.find((option) => option.id === optionId)
			if(!option) return state;

			option.name = newName
		},

    copyForm: (state, action) => {
      const item = state.items.find((item) => {
        return item.id === action.payload.id
      });

      if(!item) return state;

      const newItem = produce(item, (draft) => {
        draft.id = `item-${uuidv4()}`;
      });

      state.items.push(newItem);
    },

    deleteForm: (state, action) => {
      const itemId = action.payload.id;
      state.items = state.items.filter((item) => item.id !== itemId)
    },

    requiredForm: (state, action) => {
      const itemId = action.payload.id;
      const item = state.items.find((item) => {
        return item.id === itemId
      });

      if (!item) return state;

      item.isRequired = action.payload.isRequired;
    }
	},
});

export const {
  addForm,
  updateFormOrder,
  updateFormType,
  updateQuestion,
  updateOptions,
  addOption,
  removeOption,
  updateOptionName,
  copyForm,
  deleteForm,
  requiredForm
} = formSlice.actions
export default formSlice.reducer;