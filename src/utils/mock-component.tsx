import {HelmetProvider} from 'react-helmet-async';
import {Action} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {MockStore, configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {MemoryHistory, createMemoryHistory} from 'history';
import {State} from '../types/state';
import {AppThunkDispatch} from './mocks';
import {createApi} from '../services/api';
import HistoryRoute from '../component/history-route/history-route';

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRoute history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRoute>
  );
}

function withStore(component: JSX.Element, initialState: Partial<State> = {}): ComponentWithMockStore {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter
  });
}

export {
  withHistory,
  withStore
};
