import { memo, useState } from 'react';
import { PlusIcon, Trash2Icon, PencilIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Outlet, useNavigate } from 'react-router-dom';

type Direction = {
  id: number;
  name: string;
  createdAt: string;
};

const Yonalishlar = () => {
  const [directions, setDirections] = useState<Direction[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [, setInputValue] = useState('');
  const [, setEditingId] = useState<number | null>(null);

  const navigate = useNavigate();

  const filteredDirections = directions.filter(dir =>
    dir.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setDirections(prev => prev.filter(dir => dir.id !== id));
    toast.success('Ochirildi');
  };

  const handleEdit = (item: Direction) => {
    setInputValue(item.name);
    setEditingId(item.id);
    toast('Edit logikasi hozir nested emas – keyinchalik qo‘shamiz');
  };

  return (
    <div className="space-y-6 relative">
      <Toaster />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Yonalishlar{}
          <span className="text-sm text-gray-500">({directions.length} ta)</span>
        </h2>
        <button
          onClick={() => navigate('create')}
          className="flex items-center gap-1 bg-[#b38754] text-white px-4 py-2 rounded-md hover:bg-[#9c723f] transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          Qoshish
        </button>
      </div>

      <input
        type="text"
        placeholder="Qidirish"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className="w-full max-w-xs px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b38754]"
      />

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Nomi</th>
              <th className="px-4 py-3 font-medium">Yaratilgan vaqti</th>
              <th className="px-4 py-3 font-medium">Ammalar</th>
            </tr>
          </thead>
          <tbody>
            {filteredDirections.length > 0 ? (
              filteredDirections.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.createdAt}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m2 9H7a2 2 0 01-2-2V5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v12a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p>Malumot topilmadi</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
};

export default memo(Yonalishlar);
