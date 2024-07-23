import React, {useState} from 'react'
import { AppDispatch, AppState} from '../store'
import { useDispatch, useSelector} from 'react-redux';
import { ADD_USER } from '../userReducer';
import { authUserLogin} from '../services/fetchData'
import { Redirect} from 'react-router'
import { AlertDialog } from './AlertDialog';

const LoginStatus = {
    NOT_LOGIN: 0,
    IS_LOGGING_IN: 1,
    LOGIN_SUCCESSFUL: 2,
    LOGIN_FAILED: 3,
}

export const RenderLoginPage = () => {
    const user = useSelector((state:AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [alertMsg, setAlertMsg] = useState<string>("");
    const [loginStatus, setLoginStatus] = useState<number>(LoginStatus.NOT_LOGIN);
    const [isDialogClose, setDialogClose] = useState<boolean>(false); // need this for redirect to work

    const onCloseDialog = (() => {
        setAlertMsg("");
        setDialogClose(true); // this will cause a re-render so it will redirect after user closes dialog
        console.log("dialog close");
    })

    const handleSubmit = (evt: React.SyntheticEvent) => {
        evt.preventDefault();
        setDialogClose(false);
        if (loginStatus == LoginStatus.IS_LOGGING_IN) {
            console.log("Already trying to login...");
            return;
        }
        const target = evt.target as typeof evt.target & {
            uname: { value: string };
            passwd: { value: string };
        };
        let userName = target.uname.value;
        let passwd = target.passwd.value;
        
        //validation
        let isValidInput = false;
        isValidInput = (userName.length > 8) && (passwd.length > 8); 
        

        if (isValidInput) {
            setLoginStatus(LoginStatus.IS_LOGGING_IN);
            let res = authUserLogin(userName,passwd);
            res
            .then((resp) => {
                //dispatch to update state
                dispatch({type: ADD_USER, payload: resp.data});
                setAlertMsg("Login successful");
                setLoginStatus(LoginStatus.LOGIN_SUCCESSFUL);
                console.log("User logined successful");
                }
            )
            .catch((error) => {
                    setLoginStatus(LoginStatus.LOGIN_FAILED);
                    if (error.response) {
                        console.log("Received error during login", error.response.data);
                        setAlertMsg("Status code:" + error.response.status);
                    }
                    else if (error.request) {
                        console.log("No response was received for request:", error.request);   
                    }
                    else {
                        console.log('Unknown error:', error.message);
                    }
                }
            )
        }
        else {
            setLoginStatus(LoginStatus.NOT_LOGIN);
            setAlertMsg("Username or password cannot be less than 8");
            console.log("Username or password cannot be less than 8");
        }
    };   
    return (
        <div className="content">
            <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" required name="uname"/>

                <label htmlFor="passwd"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" required name="passwd"/>
                <button type="submit">Login</button>
            </form>
            <div>
                <AlertDialog content={alertMsg} onCloseCB={onCloseDialog}/>
            </div>
            <div>
                {isDialogClose && loginStatus == LoginStatus.LOGIN_SUCCESSFUL && user?.userId &&
                 <Redirect to={"/curUserWork/" + user.userId}/>}
            </div>
            </>
        </div>
    )
}