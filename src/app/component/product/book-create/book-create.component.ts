import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../../service/book/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  isSubmitted = false;
  bookCreateForm: FormGroup = new FormGroup({
    title: new FormControl(),
    author: new FormControl(),
    description: new FormControl()
  });

  constructor(private fb: FormBuilder,
              private bookService: BookService,
              private router: Router) {
    this.bookCreateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.isSubmitted = true;
    if (this.bookCreateForm.valid) {
      const book = this.bookCreateForm.value;
      this.bookService.saveBook(book).subscribe(
        () => {
          this.isSubmitted = false;
          this.bookCreateForm.reset();
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
