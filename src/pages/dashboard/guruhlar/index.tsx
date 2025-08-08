import { memo, useState } from 'react';
import { PlusIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface GroupType {
  id: number;
  name: string;
  startDate: string;
}

const Guruhlar = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDate, setGroupDate] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrEdit = () => {
    if (!groupName || !groupDate) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring");
      return;
    }

    if (editId !== null) {
      setGroups(prev =>
        prev.map(g => (g.id === editId ? { id: editId, name: groupName, startDate: groupDate } : g))
      );
      toast.success('Guruh muvaffaqiyatli tahrirlandi');
    } else {
      const newGroup = {
        id: Date.now(),
        name: groupName,
        startDate: groupDate,
      };
      setGroups(prev => [...prev, newGroup]);
      toast.success('Yangi guruh qo‘shildi');
    }

    setGroupName('');
    setGroupDate('');
    setEditId(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setGroups(prev => prev.filter(g => g.id !== id));
    toast.success('Guruh o‘chirildi');
  };

  const openEditModal = (group: GroupType) => {
    setGroupName(group.name);
    setGroupDate(group.startDate);
    setEditId(group.id);
    setIsModalOpen(true);
  };

  const filteredGroups = groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 relative">
      <Toaster />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Guruhlar <span className="text-sm text-gray-500">({groups.length} ta guruh)</span>
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 bg-[#b38754] text-white px-4 py-2 rounded-md hover:bg-[#9c723f] transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          Qo‘shish
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Qidirish"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b38754]"
        />
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Guruh nomi</th>
              <th className="px-4 py-3 font-medium">Boshlanish sanasi</th>
              <th className="px-4 py-3 font-medium">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.length ? (
              filteredGroups.map((group, index) => (
                <tr key={group.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{group.name}</td>
                  <td className="px-4 py-2">{group.startDate}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => openEditModal(group)}
                      className="text-blue-600 hover:underline"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(group.id)}
                      className="text-red-600 hover:underline"
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
                    <p>Maʼlumot topilmadi</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {editId !== null ? 'Guruhni tahrirlash' : "Yangi guruh qo‘shish"}
            </h3>
            <input
              type="text"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              placeholder="Guruh nomi"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b38754]"
            />
            <input
              type="date"
              value={groupDate}
              onChange={e => setGroupDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b38754]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditId(null);
                  setGroupName('');
                  setGroupDate('');
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddOrEdit}
                className="px-4 py-2 bg-[#b38754] text-white rounded-md hover:bg-[#9c723f]"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Guruhlar);
