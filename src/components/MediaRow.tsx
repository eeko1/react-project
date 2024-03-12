import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUpdateContext, useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/graphQLHooks';

const MediaRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;
  const {user} = useUserContext();
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();

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
    <tr className="*:p-4 bg-zinc-700">
      <td className="flex flex-col items-center justify-center">
        {/* If item.title exists, display it; otherwise, display "No title" */}
        <h1 className="text-xl mb-4">{item.title ? item.title : "No title"}</h1>
        {/* Wrap the image with Link to make it clickable and navigate to "/single" */}
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
          {user && (user.user_id === item.user_id || user.level_name === 'Admin') && (
            <>
              <button
                className="bg-green-700 p-2 hover:bg-green-600"
                onClick={() => console.log('modify', item)}
              >
                Modify
              </button>
              <button
                className="bg-rose-500 p-2 hover:bg-rose-400"
                onClick={deleteHandler}
              >
                Delete
              </button>
            </>
          )}
        </div>
        <p>Likes: {item.likes_count}</p>
        <p>{item.owner.username}</p>
        <p>Comments: {item.comments_count}</p>
        <p>Posted: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
      </td>
    </tr>
  );
};
export default MediaRow;
