import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

const containerElementName = 'customReactProviderComponentContainer';

@Component({
  selector: 'app-react-provider',
  template: ` <h3 style="color: cadetblue">RsLib (React Microfrontend)</h2>
    <span #${containerElementName}></span>`,
  encapsulation: ViewEncapsulation.None,
})
export class ReactProviderComponent {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;
  root!: any;

  constructor() {}

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.root.render('Loading script...');
    try {
      import('react_provider/App').then(val => {
        this.root.render(React.createElement(val.App));
      });
    } catch (error) {
      console.log('Error', error);
    }
  }

  ngOnDestroy() {
    this.root.unmountComponentAtNode(this.containerRef.nativeElement);
  }
}
