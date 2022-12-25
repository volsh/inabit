import {useState} from "react";
import {useEffect} from "react";
import {useRef} from "react";
import BookListItem from "../BookListItem/BookListItem";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import BookDetails from "../BookDetails/BookDetails";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const BOOKS_PER_PAGE = 30;

const BookList = () => {
  const [books, setBooks] = useState<Array<BookResponse>>();
  const [page, setPage] = useState(0);
  const [activeBook, setActiveBook] = useState<string | undefined>();
  const [activeBookDetails, setActiveBookDetails] = useState<
    (BookFull & {id: string}) | undefined
  >();
  const [favourites, setFavourites] = useState<
    {[key: string]: boolean} | undefined
  >();
  const totalBooks = useRef(0);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&projection=lite&startIndex=${page}&maxResults=${BOOKS_PER_PAGE}`
    )
      .then((res) => res.json())
      .then((books: BooksResponse) => {
        if (!totalBooks.current) {
          totalBooks.current = books.totalItems;
        }
        setBooks(books.items);
      })
      .catch();
  }, [page]);

  useEffect(() => {
    if (activeBook) {
      fetch(activeBook)
        .then((res) => res.json())
        .then((activeBookDetails) =>
          setActiveBookDetails({
            ...activeBookDetails.volumeInfo,
            id: activeBookDetails.id
          })
        )
        .catch();
    }
  }, [activeBook]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleModalClose = () => {
    setActiveBook(undefined);
    setActiveBookDetails(undefined);
  };

  const handleFavourites = (id: string) => {
    setFavourites((prev) => ({
      ...prev,
      [id]: prev && prev[id] ? false : true
    }));
  };
  return (
    <>
      {books ? (
        <>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(totalBooks.current / BOOKS_PER_PAGE)}
              page={page}
              onChange={handlePageChange}
            />
            <List
              sx={{width: "100%", maxWidth: 360, bgcolor: "background.paper"}}
            >
              {books.map((book) => (
                <BookListItem
                  key={book.id}
                  {...book.volumeInfo}
                  onShowMoreClick={() => setActiveBook(book.selfLink)}
                  onFavouritesClick={() => handleFavourites(book.id)}
                  isFavourite={Boolean(favourites && favourites[book.id])}
                />
              ))}
            </List>
            <Pagination
              count={Math.ceil(totalBooks.current / BOOKS_PER_PAGE)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
          <Modal
            open={Boolean(activeBook)}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                // width: 400,
                bgcolor: "background.paper",
                // border: "2px solid #000",
                boxShadow: 24,
                p: 4
              }}
            >
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
              {activeBookDetails ? (
                <BookDetails
                  {...activeBookDetails}
                  onFavouritesClick={() =>
                    handleFavourites(activeBookDetails.id)
                  }
                  isFavourite={Boolean(
                    favourites && favourites[activeBookDetails.id]
                  )}
                />
              ) : (
                <CircularProgress color="secondary" />
              )}
            </Box>
          </Modal>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default BookList;
