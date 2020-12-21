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

    constructor(book, id){
        this.id = id;
        if(book){
            this.title = book.title;
            this.subtitle = book.subtitle;
            this.description = book.description;
            this.authors = book.authors;
            this.imageLinks.smallThumbnail = book.imageLinks?book.imageLinks.smallThumbnail:'';
            this.imageLinks.thumbnail = book.imageLinks?book.imageLinks.thumbnail:'';
            this.averageRating = book.averageRating;
            this.publisher = book.publisher;
            this.pageCount = book.pageCount;
            this.language = book.language;
        }
    }
}
