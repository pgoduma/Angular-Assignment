export class BookModel{
    id:string = '';
    title:string = '';
    subtitle:string = '';
    authors:string[] = [];
    description:string = '';
    imageLinks: any = {};
    averageRating: number;
    publisher:string = '';
    pageCount: number;
    language:string = '';
    billingName: string = '';
    billingPhone: string = '';
    billingEmail: string = '';
    billingAddress: string = '';

    constructor(book){
        this.id = book.id;
        this.title = book.volumeInfo.title;
        this.subtitle = book.volumeInfo.subtitle;
        this.description = book.volumeInfo.description;
        this.authors = book.volumeInfo.authors;
        this.imageLinks.smallThumbnail = book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.smallThumbnail:'';
        this.imageLinks.thumbnail = book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.thumbnail:'';
        this.averageRating = book.volumeInfo.averageRating;
        this.publisher = book.volumeInfo.publisher;
        this.pageCount = book.volumeInfo.pageCount;
        this.language = book.volumeInfo.language;
    }
}
