import "../styles/componentstyles/ImageItem.css";
import "../styles/componentstyles/ListItem.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ListItem = (props) => {
  return (
    <div className="item-container">
      <Card variant="outlined" sx={{ maxWidth: 200, minHeight: 400 }}>
        <CardMedia
          component="img"
          height="200"
          image={props.songImage}
          alt="song"
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="div">
            {props.songName}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListItem;
