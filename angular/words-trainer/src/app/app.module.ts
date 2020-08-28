import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddWordComponent} from './add-word/add-word.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecentPageComponent} from './recent-page/recent-page.component';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {TabsBarComponent} from './tabs-bar/tabs-bar.component';
import {TrainingPageComponent} from './training-page/training-page.component';
import {HttpClientModule} from '@angular/common/http';
import {AddPhraseComponent} from './add-phrase/add-phrase.component';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    TabsBarComponent,
    SettingsPageComponent,
    TrainingPageComponent,
    RecentPageComponent,
    AddWordComponent,
    AddPhraseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
