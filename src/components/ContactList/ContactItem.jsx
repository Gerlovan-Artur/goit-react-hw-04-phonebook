import PropTypes from 'prop-types';
import style from '../ContactList/ContactList.module.css';

export const ContactItem = ({ contact: { name, number, id }, onDelete }) => {
  return (
    <>
      <p>
        {' '}
        
        {name} : {number}{' '}
        <button
          className={style.form_btn_del}
          type="button"
          onClick={() => {
            onDelete(id);
          }}
        >
          Delete
        </button>{' '}
      </p>
    </>
  );
};

ContactItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDelete: PropTypes.func.isRequired,
};