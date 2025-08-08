import { memo, useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StudentType {
  id: number;
  fullName: string;
  phone: string;
}

const Oquvchilar = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ fullName: '', phone: '' });

  const handleCreate = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error("Ma'lumotlarni to'liq kiriting");
      return;
    }
    const newStudent: StudentType = {
      id: students.length + 1,
      fullName: formData.fullName,
      phone: formData.phone,
    };
    setStudents([newStudent, ...students]);
    setFormData({ fullName: '', phone: '' });
    setShowModal(false);
    toast.success("Yangi o'quvchi qo'shildi");
  };

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="light" />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          O'quvchilar <span className="text-sm text-gray-500">({students.length} ta o'quvchi)</span>
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 bg-[#b38754] text-white px-4 py-2 rounded-md hover:bg-[#9c723f] transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          Qo'shish
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Qidirish"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b38754]"
        />
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">F.I.Sh</th>
              <th className="px-4 py-3 font-medium">Telefon</th>
              <th className="px-4 py-3 font-medium">Batafsil</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="border-t">
                  <td className="px-4 py-2">{student.id}</td>
                  <td className="px-4 py-2">{student.fullName}</td>
                  <td className="px-4 py-2">{student.phone}</td>
                  <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">Ko'rish</td>
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
                    <p>Ma'lumot yo'q</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setShowModal(false)}
            >
              <XIcon className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Yangi o'quvchi qo'shish</h3>
            <input
              type="text"
              placeholder="F.I.Sh"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b38754]"
            />
            <input
              type="text"
              placeholder="Telefon raqam"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b38754]"
            />
            <button
              onClick={handleCreate}
              className="w-full bg-[#b38754] text-white py-2 rounded-md hover:bg-[#9c723f] transition-all"
            >
              Saqlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Oquvchilar);
