import {PropsWithChildren, useLayoutEffect, useState} from 'react';
import {Router} from 'react-router-dom';
import {BrowserHistory} from 'history';

type HistoryRouteProps = PropsWithChildren<{
  history: BrowserHistory;
  basename?: string;
}>;

function HistoryRoute({basename, history, children}: HistoryRouteProps): JSX.Element {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRoute;
