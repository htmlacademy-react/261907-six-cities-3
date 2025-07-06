import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {appProcess} from './app-process/app-process.slice';
import {appData} from './app-data/app-data.slice';
import {userProcess} from './user-process/user-process.slice';

const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Data]: appData.reducer,
  [NameSpace.User]: userProcess.reducer
});

export {rootReducer};
