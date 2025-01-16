import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TypeaheadComponent } from './typeahead.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

const routes: Routes = [
  { path: '', component: TypeaheadComponent }
];

@NgModule({
  declarations: [
    TypeaheadComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ScrollingModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel
  ]
})
export class TypeaheadModule { }
