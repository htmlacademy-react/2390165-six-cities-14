import MainPage from '../../pages/mainPage/mainPage';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
  return (
    <MainPage offersCount={offersCount} />
  );
}

export default App;
