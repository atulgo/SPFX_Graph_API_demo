import * as React from 'react';
import styles from './UploadFileSecure.module.scss';
import type { IUploadFileSecureProps } from './IUploadFileSecureProps';
import { InitStateUploadText, IUploadFileSecureState } from './IUploadFileSecureState';
import { handleclick, onTextInputChange } from './EncryptStringSendtoAws';

export const apiurl='https://ljzvm7wubd.execute-api.us-east-1.amazonaws.com/dev/';

export default class UploadFileSecure extends React.Component<IUploadFileSecureProps, IUploadFileSecureState> {

  constructor(props:IUploadFileSecureProps){
    super(props);
    this.state=InitStateUploadText;
  }
  
  public render(): React.ReactElement<IUploadFileSecureProps> {
    return <>
    <div className={styles.OuterMost}>
      <div> {this.state.UserMessage} </div>
    <input id='TextInput' onChange={(e)=>onTextInputChange(e,this)}/>
    <div>
      <button onClick={_=> handleclick(this)} >Send String</button>
    </div>
    </div>
    </>
  }
}













// Onclick2=(e:any)=>{
//   fetch(url,{method:'POST',headers:{'content-type':'application/json'},
//     body:JSON.stringify({
//       "file_content":this.state.FileContent,
//       "file_name":this.state.FileName,
//     }),
//   }).then(x=>x.json()).then(console.log).catch(console.log)
// }


      // const bbytes= new Uint8Array(await file.arrayBuffer())
      // console.log('>>> bbytes',bbytes)
