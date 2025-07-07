import {Action} from 'redux';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {datatype, internet, lorem} from 'faker';
import {ApiRoute} from '../const';
import {State} from '../types/state';
import {AppThunkDispatch, extractActionsTypes, makeMockOffer, makeMockReview, makeMockStandaloneOffer, makeMockUser} from '../utils/mocks';
import {createApi} from '../services/api';
import {changeFavoriteStatusAction, checkAuthorizationAction, getFavoritesAction, getOffersAction, loginAction, logoutAction, requestNearPlacesAction, requestReviewsForOfferAction, requestStandaloneOfferAction, sendCommentAction} from './api-action';
import {redirectToRouteAction} from './action';

describe('Async Action', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      DATA: {
        offers: []
      }
    });
  });

  describe('changeFavoriteStatusAction', () => {
    const mockFavorite = {
      id: datatype.uuid(),
      status: Number(datatype.boolean())
    };

    const mockOffer = makeMockOffer();

    it('should dispatch changeFavoriteStatusAction.pending and changeFavoriteStatusAction.fulfilled with thunk changeFavoriteStatusAction', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Favorite}/${mockFavorite.id}/${mockFavorite.status}`).reply(200);
      await store.dispatch(changeFavoriteStatusAction(mockFavorite));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type
      ]);
    });

    it('should have offer in payload when server response is 200', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Favorite}/${mockFavorite.id}/${mockFavorite.status}`).reply(200, mockOffer);
      await store.dispatch(changeFavoriteStatusAction(mockFavorite));

      const fulfilledAction = store.getActions()[1] as ReturnType<typeof changeFavoriteStatusAction.fulfilled>;

      expect(fulfilledAction.payload).toEqual(mockOffer);
    });

    it('should dispatch changeFavoriteStatusAction.pending and changeFavoriteStatusAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Favorite}/${mockFavorite.id}/${mockFavorite.status}`).reply(400);
      await store.dispatch(changeFavoriteStatusAction(mockFavorite));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.rejected.type
      ]);
    });
  });

  describe('checkAuthorizationAction', () => {
    it('should dispatch checkAuthorizationAction.pending and checkAuthorizationAction.fulfilled with thunk checkAuthorizationAction', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200);
      await store.dispatch(checkAuthorizationAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorizationAction.pending.type,
        checkAuthorizationAction.fulfilled.type
      ]);
    });

    it('should have user in payload when server response is 200', async () => {
      const mockUser = makeMockUser();

      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200, mockUser);
      await store.dispatch(checkAuthorizationAction());

      const fulfilledAction = store.getActions()[1] as ReturnType<typeof checkAuthorizationAction.fulfilled>;

      expect(fulfilledAction.payload).toEqual(mockUser);
    });

    it('should dispatch checkAuthorizationAction.pending and checkAuthorizationAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);
      await store.dispatch(checkAuthorizationAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorizationAction.pending.type,
        checkAuthorizationAction.rejected.type
      ]);
    });
  });

  describe('getFavoritesAction', () => {
    it('should dispatch getFavoritesAction.pending and getFavoritesAction.fulfilled with thunk getFavoritesAction', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200);
      await store.dispatch(getFavoritesAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavoritesAction.pending.type,
        getFavoritesAction.fulfilled.type
      ]);
    });

    it('should have favorites in payload when server response is 200', async () => {
      const mockOffer = makeMockOffer();

      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200, [mockOffer]);
      await store.dispatch(getFavoritesAction());

      const fulfilledAction = store.getActions()[1] as ReturnType<typeof getFavoritesAction.fulfilled>;

      expect(fulfilledAction.payload).toEqual([mockOffer]);
    });

    it('should dispatch getFavoritesAction.pending and getFavoritesAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(400);
      await store.dispatch(getFavoritesAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavoritesAction.pending.type,
        getFavoritesAction.rejected.type
      ]);
    });
  });

  describe('getOffersAction', () => {
    it('should dispatch getOffersAction.pending and getOffersAction.fulfilled with thunk getOffersAction', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200);
      await store.dispatch(getOffersAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOffersAction.pending.type,
        getOffersAction.fulfilled.type
      ]);
    });

    it('should have offers in payload when server response is 200', async () => {
      const mockOffer = makeMockOffer();

      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, [mockOffer]);
      await store.dispatch(getOffersAction());

      const fulfilledAction = store.getActions()[1] as ReturnType<typeof getOffersAction.fulfilled>;

      expect(fulfilledAction.payload).toEqual([mockOffer]);
    });

    it('should dispatch getOffersAction.pending and getOffersAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400);
      await store.dispatch(getOffersAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOffersAction.pending.type,
        getOffersAction.rejected.type
      ]);
    });
  });

  describe('loginAction', () => {
    const mockUser = {
      email: internet.email(),
      password: internet.password()
    };

    const mockServerResponse = makeMockUser();

    it('should dispatch loginAction.pending, getFavoritesAction.pending, redirectToRoute, and loginAction.fulfilled with thunk loginAction', async () => {
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, mockServerResponse);
      await store.dispatch(loginAction(mockUser));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        getFavoritesAction.pending.type,
        redirectToRouteAction.type,
        loginAction.fulfilled.type
      ]);
    });

    it('should dispatch loginAction.pending and loginAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(400);
      await store.dispatch(loginAction(mockUser));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch logoutAction.pending and logoutAction.fulfilled with thunk logoutAction', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(200);
      await store.dispatch(logoutAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type
      ]);
    });

    it('should dispatch logoutAction.pending and logoutAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(400);
      await store.dispatch(logoutAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type
      ]);
    });
  });

  describe('requestNearPlacesAction', () => {
    const mockOfferId = datatype.uuid();

    it('should dispatch requestNearPlacesAction.pending and requestNearPlacesAction.fulfilled with thunk requestNearPlacesAction', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockOfferId}/nearby`).reply(200);
      await store.dispatch(requestNearPlacesAction(mockOfferId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        requestNearPlacesAction.pending.type,
        requestNearPlacesAction.fulfilled.type
      ]);
    });

    it('should have near places in payload when server response is 200', async () => {
      const mockOffer = makeMockOffer();

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockOfferId}/nearby`).reply(200, [mockOffer]);
      await store.dispatch(requestNearPlacesAction(mockOfferId));

      const fulfilledAction = store.getActions()[1] as ReturnType<typeof requestNearPlacesAction.fulfilled>;

      expect(fulfilledAction.payload).toEqual([mockOffer]);
    });

    it('should dispatch requestNearPlacesAction.pending and requestNearPlacesAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockOfferId}/nearby`).reply(400);
      await store.dispatch(requestNearPlacesAction(mockOfferId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        requestNearPlacesAction.pending.type,
        requestNearPlacesAction.rejected.type
      ]);
    });
  });

  describe('requestReviewsForOfferAction', () => {
    const mockOfferId = datatype.uuid();

    it('should dispatch requestReviewsForOfferAction.pending and requestReviewsForOfferAction.fulfilled with thunk requestReviewsForOfferAction', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${mockOfferId}`).reply(200);
      await store.dispatch(requestReviewsForOfferAction(mockOfferId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        requestReviewsForOfferAction.pending.type,
        requestReviewsForOfferAction.fulfilled.type
      ]);
    });

    it('should have reviews in payload when server response is 200', async () => {
      const mockReview = makeMockReview();

      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${mockOfferId}`).reply(200, [mockReview]);
      await store.dispatch(requestReviewsForOfferAction(mockOfferId));

      const fulfilledAction = store.getActions()[1] as ReturnType<typeof requestReviewsForOfferAction.fulfilled>;

      expect(fulfilledAction.payload).toEqual([mockReview]);
    });

    it('should dispatch requestReviewsForOfferAction.pending and requestReviewsForOfferAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${mockOfferId}`).reply(400);
      await store.dispatch(requestReviewsForOfferAction(mockOfferId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        requestReviewsForOfferAction.pending.type,
        requestReviewsForOfferAction.rejected.type
      ]);
    });
  });

  describe('requestStandaloneOfferAction', () => {
    const mockOfferId = datatype.uuid();

    it('should dispatch requestStandaloneOfferAction.pending and requestStandaloneOfferAction.fulfilled with thunk requestStandaloneOfferAction', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockOfferId}`).reply(200);
      await store.dispatch(requestStandaloneOfferAction(mockOfferId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        requestStandaloneOfferAction.pending.type,
        requestStandaloneOfferAction.fulfilled.type
      ]);
    });

    it('should have standalone offer in payload when server response is 200', async () => {
      const mockStandaloneOffer = makeMockStandaloneOffer();

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockOfferId}`).reply(200, mockStandaloneOffer);
      await store.dispatch(requestStandaloneOfferAction(mockOfferId));

      const fulfilledAction = store.getActions()[1] as ReturnType<typeof requestStandaloneOfferAction.fulfilled>;

      expect(fulfilledAction.payload).toEqual(mockStandaloneOffer);
    });

    it('should dispatch requestStandaloneOfferAction.pending and requestStandaloneOfferAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockOfferId}`).reply(400);
      await store.dispatch(requestStandaloneOfferAction(mockOfferId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        requestStandaloneOfferAction.pending.type,
        requestStandaloneOfferAction.rejected.type
      ]);
    });
  });

  describe('sendCommentAction', () => {
    const mockComment = {
      id: datatype.uuid(),
      commentData: {
        comment: lorem.sentences(),
        rating: datatype.number({min: 1, max: 5})
      }
    };

    const mockServerResponse = makeMockReview();

    it('should dispatch sendCommentAction.pending and sendCommentAction.fulfilled with thunk sendCommentAction', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${mockComment.id}`).reply(200, mockServerResponse);
      await store.dispatch(sendCommentAction(mockComment));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.fulfilled.type
      ]);
    });

    it('should dispatch sendCommentAction.pending and sendCommentAction.rejected when server response is 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${mockComment.id}`).reply(400);
      await store.dispatch(sendCommentAction(mockComment));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.rejected.type
      ]);
    });
  });
});
