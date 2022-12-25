import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import BookIcon from "@mui/icons-material/Book";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import NotFavourite from "@mui/icons-material/FavoriteBorder";

import styles from "./styles.module.scss";

interface BookListItemProps extends BookPartial {
  onShowMoreClick: () => void;
  isFavourite: boolean;
  onFavouritesClick: () => void;
}

const BookListItem = (props: BookListItemProps) => {
  const {
    title,
    authors,
    imageLinks,
    description,
    onShowMoreClick,
    onFavouritesClick,
    isFavourite
  } = props;
  return (
    <>
      <ListItem alignItems="flex-start">
        {imageLinks?.thumbnail ? (
          <ListItemAvatar>
            <Avatar alt={`${title} thumbnail`} src={imageLinks.thumbnail} />
          </ListItemAvatar>
        ) : (
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
        )}
        <ListItemText
          primary={title}
          secondary={
            <>
              {authors && (
                <Typography
                  sx={{display: "block"}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {authors.join(", ")}
                </Typography>
              )}
              <p className={styles.description}>{description}</p>
            </>
          }
        />
      </ListItem>
      <Box component="li" sx={{display: "flex", justifyContent: "center"}}>
        <Button onClick={onShowMoreClick} size="small">
          Show More
        </Button>
        <IconButton aria-label="add to favorites" onClick={onFavouritesClick}>
          {isFavourite ? <Favorite /> : <NotFavourite />}
        </IconButton>
      </Box>
      <Divider component="li" />
    </>
  );
};

export default BookListItem;
