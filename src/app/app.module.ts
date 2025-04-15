import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormField } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ExerciseTreeComponent } from './exercise-tree/exercise-tree.component';
import { ExercisePanelComponent } from './exercise-panel/exercise-panel.component';
import { VocabularyPanelComponent } from './vocabulary-panel/vocabulary-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    ExerciseTreeComponent,
    ExercisePanelComponent,
    VocabularyPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,       // <-- Important for ngModel
    HttpClientModule,   // <-- Important for making HTTP requests
    MatFormField, 
    MatLabel, 
    MatInputModule, 
    MatSelectModule, 
    MatFormFieldModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
