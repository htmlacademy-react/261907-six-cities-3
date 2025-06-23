import Main from '../../pages/main/main';

type AppProps = {
  offersCount: number;
  offersPerPage: number;
}

function App({offersCount, offersPerPage}: AppProps): JSX.Element {
  return (
    <Main
      offersCount={offersCount}
      offersPerPage={offersPerPage}
    />
  );
}

export default App;
