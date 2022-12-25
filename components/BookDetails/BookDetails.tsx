import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import BookIcon from "@mui/icons-material/Book";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import NotFavourite from "@mui/icons-material/FavoriteBorder";

interface BookInfoProps {
  items: {[key: string]: string | number};
}

const BookInfo = ({items}: BookInfoProps) => {
  return (
    <Box sx={{p: 1}}>
      {Object.entries(items).map(([key, value]) => (
        <Box key={key}>
          <Typography
            sx={{marginRight: "5px"}}
            component="span"
            variant="caption"
            color="text.primary"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </Typography>
          <Typography component="span" variant="body2" color="text.secondary">
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

interface BookListItemProps extends BookFull {
  isFavourite: boolean;
  onFavouritesClick: () => void;
}

const BookDetails = (props: BookListItemProps) => {
  const {
    title,
    authors,
    description,
    imageLinks,
    publisher,
    publishedDate,
    categories,
    averageRating,
    ratingsCount,
    language,
    isFavourite,
    onFavouritesClick
  } = props;
  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 700,
        overflow: "auto",
        position: "relative"
      }}
    >
      <CardHeader
        avatar={
          imageLinks?.thumbnail ? (
            <Avatar alt={`${title} thumbnail`} src={imageLinks.thumbnail} />
          ) : (
            <BookIcon />
          )
        }
        title={title}
        subheader={authors?.join(", ")}
        sx={{maxWidth: 330}}
      ></CardHeader>
      <IconButton
        aria-label="add to favorites"
        onClick={onFavouritesClick}
        sx={{position: "absolute", right: 0, top: 0}}
      >
        {isFavourite ? <Favorite /> : <NotFavourite />}
      </IconButton>
      <CardMedia
        component="img"
        height="194"
        image={imageLinks.large || imageLinks.medium || imageLinks.extraLarge}
        alt={`${title} image`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span dangerouslySetInnerHTML={{__html: description}}></span>
        </Typography>
        <Divider />
        <BookInfo
          items={{
            publisher,
            "published date": publishedDate,
            categories: categories?.join(", "),
            "average rating": averageRating,
            "ratings count": ratingsCount,
            language
          }}
        />
      </CardContent>
    </Card>
  );
};

export default BookDetails;
