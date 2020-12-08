export class BookModel{
    id:string = '';
    title:string = '';
    subtitle:string = '';
    authors:string[] = [];
    description:string = '';
    imageLinks: any = {};
    
    constructor(item){
        this.id = item.id;
        this.title = item.volumeInfo.title;
        this.subtitle = item.volumeInfo.subtitle;
        this.description = item.volumeInfo.description;
        this.authors = item.volumeInfo.authors;
        this.imageLinks.smallThumbnail = item.volumeInfo.imageLinks?item.volumeInfo.imageLinks.smallThumbnail:'';
        this.imageLinks.thumbnail = item.volumeInfo.imageLinks?item.volumeInfo.imageLinks.thumbnail:'';
    }
}
