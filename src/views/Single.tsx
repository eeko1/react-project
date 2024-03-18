import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const item: MediaItemWithOwner = state;

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto p-5 shadow-lg rounded-lg bg-stone-400">
      <h3 className="mb-4 text-2xl font-bold">{item.title ? item.title : "No title"}</h3>
      <div className="mx-auto max-w-md">
        {item.media_type.includes('video') ? (
          <video controls src={item.filename} className="w-full" />
        ) : (
          <img src={item.filename} alt={item.title} className="w-full" />
        )}
      </div>
      <p className="mt-4">{item.description ? item.description : "No description" }</p>
      <Likes item={item} />
      <p>{item.owner.username}</p>
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <Comments item={item} />
      <button
        className="mt-4 rounded text-center hover:text-black text-charcoal"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default Single;
