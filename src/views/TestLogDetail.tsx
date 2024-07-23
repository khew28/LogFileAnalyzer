import React, { useState, useEffect } from 'react';
import {getTestCases, testCaseParameterInterface} from '../services/fetchData'
import { TestLogRecord } from '../model/TestLog'
import { useSelector, useDispatch } from 'react-redux';
import { AppState, AppDispatch } from '../store';
import { LOADING_TESTCASES, ADD_TESTCASES} from '../testCasesReducer';
import {mapTestTypeToString, mapOutcomeToString, mapDefectToString, mapJSONDateTimeToString} from '../common/TestCaseDisplayMapping';


interface RenderTestLogProp {
    selTestLog: TestLogRecord
}
export const RenderTestLog = ( {selTestLog}:RenderTestLogProp) => {
    const selTestCases = useSelector((state:AppState) => state.testCases.testCaseList[selTestLog.testId]);
    const [errMsg, setErrMsg] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    // get data from server
    useEffect( () => {
        if (selTestCases?.length > 0) {
            console.log("Test log was already fetched earlier for id" + selTestLog.testId);
            return;
        }
         
        //fetchTestLogDetail(setTestLog);
        dispatch({type:LOADING_TESTCASES});
        var params = { testLogId: selTestLog.testId} as testCaseParameterInterface;
        getTestCases(params).then((resp) => {
                //setTestLog(resp.data);
                console.log("Get test log successful for test log id:", selTestLog.testId);
                dispatch({type:ADD_TESTCASES, payload:{testLogId:selTestLog.testId, testCases:resp.data}});
                }
            )
            .catch((error) => {
                if (error.response) {
                    console.log("Received error during req", error.response.data);
                    setErrMsg("Error retrieving test log. Status code:" + error.response.status);
                }
                else if (error.request) {
                    console.log("No response was received for request:", error.request);   
                    setErrMsg("No response from server when retrieving test log" + error.request)
                }
                else {
                     console.log('Unknown error:', error.message);
                     setErrMsg('Unknown error when retrieving test log' + error.message);
                }
            })
    },[selTestLog.testId]);
    console.log("RenderTestLog id: " + selTestLog.testId + " and selTestCases: ", selTestCases);
    console.log("selectedTestLog: ", selTestLog);
    return (
        <div className="content">
            {(selTestLog && selTestCases) ?
                <div className="content-history">
                <table className="testlog-testcases">
                    <tbody>
                        <tr>
                           <td className="testlog-testcases-log-field">Log File Name</td>
                           <td className="testlog-testcases-log-val">{selTestLog.fileName}</td>
                        </tr>
                        <tr>
                           <td className="testlog-testcases-log-field">By</td>
                           <td className="testlog-testcases-log-val">{selTestLog.by}</td>
                        </tr>
                        <tr>
                           <td className="testlog-testcases-log-field">Started On</td>
                           <td className="testlog-testcases-log-val">{selTestLog.testBeginTime ? mapJSONDateTimeToString(selTestLog.testBeginTime): ""}</td>
                        </tr>
                        <tr>
                           <td className="testlog-testcases-log-field">Number of Tests Passed</td>
                           <td>{selTestLog.success}</td>
                        </tr>
                        <tr>
                           <td className="testlog-testcases-log-field">Number of Tests Failed</td>
                           <td className="testlog-testcases-log-val">{selTestLog.failed}</td>
                        </tr>
                        <tr>
                           <td className="testlog-testcases-log-field">Number of Software Defects Detected</td>
                           <td className="testlog-testcases-log-val">{selTestLog.defect}</td>
                        </tr>
                        <tr>
                           <td className="testlog-testcases-log-field">List of test cases</td>
                        </tr>
                    </tbody>
                </table>
                <table className="testcases">
                    <tbody>
                    <tr className="testcases">
                        <th className="testcases">Test Type</th>
                        <th className="testcases">Result</th>
                        <th className="testcases">Test Settings</th>
                        <th className="testcases">Is Software Defect</th>
                    </tr>
                    {selTestCases.map((testCase) => (
                    <tr>
                        <td className="testcases">{mapTestTypeToString(testCase.testType)}</td>       
                        <td className="testcases">{mapOutcomeToString(testCase.outcome)}</td>
                        <td className="testcases">{testCase.testSettings}</td>
                        <td className="testcases">{mapDefectToString(testCase.defect)}</td>
                    </tr>
                    ))} 
                    </tbody>
                </table>
                </div>
                :
                <div>{errMsg ? errMsg: ""}</div>
            }
       
        </div>
    )
}