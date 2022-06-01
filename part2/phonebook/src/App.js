import { useState, useEffect } from "react";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import Form from "./components/Form";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  /*
  TODO Add number format checker
  TODO Check if number + name already exist
  TODO Dont accept contact without number
  */
  //  Update person if existing
  const updatePerson = () => {
    if (
      window.confirm(
        `${newContact.name} is already added to the phonebook. Replace the old number with the new one?`
      )
    ) {
      const updated = {
        ...persons.find((p) => p.name === newContact.name),
        number: newContact.number,
      };
      personService.update(updated.id, updated).then(() => {
        console.log(`${updated.name} updated successfully`);
        setPersons(persons.map((p) => (p.id === updated.id ? updated : p)));
        setNewContact({ name: "", number: "" });
      });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((item) => item.name).includes(newContact.name)) {
      updatePerson();
    } else {
      const newPersonObject = {
        name: newContact.name,
        number: newContact.number,
      };
      personService.create(newPersonObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewContact({ name: "", number: "" });
      });
    }
  };

  // Controlled form component
  const handleChange = (event) => {
    const value = event.target.value;
    setNewContact({
      ...newContact,
      [event.target.name]: value, // Dynamic key
    });
  };

  // Filter the contact state and return a filtered array
  const filterByName = (filter) => {
    let re = new RegExp(filter, "gi");
    return persons.filter((person) => re.test(person.name));
  };

  //Display contacts based on filter
  const displayPerson = () => {
    let displayed = persons;
    if (nameFilter !== "") {
      displayed = filterByName(nameFilter);
    }
    return displayed;
  };

  //Controlled filter input component
  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const deletePerson = (id) => {
    const toDelete = persons.find((p) => p.id === id);
    if (window.confirm(`Do you really want to delete ${toDelete.name}`)) {
      personService.remove(id).then(() => {
        console.log(`${toDelete.name} deleted successfully`);
        setPersons(() => persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        label="Filter by Name"
        inputValue={nameFilter}
        onChange={handleFilterChange}
      />
      <h2>Add New Contact</h2>
      <Form
        fieldObject={newContact}
        onSubmit={addPerson}
        onChange={handleChange}
      />
      <h2>Numbers</h2>
      <Contacts
        persons={displayPerson()}
        deleteFunc={(id) => deletePerson(id)}
      />
    </div>
  );
};

export default App;
