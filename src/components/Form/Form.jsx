import propTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from '../Form/Form.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  contactsId = nanoid();

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target.elements;
    this.props.onSubmit(name.value, number.value);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Name</p>
        <label htmlFor={this.contactsId}>
          <input
            id={this.contactsId}
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <p>Number</p>
        <label htmlFor={this.contactsId}>
          <input
            id={this.contactsId}
            value={this.state.number}
            onChange={this.handleChange}
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
}

ContactForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
};