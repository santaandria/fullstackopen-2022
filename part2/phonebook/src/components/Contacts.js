import React from "react";

const Contact = ({ person, deleteFunc }) => (
  <li>
    {person.name} {person.number} <button onClick={deleteFunc}>Delete</button>
  </li>
);

const Contacts = ({ persons, deleteFunc }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Contact
          person={person}
          key={person.id}
          deleteFunc={() => deleteFunc(person.id)}
        />
      ))}
    </ul>
  );
};

export default Contacts;
