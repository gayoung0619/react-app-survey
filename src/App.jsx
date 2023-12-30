import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';

import FloatingBar from "./components/Layout/floatingBar.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(103, 58, 183, .15);
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
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<FloatingBar />
			</ThemeProvider>
		</>
  )
}

export default App
