import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SpfxGraphApiDemoWebPartStrings';
import SpfxGraphApiDemo from './components/SpfxGraphApiDemo';
import { ISpfxGraphApiDemoProps } from './components/ISpfxGraphApiDemoProps';

export interface ISpfxGraphApiDemoWebPartProps {
  description: string;
}

export default class SpfxGraphApiDemoWebPart extends BaseClientSideWebPart<ISpfxGraphApiDemoWebPartProps> {
  public render(): void {
    const element = React.createElement(
      SpfxGraphApiDemo,
      {
        description: this.properties.description,
        context:this.context,
        webId: this.context.pageContext.site.id
      }
    );
    ReactDom.render(element, this.domElement);
  }
  // public render(): void {
  //   const element: React.ReactElement<ISpfxGraphApiDemoProps> = React.createElement(
  //     SpfxGraphApiDemo,
  //     {
  //       description: this.properties.description,
  //       context:this.context,
  //       webId: this.context.pageContext.site.id
  //     }
  //   );
  //   ReactDom.render(element, this.domElement);
  // }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
