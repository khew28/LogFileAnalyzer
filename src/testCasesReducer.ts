import {TestCase} from './model/TestCase';

export const ADD_TESTCASES = "testcases/addNew"
export const LOADING_TESTCASES = "testcases/isLoading"

interface testCaseState {
    isLoading: boolean;
    testCaseList: {[key:string]: TestCase[]},
}
interface testCaseAction {
    type: string,
    payload: { testLogId:string, testCases: TestCase[]} ;
}
export const testCasesReducer = (state:testCaseState = { isLoading:false, testCaseList: {}}, action: testCaseAction): testCaseState => {
    switch (action.type) {
        case LOADING_TESTCASES:
            return { ...state, isLoading:true}
        case ADD_TESTCASES:
            return { ...state, isLoading:false, testCaseList: { ...state.testCaseList, [action.payload.testLogId]: action.payload.testCases}};
        default:
            return {...state}
    }
}

