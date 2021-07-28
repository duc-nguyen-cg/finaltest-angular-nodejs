import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Book} from '../../../model/book';

@Component({
  selector: 'app-product-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {
  isSubmitted = false;
  deletedBook: Book = {};
  id: number;
  bookDeleteForm: FormGroup = new FormGroup({
    id: new FormControl()
  });

  constructor(private bookService: BookService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.id = +paramMap.get('id');
        this.getBook(this.id);
      }
    );
  }

  ngOnInit() {
  }

  getBook(id: number) {
    return this.bookService.findById(id).subscribe(
      book => this.deletedBook = {
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description
      }
    );
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(
      () => {
        this.router.navigate(['/books']);
        alert('Deleted book!');
      },
      e => {
        console.log(e);
      }
    );
  }
}
