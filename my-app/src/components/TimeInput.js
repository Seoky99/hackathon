import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/componentstyles/TimeInput.css";
import "../styles/componentstyles/Animation.css"

// The input of shower length is stored as "time."
function Search() {
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const navigateToList = (event) => {
    event.preventDefault();
    localStorage.setItem("goal", time);
    navigate("/temppage");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("goal", time);
    alert(`Placeholder: time value entered was: ${time}`);
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit}>
        <label className="input-title fade-in">Showering Time:</label>
        <div className="form-container">
          <input
            placeholder="Input desired time (min)"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input"
          />
          <input
            type="submit"
            value="Go!"
            className="submit-button"
            onClick={navigateToList}
          />
        </div>
      </form>
    </div>
  );
}
export default Search;
