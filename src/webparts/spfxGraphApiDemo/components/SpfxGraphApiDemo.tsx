import * as React from 'react';
import type { ISpfxGraphApiDemoProps } from './ISpfxGraphApiDemoProps';
import { InitState, ISpfxGraphApiDemoState } from './ISpfxGraphApiDemoState';
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";
import "@pnp/graph/lists";
import "@pnp/graph/sites"
import "@pnp/graph/list-item"

import '@pnp/sp';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/webs';
import { spfi, SPFI, SPFx, SPFxToken } from '@pnp/sp';
import { UploadFile } from './UploadFile';
import { GetAadClient, TestAws_AadHttpClient } from './AadHttpClientTest';
import styles from './SpfxGraphApiDemo.module.scss';

export default class SpfxGraphApiDemo extends React.Component<ISpfxGraphApiDemoProps,ISpfxGraphApiDemoState > {
  clientId:string = "850f8235-7ccd-4bf8-9bd5-fcd799d805f1";
  tenantId:string = "23eff2d1-89b1-45ae-b476-48cf465542bf";
  redirectUri:string = "https://4zh1xz.sharepoint.com/"; 
  scope:string = "Sites.ReadWrite.All"; 
  authUrl:string = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize?client_id=${this.clientId}` + `&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}` + `&response_mode=query&scope=${encodeURIComponent(this.scope)}&state=12345`;
  _graph:GraphFI=graphfi().using(graphSPFx(this.props.context) );
  _listId='97a8ed86-e5d4-4f00-aad5-6fb54f03032b';       // List Name - Test Extension
  _TokUrl:string = 'https://login.microsoftonline.com/23eff2d1-89b1-45ae-b476-48cf465542bf/oauth2/token';
  _sp:SPFI=spfi().using(SPFx(this.props.context));

  apiHost='api://850f8235-7ccd-4bf8-9bd5-fcd799d805f1';
  apiToConsume='https://rn5spkg241.execute-api.us-east-1.amazonaws.com/dev/uploadfile';

  constructor(props:ISpfxGraphApiDemoProps){
    super(props);
    this.state=InitState;
  }

  // _TokReqbody:string='grant_type=client_credentials&client_id=850f8235-7ccd-4bf8-9bd5-fcd799d805f1&client_secret=gPc8Q~g46k2Vt5aQUaLhpgm1pDCCm1TC3oRBjaPy&resource=https://graph.microsoft.com/' ;
  _TokReqbody:string='grant_type=client_credentials&client_id=850f8235-7ccd-4bf8-9bd5-fcd799d805f1&resource=https://graph.microsoft.com/' ;



  public render(): React.ReactElement<ISpfxGraphApiDemoProps> {
    return <>
      <h1>Hello</h1>
      {/* {this.state.ListItems.value.map(item=><div>{item.webUrl}</div>)}
      <div className={styles.btndiv} ><button onClick={_=>GetListItems_PNPGraph(this)}> GET List Items </button>      </div>
      <div className={styles.btndiv}><button onClick={_=>this.Authorize()}>Get Authorization Code</button>      </div>
      <div className={styles.btndiv}><button onClick={_=>this.GetAccessToken()}>Get Access Token</button>      </div>

      <div className={styles.btndiv}>{<button onClick={_=>SetListItemByid(this)}> EDIT Using Graph API </button>}      </div>
      <div className={styles.btndiv}>{<button onClick={_=>EditList_WithoutGraphApi(this)}> EDIT Using Regular API </button>}      </div>
      <div className={styles.btndiv}>{<button onClick={_=>CallAwsApi_aadclient(this)}> CallAwsApi_aadclient </button>}      </div> */}
      <div className={styles.btndiv}>{<button onClick={_=>TestAws_AadHttpClient(this)}> Test Aadclient </button>}      </div> 
      
      {/* <div>{UploadFile(this)}</div> */}
   </>
  }
}
