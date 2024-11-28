import "@pnp/graph/lists";
import "@pnp/graph/sites"
import "@pnp/graph/list-item"
import SpfxGraphApiDemo from './SpfxGraphApiDemo';
import {MSGraphClientV3} from '@microsoft/sp-http';

export const GetListItems_MSGraph=( ListId:string,SG:SpfxGraphApiDemo):void=>{
    const SiteId = SG.props.context.pageContext.site.id ;
    SG.props.context.msGraphClientFactory.getClient('3')
    .then(cli=>cli.api(`/sites/${SiteId}/lists/${ListId}/items`))
    .then(res=> res.get( (err,res)=>{
        if(err){
          console.log('err',err)
        }else{  
          console.log(`List  Items:`,res);
          SG.setState({ListItems:res})
        }
      })
    ).catch(error => console.error(error));
  }

export const GetListItems_PNPGraph=( SG:SpfxGraphApiDemo):void=>{
  const SiteId = SG.props.context.pageContext.site.id ;
  SG._graph.sites.getById(SiteId.toString()).lists.getById(SG._listId).items()
    .then(items=>{
      console.log('List items2:',items);
      SG.setState({
        ListItems:{value:items}
        ,ItemID:parseInt(items[0].id||'0')
      });
    })
    .catch(error => console.log(error));
}

export const SetListItemByid=( SG:SpfxGraphApiDemo):void=>{
  // const url = "/sites/" + SG.props.webId + "/lists/" + SG._listId + "/items/"+ SG.state.ItemID + "/fields";

  const url = "/sites/" + SG.props.webId + "/lists/" + SG._listId + "/items/29/fields";
  const fieldValueSet = {Title:  new Date().toLocaleString() };
    SG.props.context.msGraphClientFactory
    .getClient('3').then((client: MSGraphClientV3): void => {
      client.api(url)
        .version("v1.0")
        .update(fieldValueSet, (err, res, _success) => {
          if (err) {  
            console.log('err :', err);
          } else {
            console.log('res  :', res);
          }
        }).catch(error => console.error('error1',error));
    }).catch(error => console.error('error2',error));
}

export const SetListItemByid_PNPGraph=(itemID: number, listId:string,SG:SpfxGraphApiDemo):void=>{
  const SiteId = SG.props.context.pageContext.site.id ;
  SG._graph.sites.getById(SiteId.toString()).lists.getById(listId).items.getById("1").update({Title:new Date().toLocaleDateString()})
    .then(res=>console.log(res))
    .catch(error => console.log(error));
}

export const GetAllSites_CHATGPT=(SG:SpfxGraphApiDemo)=>{
  fetch("https://graph.microsoft.com/v1.0/sites/root/sites", {
    headers: { Authorization: `Bearer ${SG.state.AccessToken}`}
  }).then(hdrs=>hdrs.json)
  .then(res=>console.log("SharePoint Sites:", res))
  .catch(error => console.log(error));
}


//'Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IkM4cFpBaDZwcmlFTmxraTREV29LZ1hQV28yN0FNTHhaLTZGUjZ4aEhNMU0iLCJhbGciOiJSUzI1NiIsIng1dCI6IjNQYUs0RWZ5Qk5RdTNDdGpZc2EzWW1oUTVFMCIsImtpZCI6IjNQYUs0RWZ5Qk5RdTNDdGpZc2EzWW1oUTVFMCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMjNlZmYyZDEtODliMS00NWFlLWI0NzYtNDhjZjQ2NTU0MmJmLyIsImlhdCI6MTczMDUyMjY5NiwibmJmIjoxNzMwNTIyNjk2LCJleHAiOjE3MzA1MjY1OTYsImFpbyI6ImsyQmdZRWhjODIrdGpyVEN2VmUxWnUzMnpOTXVBQUE9IiwiYXBwX2Rpc3BsYXluYW1lIjoiRXh0ZXJuYWxBY2Nlc3NTUEFwcF9Gb3JfRml0Y2giLCJhcHBpZCI6Ijg1MGY4MjM1LTdjY2QtNGJmOC05YmQ1LWZjZDc5OWQ4MDVmMSIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzIzZWZmMmQxLTg5YjEtNDVhZS1iNDc2LTQ4Y2Y0NjU1NDJiZi8iLCJpZHR5cCI6ImFwcCIsIm9pZCI6ImYzZjhjY2ZkLWQ4NGYtNDAxYi1iMzU4LTAxZGY1OWZjMDc2ZiIsInJoIjoiMS5BVmtBMGZMdkk3R0pya1cwZGtqUFJsVkN2d01BQUFBQUFBQUF3QUFBQUFBQUFBRDdBQUJaQUEuIiwicm9sZXMiOlsiQnJvd3NlclNpdGVMaXN0cy5SZWFkLkFsbCIsIkxpc3RJdGVtcy5TZWxlY3RlZE9wZXJhdGlvbnMuU2VsZWN0ZWQiLCJTaXRlcy5SZWFkV3JpdGUuQWxsIiwiRmlsZXMuUmVhZFdyaXRlLkFsbCIsIkJyb3dzZXJTaXRlTGlzdHMuUmVhZFdyaXRlLkFsbCIsIkxpc3RzLlNlbGVjdGVkT3BlcmF0aW9ucy5TZWxlY3RlZCJdLCJzdWIiOiJmM2Y4Y2NmZC1kODRmLTQwMWItYjM1OC0wMWRmNTlmYzA3NmYiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiIyM2VmZjJkMS04OWIxLTQ1YWUtYjQ3Ni00OGNmNDY1NTQyYmYiLCJ1dGkiOiJPUHdlV0k2R29rQ2JESFhGd3NsZEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIwOTk3YTFkMC0wZDFkLTRhY2ItYjQwOC1kNWNhNzMxMjFlOTAiXSwieG1zX2lkcmVsIjoiMTYgNyIsInhtc190Y2R0IjoxNjYxODEzOTg4fQ.aa78B4LSly02C44McKzEb3TLW4lyoDvfLje-fkas9tm4X1y9Y3rlBgHx9upN84uhB3uwfzOjDW0S7n37Ftt8CcPKncPiJZXUsQTG2oYGxs5vn80v78sCX4Q-UkUgbUp5r_LwnDfZQQOcqG5Z_Pt1DZUjH0HqQqnshhCeb93VCRBntA3iST-VGi-Gl716fky1Yedr2yx_aKCPfOMHhKu_m2pvSti_GAGmkHoOAZ-qWeZeiSzBk5-zCEOz5Ai_cQDwAlRb6r8KsflYGyYLb3EC2R8u0nhE3WSvuRtaRAJ4oz0BgbSPfZCxlgKlCyokCNsSx9lnVPjsCEsVQYBoYlPoLg'