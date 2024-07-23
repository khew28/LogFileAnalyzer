import React, {useState} from 'react'

type AlertDialogProp = {
    content: string,
    onCloseCB?: ()=>void,
}

/* Dialog popup whenever porp.content's length is > 0. 
   onCloseCB is invoked if not null when dialog is close
   */
export const AlertDialog = (prop:AlertDialogProp) => {
    
    const onClose = (() => {
        prop.onCloseCB?.();
    }
    )
    return (

      <div className="popup-box" hidden={(prop.content.length == 0)?true:false}>
        <div className="box">
            <span className="close-icon" onClick={onClose}>x</span>
            {prop.content}
        </div>
       </div>
    )
}