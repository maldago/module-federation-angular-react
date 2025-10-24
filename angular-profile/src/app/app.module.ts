import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import {UserState} from './profile/user-state/state/user.state';
import {importRemote} from '@module-federation/utilities';
import {init, loadRemote} from '@module-federation/enhanced/runtime';


init({
 name: '@intelligent-growth-solutions/react-19',
  remotes: [
    {
      name: 'remote-entry',
      entry: 'http://localhost:3004/mf-manifest.json',
    },
  ],
})

export function initializeApp(): () => void {
  return () => {
    importRemote({
      url: 'http://localhost:3002',
      scope: 'list_user',
      module: './ListUserReactComponent',
    });
    importRemote({
      url: 'http://localhost:3000/mf/remoteEntry.mjs',
      scope: 'react_provider',
      module: './App',
    });
    importRemote({
      url: 'http://localhost:3004/mf/remoteEntry.mjs',
      scope: 'remote-entry',
      module: './remote-entry',
    });
    loadRemote('remote-entry/remote-entry');
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
