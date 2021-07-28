import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BookDetailComponent } from './book-detail/book-detail.component';


@NgModule({
  declarations: [BookListComponent, BookCreateComponent, BookEditComponent, BookDeleteComponent, BookDetailComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookModule { }
