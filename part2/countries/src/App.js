import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Display from "./components/Display";

const App = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  //Controlled filter input component
  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  // Filter the countries state and return a filtered array
  const filterByName = (filter) => {
    let re = new RegExp(filter, "gi");
    return countries.filter((country) => re.test(country.name.common));
  };

  //Display contacts based on filter
  const displayCountries = () => {
    if (nameFilter !== "") {
      let displayed = filterByName(nameFilter);
      if (displayed.length > 0) {
        if (displayed.length <= 10) {
          return <Display toDisplay={displayed} />;
        } else {
          return <p>Too many matches, specify another filter</p>;
        }
      } else {
        return <p>No match found</p>;
      }
    }
  };

  return (
    <div>
      <Filter
        label="Find Countries"
        inputValue={nameFilter}
        onChange={handleFilterChange}
      />
      {displayCountries()}
    </div>
  );
};

export default App;
