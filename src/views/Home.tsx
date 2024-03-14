// Home.tsx
import MediaRow from '../components/MediaRow';
import { useMedia } from '../hooks/graphQLHooks';


const Home = () => {
  const { mediaArray } = useMedia();

  return (
    <div className= "flex justify-center">
    <div className="flex flex-wrap justify-center gap-4">
      {mediaArray.map((item) => (
        <MediaRow key={item.media_id} item={item} />
      ))}
    </div>
    </div>
  );
};

export default Home;
