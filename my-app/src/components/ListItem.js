import { Checkbox } from "@mui/material";
import { useState } from "react";
import "../styles/componentstyles/ListItem.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ListItem = (props) => {
  const [checked, setChecked] = useState(false);

  let handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    props.setChange(props.id, newValue);
  };

  return (
    <div className="item-container">
      <Card variant="outlined" sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          height="300"
          image={props.playlistImage}
          alt="playlist_image"
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h4" component="div">
            {props.playlistName}
          </Typography>

          <div className="checkbox-container">
            <Checkbox
              size="large"
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListItem;
