import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AddWordComponent} from './add-word/add-word.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecentPageComponent} from './recent-page/recent-page.component';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {TabsBarComponent} from './tabs-bar/tabs-bar.component';
import {TrainingPageComponent} from './training-page/training-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsBarComponent,
    SettingsPageComponent,
    TrainingPageComponent,
    RecentPageComponent,
    AddWordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
