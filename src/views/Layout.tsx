import { Link, Outlet } from 'react-router-dom';
import { useUserContext } from '../hooks/ContextHooks';
import { useState } from 'react';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();
  const [isHovering, setIsHovering] = useState(false);

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
                className="block p-4 text-center hover:text-black text-charcoal"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block p-4 text-center hover:text-black"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center hover:text-black text-charcoal"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center hover:text-black text-charcoal"
                    to="/logout"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {isHovering ? 'Logout' : user.username}
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block p-4 text-center hover:text-black text-charcoal"
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
