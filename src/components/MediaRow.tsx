import { Link } from 'react-router-dom';
import { MediaItemWithOwner } from '../types/DBTypes';
import { useUpdateContext, useUserContext } from '../hooks/ContextHooks';
import { useMedia } from '../hooks/graphQLHooks';
import Likes from './Likes';

const MediaRow = (props: { item: MediaItemWithOwner }) => {
  const { item } = props;
  const { user } = useUserContext();
  const { deleteMedia } = useMedia();
  const { update, setUpdate } = useUpdateContext();

  const deleteHandler = async () => {
    const cnf = confirm('Are you sure you want to delete this media?');
    if (!cnf) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const result = await deleteMedia(item.media_id, token);
      alert(result.message);
      setUpdate(!update);
    } catch (e) {
      console.error('delete failed', (e as Error).message);
    }
  };

  return (
    <tr className="*:p-4 bg-stone-400">
      <td className="flex flex-col items-center justify-center relative">
        <div className="text-xl mb-4">{item.title ? item.title : "No title"}</div>
        {user && (user.user_id === item.user_id || user.level_name === 'Admin') && (
          <button
            onClick={deleteHandler}
            className="absolute top-0 right-0 text-lg text-red-500"
            style={{ marginRight: '1rem', marginTop: '0.5rem' }}
          >
            X
          </button>
        )}
        <Link to="/single" state={item}>
          <img
            className="h-60 w-72 object-cover cursor-pointer"
            src={item.thumbnail}
            alt={item.title ? item.title : "No title"}
          />
        </Link>
      </td>

      <td className="">
        <div className="flex flex-col">
          <p className="mb-4" style={{ fontFamily: "'Freight Sans', sans-serif" }}>
            {item.description
              ? item.description.length > 34
                ? `${item.description.substring(0, 34)}...`
                : item.description
              : "No description"}
          </p>
          <div className="mt-auto">
            <p><Likes item={item} /></p>
            <p>{item.owner.username}</p>
            <p>Comments: {item.comments_count}</p>
            <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default MediaRow;
