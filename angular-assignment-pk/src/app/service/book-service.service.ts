import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiKey } from '../keys/api-key';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BookModel } from '../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) { }

  getBooks(query: string):Observable<BookModel[]>{ //get list of books
    let url = `${ApiKey.BOOKS_URL}?q=${query}`;
    return this.http.get<{items: BookModel[]}>(url)
    .pipe(map((books) => {
        console.log(books);
        return books.items || []
      }),
      catchError(error => {
        console.log('Throwing error');
        throw new Error(error);
      }));
  }

  getBookById(bookId: string): Observable<BookModel> { //get book by id
    return this.http.get<BookModel>(`${ApiKey.BOOKS_URL}/${bookId}`);
  }
}
