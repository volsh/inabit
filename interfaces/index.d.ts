interface BookPartial {
  title: string;
  authors: Array<string>;
  description: string;
  imageLinks: ImageLinks;
  publisher: string;
  publishedDate: string;
}

interface BookFull extends BookPartial {
  categories: Array<string>;
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  imageLinks: ImageLinksFull;
  language: string;
  previewLink: string;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface ImageLinksFull extends ImageLinks {
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

interface BookResponse {
  volumeInfo: BookPartial;
  id: string;
  selfLink: string;
}

interface BooksResponse {
  items: Array<BookResponse>;
  totalItems: number;
}
