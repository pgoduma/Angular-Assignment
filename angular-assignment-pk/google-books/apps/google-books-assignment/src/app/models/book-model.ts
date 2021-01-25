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
            this.title = book?book.title:'';
            this.subtitle = book?book.subtitle:'';
            this.description = book?book.description:'';
            this.authors = book?book.authors:[];
            this.imageLinks.smallThumbnail = book?book.imageLinks?book.imageLinks.smallThumbnail:'':'';
            this.imageLinks.thumbnail = book?book.imageLinks?book.imageLinks.thumbnail:'':'';
            this.averageRating = book?book.averageRating:'';
            this.publisher = book?book.publisher:'';
            this.pageCount = book?book.pageCount:'';
            this.language = book?book.language:'';
    }
}
