import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

import { ContactForm } from '../components/Form/Form.jsx';
import { Filter } from '../components/Filter/Filter.jsx';
import { ContactList } from '../components/ContactList/ContactList.jsx';
import style from './Form/Form.module.css';

const useLocalStorage = (contacts, defaultValue) => {
  const [localstate, setLocalState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(contacts)) ?? defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(contacts, JSON.stringify(localstate));
  }, [contacts, localstate]);

  return [localstate, setLocalState];
};

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('defaultValue', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    const findContact = contacts.find(contact => {
      return contact.name === name;
    });
    if (findContact) {
      return alert(`${name} is already in contacts.`);
    }
    setContacts(prevState => [...prevState, { name, id: nanoid(), number }]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  function getFilteredContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div className={style.form}>
      <div className={style.form_name_number_filter}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler}></ContactForm>
        <Filter value={filter} onChange={changeFilter} />
        <h2>Contacs</h2>
      </div>
      <ContactList contacts={getFilteredContacts()} onDelete={deleteContact} />
    </div>
  );
};
