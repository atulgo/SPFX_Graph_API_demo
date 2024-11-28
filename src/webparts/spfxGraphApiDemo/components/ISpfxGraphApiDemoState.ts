export interface ISpfxGraphApiDemoState {
  ListItems: {value:any[]};
  ItemID:number;
  AccessToken:string;
  AAdClient:any;
  MSALAccount:any;
}

export const InitState:ISpfxGraphApiDemoState= {
  ListItems:{value:[{webUrl:"hello"}]}
  ,ItemID:0
  ,AccessToken:''
  ,AAdClient:null
  ,MSALAccount:null
}
