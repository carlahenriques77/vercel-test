// pages/AccessibleRadioPage.js

import { useState } from "react";

const AccessibleRadioPage = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h1>Accessible Radio Buttons</h1>
      <form>
        <fieldset>
          <legend>Choose an option:</legend>

          <div>
            <label htmlFor="option1">
              <input
                type="radio"
                id="option1"
                name="options"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleRadioChange}
              />
              Option 1
            </label>
          </div>

          <div>
            <label htmlFor="option2">
              <input
                type="radio"
                id="option2"
                name="options"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleRadioChange}
              />
              Option 2
            </label>
          </div>

          <div>
            <label htmlFor="option3">
              <input
                type="radio"
                id="option3"
                name="options"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={handleRadioChange}
              />
              Option 3
            </label>
          </div>
        </fieldset>
      </form>

      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default AccessibleRadioPage;
