import { Guid } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpfxGraphApiDemoProps {
  description: string;
  context:WebPartContext;
  webId: Guid;
}
