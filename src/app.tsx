import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/main-page/mainPage';
import LoginPage from './pages/login-page/loginPage';
import FavoritePage from './pages/favorites-page/favoritePage';
import OfferPage from './pages/offer-page/offerPage';
import NotFound from './pages/404-page/404Page';

type AppProps = {
  offersCount: number;
}

function App({ offersCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<MainPage offersCount={offersCount} />} />
        <Route path={'login'} element={<LoginPage />} />
        <Route path={'favorites'} element={<FavoritePage />} />
        <Route path={'offer'} element={<OfferPage />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
