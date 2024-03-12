import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header>
  <nav>
    <ul className="flex justify-center items-center bg-slate-950 h-16"> {/* Adjusted for horizontal centering and added height */}
      <li>
        <Link
          className="block p-4 text-center text-slate-50 hover:bg-slate-700"
          to="/"
        >
          Home
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <Link
              className="block p-4 text-center text-slate-50 hover:bg-slate-700"
              to="/profile"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="block p-4 text-center text-slate-50 hover:bg-slate-700"
              to="/upload"
            >
              Upload
            </Link>
          </li>
          <li>
            <Link
              className="block p-4 text-center text-slate-50 hover:bg-slate-700"
              to="/logout"
            >
              Logout
            </Link>
          </li>
        </>
      ) : (
        <li>
          <Link
            className="block p-4 text-center text-slate-50 hover:bg-slate-700"
            to="/login"
          >
            Login
          </Link>
        </li>
      )}
    </ul>
  </nav>
</header>
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="flex justify-center bg-slate-950 p-4">
        <p>Copyright 2024 - E.K</p>
      </footer>
    </>
  );
};

export default Layout;
