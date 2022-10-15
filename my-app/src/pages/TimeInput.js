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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label className="search-title">
          Showering Time:
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input"
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
export default Search;
