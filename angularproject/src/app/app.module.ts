import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { ResultComponent } from './result/result.component';
import { CallactionComponent } from './callaction/callaction.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    AboutComponent,
    GetstartedComponent,
    ResultComponent,
    CallactionComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }