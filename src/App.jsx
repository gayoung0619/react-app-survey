import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';

import Form from './components/pages/Form'
import InputSelection from "./components/Inputbox/InputSelection.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(103, 58, 183, .15);
		margin: 0;
		padding: 0;
  }
	//border-bottom: 1px solid rgb(218,220,224)
`;

const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(103, 58, 183)',
		},

		secondary: {
			main: '#4285f4',
		},

		transparent: {
			main: 'transparent'
		}
	},
});

function App() {
  return (
		<DragDropContext>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Form />
			</ThemeProvider>
		</DragDropContext>
  )
}

export default App
