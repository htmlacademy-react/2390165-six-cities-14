import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/main-page/main-page';
import LoginPage from './pages/login-page/login-page';
import FavoritePage from './pages/favorites-page/favorite-page';
import OfferPage from './pages/offer-page/offer-page';
import NotFound from './pages/404-page/404-page';
import PrivateRoute from './components/private-route/private-route';

type AppProps = {
  offersCount: number;
}

function App({ offersCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<MainPage offersCount={offersCount} />} />
        <Route path={'login'} element={<LoginPage />} />

        <Route path={'favorites'} element={
          <PrivateRoute>
            <FavoritePage />
          </PrivateRoute>
        }
        />
        <Route path={'offer'}>
          <Route index element={<OfferPage />} />
          <Route path={':id'} element={<OfferPage />} />
        </Route>
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
