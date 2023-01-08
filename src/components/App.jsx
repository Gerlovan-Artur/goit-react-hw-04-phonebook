import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from '../components/Form/Form.jsx';
import { Filter } from '../components/Filter/Filter.jsx';
import { ContactList } from '../components/ContactList/ContactList.jsx';
import style from './Form/Form.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts),
       });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = (name, number) => {
    const findContact = this.state.contacts.find(contact => {
      return contact.name === name;
    });
    if (findContact) {
      return alert(`${name} is already in contacts.`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name, id: nanoid(), number }],
    }));
  };

  changeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={style.form}>
        <div className={style.form_name_number_filter}>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHandler}></ContactForm>
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <h2>Contacs</h2>
        </div>
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
