import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contacts/operations";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/HomePage";
import ContactsPage from "../pages/ContactsPage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import { refresh } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { selectError, selectLoading } from "../redux/contacts/selectors";

export default function App() {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  //коли людина заходить до нас в додаток, редакс виконує запит на сервер для отримання інформації про користувача.
  // це відбувається автоматично за допомогою useEffect
  const dispatch = useDispatch(); //dispatch- почилає команди до редаксу

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [
    dispatch,
  ]); /* функція була викликана користувачем - фетчимо данні і робимо диспатчь в contactsOps */

  const isRefreshing = useSelector(selectIsRefreshing);

  return isRefreshing ? null : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* Якщо батьківський маршрут співпав з маршутом нащядка то пишемо index (lec.1 59:06) */}
        <Route
          path="contacts"
          element={
            <PrivateRoute
              component={<ContactsPage />}
              redirectTo="/login"
            /> /* якщо ти хочещ бачити контакти, будь ласка залогуйся */
          }
        />
        {/* Вкладені маршути не містять '/' */}
        <Route
          path="register"
          element={
            <RestrictedRoute
              component={<RegistrationPage />}
              redirectTo="/contacts"
            />
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />
          } //якщо ти вже залогований, ти не повинен бачити сторінку логінізації
        />
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
