import { Checkbox } from "@mui/material";
import { useState } from "react";
import "../styles/componentstyles/ListItem.css";

const ListItem = (props) => {
  const [checked, setChecked] = useState(false);

  let handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    props.setChange(props.playlistName, newValue);
  };

  return (
    <div className="item-container">
      <h1> {props.playlistImage}</h1>
      <h1> {props.playlistName}</h1>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
};

export default ListItem;

/**/
