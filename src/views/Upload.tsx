import { useState } from 'react';
import { useForm } from '../hooks/formHooks';
import { useFile, useMedia } from '../hooks/graphQLHooks';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return;
      }
      const fileResult = await postFile(file, token);
      const mediaResult = await postMedia(fileResult, inputs, token);
      alert(mediaResult.message);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(doUpload, initValues);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="title">
            Title
          </label>
          <input
            className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="description">
            Description
          </label>
          <textarea
            className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="file">
            File
          </label>
          <input
            className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-50"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-center">
          <img
            className="p-6 w-2/6"
            style={{ maxWidth: '200px', height: 'auto' }}
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://via.placeholder.com/200?text=Choose+image'
            }
            alt="preview"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="p-6 rounded-md bg-slate-50 disabled:text-slate-600"
            type="submit"
            disabled={file && inputs.title.length >= 3 ? false : true}
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default Upload;
