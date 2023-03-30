import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
 
const routes: Routes = [
  { path: '', component: NotesComponent },
];

@NgModule({
  declarations: [
    NotesComponent
  ],
  imports: [    
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class NotesModule { }
