import {Component, OnInit} from '@angular/core';
import {Book} from '../../../model/book';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  isSubmitted = false;
  book: Book = {};
  id: number;

  constructor(private bookService: BookService,
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
      book => this.book = {
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description
      }
    );
  }

}
