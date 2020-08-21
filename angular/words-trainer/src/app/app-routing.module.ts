import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecentPageComponent} from './recent-page/recent-page.component';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {TrainingPageComponent} from './training-page/training-page.component';

const routes: Routes = [
  {path: '', component: RecentPageComponent},
  {path: 'settings', component: SettingsPageComponent},
  {path: 'training', component: TrainingPageComponent},
  {path: 'recent', component: RecentPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
