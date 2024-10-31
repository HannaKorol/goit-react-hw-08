import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import {
  deleteContactsThunk,
  fetchContacts,
} from "../../redux/contacts/operations";
import { useEffect } from "react";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

export default function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul className={s.list}>
      {filteredContacts.map((contact) => (
        <li className={s.item} key={contact.id}>
          <Contact
            name={contact.name}
            number={contact.number}
            onDelete={() =>
              dispatch(deleteContactsThunk(contact.id))
            } /* Передаємо id контакту для видалення */
          />
        </li>
      ))}
    </ul>
  );
}
