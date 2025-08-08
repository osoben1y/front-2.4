import { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const UpdateDirection = () => {
  const [inputValue, setInputValue] = useState('');
  const [directionId, setDirectionId] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = parseInt(params.get('id') || '');

    const stored = JSON.parse(localStorage.getItem('directions') || '[]');
    const found = stored.find((dir: any) => dir.id === id);

    if (found) {
      setInputValue(found.name);
      setDirectionId(found.id);
    } else {
      toast.error("Yo'nalish topilmadi");
      navigate(-1);
    }
  }, [location, navigate]);

  const handleUpdate = () => {
    if (!inputValue.trim()) return toast.error("Iltimos, yo'nalish nomini kiriting");

    const existing = JSON.parse(localStorage.getItem('directions') || '[]');
    const updated = existing.map((dir: any) =>
      dir.id === directionId ? { ...dir, name: inputValue } : dir
    );

    localStorage.setItem('directions', JSON.stringify(updated));
    toast.success("Yo'nalish yangilandi");
    navigate('/yonalishlar');
  };

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-lg animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800">Yo‘nalishni tahrirlash</h3>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Yo‘nalish nomi"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b38754]"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-[#b38754] text-white rounded-md hover:bg-[#9c723f]"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(UpdateDirection);
