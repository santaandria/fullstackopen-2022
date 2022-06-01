import React from "react";

const List = ({ toMap, type }) => {
  if (type === "array") {
    return (
      <ul>
        {toMap.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  } else if (type === "object") {
    // If it is a regular object
    return (
      <ul>
        {Object.keys(toMap).map((keys, index) => (
          <li key={index}>{toMap[keys]}</li>
        ))}
      </ul>
    );
  }
};

const Country = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <table>
        <tbody>
          <tr>
            <th>Flag</th>
            <td>
              <img src={country.flags.png} alt={country.flag} />
            </td>
          </tr>
          <tr>
            <th>Capital</th>
            <td>{country.capital[0]}</td>
          </tr>
          <tr>
            <th>Area</th>
            <td>
              {country.area} km<sup>2</sup>
            </td>
          </tr>
          <tr>
            <th>Languages</th>
            <td>
              <List type="object" toMap={country.languages} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Country;
