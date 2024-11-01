import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const Header = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Phonebook</div>
      {isLoggedIn && <div className={s.welcomeText}>Welcome, {user.name}</div>}
      <div className={s.wrapperLinks}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/contacts">
          Contacts
        </NavLink>
        {!isLoggedIn && (
          <>
            <NavLink className={buildLinkClass} to="/login">
              Login
            </NavLink>
            <NavLink className={buildLinkClass} to="/register">
              Register
            </NavLink>
          </>
        )}
        {isLoggedIn && (
          <button
            onClick={() => dispatch(logout())}
            className="btn btn-active btn-primary"
          >
            Exit
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
