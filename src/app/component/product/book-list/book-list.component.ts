import {Component, OnInit} from '@angular/core';
import {Book} from '../../../model/book';
import {BookService} from '../../../service/book/book.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private productService: BookService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.productService.getAll().subscribe(
      products => this.books = products
    );
  }
}
