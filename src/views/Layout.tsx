import { Link, Outlet } from 'react-router-dom';
import { useUserContext } from '../hooks/ContextHooks';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header className="max-w-7xl mx-auto">
        <nav>
          <ul className="flex justify-center items-center h-16">
            <li>
              <Link
                className="block p-4 text-center hover:bg-slate-700 text-charcoal" // Applied Charcoal color here
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block p-4 text-center hover:bg-slate-700 text-charcoal" // Applied Charcoal color here
                    to="/profile"
                  >
                    Saved
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center hover:bg-slate-700 text-charcoal" // Applied Charcoal color here
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center hover:bg-slate-700 text-charcoal" // Applied Charcoal color here
                    to="/logout"
                  >
                    {user.username}
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block p-4 text-center hover:bg-slate-700 text-charcoal" // Applied Charcoal color here
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="p-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <footer className="flex justify-center p-4 max-w-7xl mx-auto">
        <p>Copyright © 2024 - E.K</p>
      </footer>
    </>
  );
};

export default Layout;
