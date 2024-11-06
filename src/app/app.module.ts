import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <-- Import HttpClientModule here

import { AppComponent } from './app.component';
import { GoogleAutocompleteDirective } from './google-autocomplete.directive';

@NgModule({
  declarations: [
    AppComponent,
    GoogleAutocompleteDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule  // <-- Add HttpClientModule to the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
