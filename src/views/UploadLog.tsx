import React, {useState,  useRef } from 'react'
import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { NavLink } from 'react-router-dom';
import {uploadLogFile} from '../services/fetchData'
import { AlertDialog } from './AlertDialog';

const RenderUploadForm = () => {
    const onCloseDialog = (() => {
        setAlertMsg("");
        console.log("dialog close");
    })

    const handleSubmit =  (evt: React.SyntheticEvent) => {
        const target = evt.target as typeof evt.target & {
            comments: { value: string };
        };
        evt.preventDefault();
        if (target.comments != null) {
            formData.append("comments", target.comments.value);
        }
        if (isUploading) {
            return;
        }
        setIsUploading(true);
        console.log("Uploading log file");
        
        let resp = uploadLogFile(
            {  formData: formData, 
               uploadProgress: 
                    (event: any) => {
                            setProgress(Math.round((100 * event.loaded) / event.total));
                        }
            });
        resp.then( 
            () => {setAlertMsg("Upload successful")}
        )
        .catch((error) => {
            if (error.response) {
                console.log("Received error during upload", error.response.data);
                setAlertMsg("Status code:" + error.response.status);
            }
            else if (error.request) {
                console.log("No response was received during upload:", error.request);   
                setAlertMsg("No response was received during upload:" + error.request);
            }
            else {
                console.log('Unknown error:', error.message);
                setAlertMsg("No response was received during upload:" + error.request);
            }
        });
        setIsUploading(false);
    }

    const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>)  => {
        if (evt.target.files != null) {
            console.log("traceFile is ", evt.target.files[evt.target.files.length-1])
            formData.set("traceFile", evt.target.files[evt.target.files.length-1])
            setFormData(formData);
        }
    }
    
    const [formData, setFormData] = useState<FormData>(new FormData());
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>("");
    return (
        <>
        <form id="uploadTraceFile" onSubmit={handleSubmit}>
            <label htmlFor="traceFile"><b>Select trace log file:</b></label><br></br>
            <input type="file" id="traceFile" name="traceFile" onChange={handleFileChange}/><br></br>
            <label htmlFor="comments"><b>Add comments (optional):</b></label><br></br>
            <input type="text" placeholder="(ODM version,for RC XX,etc):" name="comments"/><br></br>
            <input type="submit"  value="Upload File"/>
        </form>
        {isUploading && 
            <>
            <label htmlFor="file">Uploading progress:</label>
            <progress id="file" value={progress} max="100"></progress>
            </>
        }
        <div>
            <AlertDialog content={alertMsg} onCloseCB={onCloseDialog}/>
        </div>
        </>
    )
}

export const RenderUploadPage = () => {
    const user = useSelector((state:AppState) => state.user);
    return (
      <div className="content">
          {!user ?
            <span>Please <NavLink to="/loginRegister">login/register</NavLink> first</span>
           :
            RenderUploadForm()
          }
      </div>
    ) 
   }
   