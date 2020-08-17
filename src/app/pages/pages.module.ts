import { FilesModule } from './files/files.module';
import { NgModule } from '@angular/core';
import { NbMenuModule, NbButtonModule, NbTreeGridModule,NbProgressBarModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

import { NbIconModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,NbProgressBarModule ,
    NbMenuModule,
    NbButtonModule,
    DashboardModule,
    FilesModule,
    NbTreeGridModule, NbIconModule, NbCardModule, NbCheckboxModule
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
