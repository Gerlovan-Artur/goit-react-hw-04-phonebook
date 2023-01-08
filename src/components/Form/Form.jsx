import propTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import style from '../Form/Form.module.css';


export function ContactForm({onSubmit}) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const contactsId = nanoid();

  function handleChange(event) {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return
    }
  };

 const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target.elements;
    onSubmit(name.value, number.value);
    setName('');
    setNumber('');
  };



  return (
    <form onSubmit={handleSubmit}>
      <p>Name</p>
      <label htmlFor={contactsId}>
        <input
          id={contactsId}
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <p>Number</p>
      <label htmlFor={contactsId}>
        <input
          id={contactsId}
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={style.form_btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
};