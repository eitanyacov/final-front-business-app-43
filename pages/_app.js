import Header from '../components/Header'
import '../styles/globals.css'
import { StyledEngineProvider } from '@mui/material';
import SideBarPage from '../components/SideBarPage';

function MyApp({ Component, pageProps }) {

  return (
    <>
    <Header />
    <SideBarPage />
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
    
    </>
    
  )
}

export default MyApp
