import React, {useEffect, useState} from 'react';
import { getUserTestLogs } from '../services/fetchData'
import {useParams} from 'react-router-dom';
import {TestLogRecord} from '../model/TestLog'
import { RenderTestLogs} from './TestLogsView'
import { useSelector, useDispatch } from 'react-redux';
import { AppState, AppDispatch } from '../store';
import { NavLink } from 'react-router-dom';
import {LOADING_MY_HISTORY,ADD_MY_HISTORY} from '../historyReducer'


export const RenderUserTestLogs = () => {
    let { id } = useParams<{ id: string }>();
    const [errMsg, setErrMsg] = useState<string>("");
    const user = useSelector((state:AppState) => state.user);
    const testLogsHist = useSelector((state:AppState) => state.testLogHistory);
    const dispatch = useDispatch<AppDispatch>();
    
    // get data from server
    useEffect(()=> {
        if ((!user) || (testLogsHist.hasLoadedMyHist)) {
            console.log("RenderUserTestLogs: User is null or hasLoadedMyHist", testLogsHist.hasLoadedMyHist);
            return;
        }
        dispatch({type: LOADING_MY_HISTORY });
        let res= getUserTestLogs(id);
        res.then((resp) => {
                //setTestLogs(resp.data);
                dispatch({type: ADD_MY_HISTORY, payload: resp.data})
                }
            )
            .catch((error) => {
                    if (error.response) {
                        console.log("Received error during login", error.response.data);
                        setErrMsg("Error in retrieving test log from server::" + error.response.status);
                    }
                    else if (error.request) {
                        console.log("No response was received for request:", error.request);   
                        setErrMsg("No response was received for request" + error.response.status);
                    }
                    else {
                        console.log('Unknown error:', error.message);
                        setErrMsg("Unknown error:" + error.response.status);
                    }
                }
            )
    },[])

    console.log("RenderUserTestLogs", testLogsHist.testLogsMyHist);
    return (
        <div className="content">
            <div className="content-history">
                {user ? 
                    !errMsg && testLogsHist.hasLoadedMyHist && testLogsHist.testLogsMyHist ? 
                        <RenderTestLogs logs={testLogsHist.testLogsMyHist}/>
                    :
                        <></>
                :
                    <span>Please <NavLink to="/loginRegister">login/register</NavLink> first</span>
                }
            </div>
        </div>
    )
}