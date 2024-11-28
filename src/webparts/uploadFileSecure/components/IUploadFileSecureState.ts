export interface IUploadFileSecureState {
  FileName:string;
  FileContent:string|ArrayBuffer|Blob|File;
  TextToBeSend:string;
  UserMessage:string;
}

export const InitStateUploadText:IUploadFileSecureState={
  FileName:'',
  FileContent:'',
  TextToBeSend:'',
  UserMessage:'placeholder',
}