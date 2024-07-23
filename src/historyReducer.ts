import {TestLogRecord} from './model/TestLog'
export const ADD_HISTORY = "history/addAllLogs"
export const LOADING_HISTORY = "history/isLoading"
export const UPDATE_TEST_LOG_RT = "history/update"
export const ADD_MY_HISTORY = "myHistory/addMyLogs"
export const LOADING_MY_HISTORY = "myHistory/isLoading"

   
export type HistoryState = { 
    isLoadingAllHist: boolean , 
    testLogsAllHist: TestLogRecord[],
    hasLoadedAllHist: boolean,
    isLoadingMyHist: boolean , 
    hasLoadedMyHist: boolean ,
    testLogsMyHist: TestLogRecord[] 
};
interface HistoryAction {
    type: string;
    payload: TestLogRecord[] ;
}
export const histReducer = (
    state: HistoryState = { isLoadingAllHist: false, hasLoadedAllHist: false, testLogsAllHist: [], 
                            isLoadingMyHist: false, hasLoadedMyHist: false, testLogsMyHist: []},
    action: HistoryAction): HistoryState => {
        switch (action.type) {
            case ADD_HISTORY:
                return { ...state, hasLoadedAllHist: true, testLogsAllHist: action.payload };
            case LOADING_HISTORY:
                return { ...state, isLoadingAllHist: true};
            case ADD_MY_HISTORY:
                return { ...state, hasLoadedMyHist: true, testLogsMyHist: action.payload };
            case LOADING_MY_HISTORY:
                return { ...state, isLoadingMyHist: true};
            case UPDATE_TEST_LOG_RT:
                if (state.testLogsAllHist.findIndex( val => val.testId == action.payload[0].testId) >= 0) {
                    return { ...state,
                        testLogsAllHist: state.testLogsAllHist.map(val => 
                          (val.testId == action.payload[0].testId) ? 
                            { ...val, 
                              testBeginTime: action.payload[0].testBeginTime, 
                              success: action.payload[0].success,
                              failed: action.payload[0].failed,
                              defect: action.payload[0].defect,
                              status: action.payload[0].status }
                          : { ...val }
                      )}
                }
                else {
                    return { ...state,
                        testLogsAllHist: [...state.testLogsAllHist, action.payload[0]]
                    }
                }
            default:
                return { ...state };
        }
    }
