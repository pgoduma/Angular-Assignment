import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiKey } from '../keys/api-key';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Book } from '../../../../../libs/shared/models/src/lib/models';
@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  items: Book[];
  constructor(private http: HttpClient) { 
    this.items = [];
  }

  getBooks(query: string):Observable<Book[]>{ //get list of books
    let url = `${ApiKey.BOOKS_URL}?q=${query}`;
    return this.http.get<Book[]>(url)
    .pipe(
      tap(books=>console.log(books)),
      map((books) => {
        return books || []
      }),
      catchError(error => {
        console.log('Throwing error');
        throw new Error(error);
      }));
  }

  getBookById(bookId: string): Observable<Book> { //get book by id
    return this.http.get<Book>(`${ApiKey.BOOKS_URL}/${bookId}`);
  }
}
