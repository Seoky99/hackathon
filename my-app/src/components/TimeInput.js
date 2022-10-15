import { useState } from "react";
import "../styles/TimeInput.css";

// The input of shower length is stored as "time."
function Search() {
  const [time, setTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Placeholder: time value entered was: ${time}`);
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit}>
        <label className="input-title">Showering Time:</label>
        <div className="form-container">
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input"
          />
          <input type="submit" value="Go!" className="submit-button" />
        </div>
      </form>
    </div>
  );
}
export default Search;
