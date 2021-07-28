import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../../service/book/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  isSubmitted = false;
  bookCreateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit() {
    this.bookCreateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.bookCreateForm.valid) {
      const book = this.bookCreateForm.value;
      this.bookService.saveBook(book).subscribe(
        () => {
          this.bookCreateForm.reset();
          this.isSubmitted = false;
          alert('Added new book!');
          this.router.navigateByUrl('/books');
        }, e => {
          console.log(e);
        }
      );
    }
  }

  get title() {
    return this.bookCreateForm.get('title');
  }

  get author() {
    return this.bookCreateForm.get('author');
  }

  get description() {
    return this.bookCreateForm.get('description');
  }
}
