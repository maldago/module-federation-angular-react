import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ReactProviderComponent } from './components/react/react-provider.component';

const EXPORTS = [ListUserComponent, ReactProviderComponent];

@NgModule({
  declarations: [ProfileComponent, ListUserComponent, ReactProviderComponent, ...EXPORTS],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [...EXPORTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule {
  static exports = EXPORTS; // prevents from components being tree-shaked in production
}
