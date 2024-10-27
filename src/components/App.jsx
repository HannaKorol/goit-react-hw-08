import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import ContactList from "./ContactList/ContactList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contactsOps";
import { selectError, selectLoading } from "../redux/contactsSlice";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/HomePage";
import ContactsPage from "../pages/ContactsPage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";


export default function App() {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]); /* функція була викликана користувачем - фетчимо данні і робимо диспатчь в contactsOps */
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* Якщо батьківський маршрут співпав з маршутом нащядка то пишемо index (lec.1 59:06) */}
          <Route path="contacts" element={<ContactsPage />} /> {/* Вкладені маршути не містять '/' */}
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
/*     <div>
      <h1 style={{ padding: "20px" }}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <h2>Loading...</h2>}
      {error && <h2>Error...</h2>}
      <ContactList />
    </div> */
  );
}
