import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';

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
			500: 'rgb(103, 58, 183)',
		}
	},
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
				<RouterProvider router={router} />
			</ThemeProvider>
		</>
  )
}

export default App
