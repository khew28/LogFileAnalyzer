import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { LOADING_HISTORY,ADD_HISTORY } from '../historyReducer';
import React from 'react';
import { RenderTestLogs} from './TestLogsView'

export const RenderHistory = () => {
    const testLogs = useSelector((state:AppState) => state.testLogHistory);
    //console.log("TestLogStat: ",testLogsStat);

    console.log("RenderHistory");
    return (
        <div className="content">
            <div className="content-history">
            <RenderTestLogs logs={testLogs.testLogsAllHist}/>
            </div>
        </div>
    )
}
