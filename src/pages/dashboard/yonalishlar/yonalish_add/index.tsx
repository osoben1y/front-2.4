import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CreateDirection = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!inputValue.trim()) return toast.error("Iltimos, yo'nalish nomini kiriting");
    toast.success("Yonalish qo‘shildi");
    navigate(-1);
  };

  return (
    <>
      <Toaster />
      <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-lg animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800">Yo'nalish qo‘shish</h3>
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
              onClick={handleSubmit}
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

export default CreateDirection;
