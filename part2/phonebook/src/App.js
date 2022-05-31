import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [nameFilter, setNameFilter] = useState("");

  /*
  TODO Add number format checker
  TODO Check if number + name already exist
  */
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((item) => item.name).includes(newContact.name)) {
      alert(`${newContact.name} is already added to the phonebook`);
    } else {
      setPersons(() =>
        persons.concat({ name: newContact.name, number: newContact.number })
      );
      setNewContact({ name: "", number: "" });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setNewContact({
      ...newContact,
      [event.target.name]: value, // Dynamic key
    });
  };

  const filterByName = (filter) => {
    let re = new RegExp(filter, "gi");
    return persons.filter((person) => re.test(person.name));
  };
  const displayPerson = () => {
    let displayed = persons;
    if (nameFilter !== "") {
      displayed = filterByName(nameFilter);
    }
    return displayed;
  };

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter by name:{" "}
        <input value={nameFilter} onChange={handleFilterChange} />
      </div>
      <h2>Add New Contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input value={newContact.name} name="name" onChange={handleChange} />
        </div>
        <div>
          number:{" "}
          <input
            value={newContact.number}
            name="number"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {displayPerson().map((person, index) => (
          <li key={index + 1}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
