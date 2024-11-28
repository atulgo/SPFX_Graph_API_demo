import SpfxGraphApiDemo from "./SpfxGraphApiDemo";
import { AadHttpClient, HttpClientResponse  } from '@microsoft/sp-http';

export const GetToken_AadHttpClient=(SA:SpfxGraphApiDemo)=>{
    SA.props.context.aadTokenProviderFactory.getTokenProvider()
        .then(provider=>provider.getToken(''))
        .then(token=>SA.setState({AccessToken:token})).catch(error => console.log(error))
}

export const GetAadClient=(SA:SpfxGraphApiDemo)=>{
    SA.props.context.aadHttpClientFactory
      .getClient('api://850f8235-7ccd-4bf8-9bd5-fcd799d805f1')
      .then(cli=>{
        console.log('>>>>>>> cli',cli);
        SA.setState({AAdClient:cli})
      }).catch(error => console.log(error));
}

export const TestGraph=(SA:SpfxGraphApiDemo)=>{
    SA.props.context.aadHttpClientFactory
      .getClient('https://graph.microsoft.com')
      .then(client=> {
        console.log('>>>>>>> client',client);
        return client.get( 
            'https://graph.microsoft.com/v1.0/me' 
            , AadHttpClient.configurations.v1
        )
    }).then(inter=>{
        console.log('inter',inter)
        return inter.json()
    }).then(res=>console.log('res',res)).catch(error => console.log(error))
}

export const TestAws_AadHttpClient=(SA:SpfxGraphApiDemo)=>{
    SA.props.context.aadHttpClientFactory
      .getClient('https://login.microsoftonline.com/23eff2d1-89b1-45ae-b476-48cf465542bf')
    //   .getClient('api://850f8235-7ccd-4bf8-9bd5-fcd799d805f1/entraid.oidc')
      .then(client => {
        console.log('>>>>>>> client',client);
        return client.get( SA.apiToConsume, AadHttpClient.configurations.v1);
    }).then(inter=>{console.log('inter',inter)
        return inter.json()
    }).then(res=>console.log('res',res)).catch(error => console.log(error))
} 
