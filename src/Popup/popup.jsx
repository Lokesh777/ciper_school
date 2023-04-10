import React, { useState } from "react";

const PopUp = ({ message }) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const handlePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  return (
    <div>
      <button onClick={handlePopUp}>Show Pop-up</button>
      {showPopUp && (
        <div className="pop-up">
          <h1>Login Page</h1>
          <button onClick={handlePopUp}>Close Pop-up</button>
        </div>
      )}
    </div>
  );
};

export default PopUp;
