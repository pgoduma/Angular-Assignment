export interface Book {
  id:string,
  title:string,
  authors:string[],
  subtitle?:string,
  description?:string,
  smallThumbnail: string,
  thumbnail: string,
  averageRating?: number;
  publisher:string,
  pageCount?: number;
  language?:string,
  billingName?: string,
  billingPhone?: string,
  billingEmail?: string,
  billingAddress?: string,
}
