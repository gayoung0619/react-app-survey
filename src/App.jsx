import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import TextField from '@mui/material/TextField';

import Form from './components/pages/Form'
import Preview from './components/pages/Preview'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(103, 58, 183, .15);
  }
	body, div, p, select, input {
    margin: 0;
    padding: 0;
	}
`;

const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(103, 58, 183)',
		},
		purple: {
			main: 'rgb(103, 58, 183)',
		},
		blue: {
			main: '#4285f4',
		},
		transparent: {
			main: 'transparent',
		},
		grey: {
			main: '#70757a',
			light: 'rgb(248, 249, 250)',
		},
	}
});

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{ index: true, element: <Form /> },
			{ path: 'preview', element: <Preview /> },
		],
	},
]);

function App() {
  return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} >
					<DragDropContext>
					</DragDropContext>
				</ RouterProvider>
			</ThemeProvider>
		</>
  )
}

export default App
