import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  isSubmitted = false;
  bookEditForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    author: new FormControl(),
    description: new FormControl()
  });
  id: number;

  constructor(private fb: FormBuilder,
              private bookService: BookService,
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
      book => {
        this.bookEditForm = this.fb.group({
          id: [book.id],
          title: [book.title],
          author: [book.author],
          description: [book.description],
        });
      }
    );
  }

  updateBook(id: number) {
    const book = this.bookEditForm.value;
    this.bookService.updateBook(id, book).subscribe(
      () => {
        alert('Updated book');
        this.router.navigateByUrl('/books');
      },
      e => {
        console.log(e);
      }
    );
  }
}
