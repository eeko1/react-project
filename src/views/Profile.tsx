import { useUserContext } from '../hooks/ContextHooks';

const Profile = () => {
  const { user } = useUserContext();

  return (
    <div className="max-w-lg mx-auto p-5 shadow-lg rounded-lg bg-white">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Profile Page</h2>
      {user && (
        <div>
          <p className="text-md text-gray-700">
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p className="text-md text-gray-700">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-md text-gray-700">
            <span className="font-semibold">Created:</span> {new Date(user.created_at).toLocaleString('fi-FI')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
