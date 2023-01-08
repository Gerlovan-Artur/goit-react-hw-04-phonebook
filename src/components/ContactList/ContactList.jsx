import propTypes from 'prop-types';
import { ContactItem } from './ContactItem';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <li key={contact.id}>
            <ContactItem contact={contact} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.exact({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
  onDelete: propTypes.func.isRequired,
};