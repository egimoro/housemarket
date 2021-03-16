import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';

import {DashboardComponent} from './dashboard/dashboard.component';
import { PropertiesComponent} from './properties/properties.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';

const routes: Routes = [

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'markets/:id', component: PropertyDetailComponent},
  {path: 'markets', component: PropertiesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
