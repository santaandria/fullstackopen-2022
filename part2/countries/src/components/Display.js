import React from "react";
import Country from "./Country";
import { useState } from "react";
import Weather from "./Weather";

const DisplayItem = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      {country.name.common}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>Show</button>
      {showDetails ? <Country country={country} /> : <></>}
    </li>
  );
};

const Display = ({ toDisplay }) => {
  if (toDisplay.length === 1) {
    const country = toDisplay[0];
    return (
      <>
        <Country country={country} />
        <Weather country={country} />
      </>
    );
  } else {
    return (
      <ul>
        {toDisplay.map((country) => (
          <DisplayItem country={country} key={country.cca2} />
        ))}
      </ul>
    );
  }
};

export default Display;
