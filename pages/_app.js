import Header from '../components/Header'
import '../styles/globals.css'
import { StyledEngineProvider } from '@mui/material';

function MyApp({ Component, pageProps }) {

  return (
    <>
    <Header />
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
    
    </>
    
  )
}

export default MyApp
