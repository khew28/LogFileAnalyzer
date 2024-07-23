import { rootReducer, INIT_APP } from "./reducer"
import { configureStore } from '@reduxjs/toolkit'
import { signalRMiddleware} from './webSocketMiddleware'
/* simulation 
(window as any).INITIAL_STATE = { 
                      user: {
                        userName: "IV\\khew",
                      },
                      testLogHistory: {
                          isLoading : false,
                          hasLoadedAllHist: true,
                          testLogsAllHist : 
                          [ 
                            { testId: "1", fileName: "tracelog_1.txt", success: 20, failed: 2, defect: 0, by: "Kelvin Hew", dateTime: "Jul 30, 2021 9 pm"},
                            { testId: "888", fileName: "tracelog_888.txt", success: 2, failed: 12, defect: 1, by: "Dinesh", dateTime: "Jul 30, 2021 8 am"},
                            { testId: "123456", fileName: "tracelog_123456.txt", success: 1, failed: 30, defect: 0, by: "Shukri", dateTime: "Jun 30, 2021 7:45 am"},
                            { testId: "9887712", fileName: "tracelog_9887712.txt", success: 120, failed: 30, defect: 0, by: "Shukri", dateTime: "Jan 2, 2021 10:45 am"},
                          ],
                          isLoadingMyHist: false,
                          hasLoadedMyHist: false,
                          testLogsMyHist: [],
                         },
                      testCases: {
                            isLoading: false, 
                            testCaseList: {},
                         }
                    };
*/
const initialState = (window as any).INITIAL_STATE;

const store = configureStore({  reducer: rootReducer,middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signalRMiddleware), preloadedState: initialState })
store.dispatch({type: INIT_APP, payload: {}});
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export { store};