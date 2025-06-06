import { useEffect, useState } from 'react';
import { Menu, X, Upload } from 'lucide-react';
import api from './lib/api';
import { toast, ToastContainer } from 'react-toastify';
import Document from './components/Document';
import { formatFileName } from './lib/helper';

export default function App() {
  const [activeDoc, setActiveDoc] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reload, setReload] = useState(0);
  const [docs, setDocs] = useState([]);
  const [chunks, setChunks] = useState([]);

  const handleUpload = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.md';
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload', formData);
        console.log('Upload successful:', response.data);
        setReload((prev) => prev + 1);
        toast.success('Upload successful!');
      };
    } catch (err) {
      console.error('Upload failed', err);
      toast.error('Upload failed. Please try again.');
    }
  };

  const getFiles = async () => {
    try {
      const response = await api.get('/files');
      setDocs(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const getChunkData = async (doc) => {
    setActiveDoc(doc.file);
    setSidebarOpen(false);
    try {
      const response = await api.get(`/markdown/${doc.id}/chunks`);
      setChunks(response.data.chunks);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    getFiles();
  }, [reload]);

  return (
    <div className='flex h-screen overflow-hidden'>
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`
    fixed z-40 lg:static lg:translate-x-0 
    top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 flex flex-col
    transform transition-transform duration-300
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  `}
      >
        <div className='flex items-center justify-between mb-6 shrink-0'>
          <h1 className='text-2xl font-bold'>Chunk Mate</h1>
          <button className='lg:hidden' onClick={() => setSidebarOpen(false)}>
            <X className='text-white' />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto space-y-2'>
          {docs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => getChunkData(doc)}
              className={`w-full text-left px-3 py-2 rounded-md transition break-words whitespace-normal ${
                activeDoc === doc.file ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
            >
              {formatFileName(doc.file)}
            </button>
          ))}
        </div>

        <div className='mt-4 shrink-0'>
          <button
            className='w-full flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold'
            onClick={handleUpload}
          >
            <Upload size={18} /> Upload
          </button>
        </div>
      </div>

      <div className='flex-1 p-4 lg:p-6 overflow-y-auto w-full'>
        <div className='lg:hidden mb-4'>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className='w-6 h-6 text-gray-700' />
          </button>
        </div>

        <Document chunks={chunks} />
      </div>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </div>
  );
}
