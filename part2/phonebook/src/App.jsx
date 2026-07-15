import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/person";

const List = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => onDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPerson) => setPersons(initialPerson));
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:3001/persons")
  //     .then((response) => response.json())
  //     .then((data) => setPersons(data));
  // }, []);
  function handleDelete(id) {
    const personToDelete = persons.find((person) => id === person.id);
    const del = confirm(`Delete ${personToDelete.name} ?`);
    if (del)
      personService.deletePerson(id).then((newPersons) => {
        setPersons(persons.filter((c) => c.id !== id));
      });
  }

  function checkDuplicate() {
    for (const person of persons) {
      if (person.name === newName) {
        return true;
      }
    }
    return false;
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }
  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function addName(event) {
    event.preventDefault();

    if (checkDuplicate()) {
      const newNum = confirm(
        `${newName} is already added to phonebook,replace the old number with a new one?`,
      );
      const obj = persons.find((person) => newName === person.name);
      if (newNum) {
        personService
          .update(obj.id, { ...obj, number: newNumber })
          .then((response) => {
            const updatedPersons = persons.map((c) =>
              c.id === response.id ? { ...c, number: response.number } : c,
            );
            //console.log(updatedPersons);
            setPersons(updatedPersons);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      // setPersons(persons.concat(newPerson));
      // axios
      //   .post("http://localhost:3001/persons", newPerson)
      //   .then((response) => {
      //     setPersons(persons.concat(response.data));
      //   });
      personService
        .create(newPerson)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    }
    setNewName("");
    setNewNumber("");
  }

  const personToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <List persons={personToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
