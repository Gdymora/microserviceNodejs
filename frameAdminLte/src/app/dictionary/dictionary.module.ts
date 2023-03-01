import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryComponent } from './dictionary.component';
import { CardComponent } from './card/card.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: DictionaryComponent },
  { path: ':id', component: DictionaryComponent },
];

@NgModule({
  declarations: [
    DictionaryComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ]
})
export class DictionaryModule { }
