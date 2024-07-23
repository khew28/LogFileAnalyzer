/* All global state reducers should be placed here
*/

import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './userReducer'
import { histReducer } from './historyReducer';
import { testCasesReducer } from './testCasesReducer'
export const INIT_APP = "init/app"
export const rootReducer= combineReducers({
    user: userReducer,
    testLogHistory: histReducer,
    testCases: testCasesReducer,
})
