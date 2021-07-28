import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
          title: [book.title, [Validators.required, Validators.minLength(3)]],
          author: [book.author, [Validators.required]],
          description: [book.description, [Validators.required]],
        });
      }
    );
  }

  updateBook(id: number) {
    this.isSubmitted = true;
    if (this.bookEditForm.valid) {
      const book = this.bookEditForm.value;
      this.bookService.updateBook(id, book).subscribe(
        () => {
          alert('Updated book');
          this.isSubmitted = false;
          this.router.navigateByUrl('/books');
        },
        e => {
          console.log(e);
        }
      );
    }
  }

  get title() {
    return this.bookEditForm.get('title');
  }

  get author() {
    return this.bookEditForm.get('author');
  }

  get description() {
    return this.bookEditForm.get('description');
  }
}
