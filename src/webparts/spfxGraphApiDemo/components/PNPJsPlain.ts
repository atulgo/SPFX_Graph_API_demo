import '@pnp/sp';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/webs';
import SpfxGraphApiDemo from './SpfxGraphApiDemo';

export const EditList_WithoutGraphApi=(SG:SpfxGraphApiDemo):void=>{
    SG._sp.web.lists.getById(SG._listId).items.getById(SG.state.ItemID).update({
        Title: new Date().toLocaleString()
    }).catch(error => console.log(error));
}