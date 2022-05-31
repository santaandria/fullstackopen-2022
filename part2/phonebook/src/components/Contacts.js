import React from "react";

const Contact = ({ person }) => (
  <li>
    {person.name} {person.number}
  </li>
);

const Contacts = ({ persons }) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <Contact person={person} key={index + 1} />
      ))}
    </ul>
  );
};

export default Contacts;
