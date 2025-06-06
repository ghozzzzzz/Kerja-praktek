import PropTypes from 'prop-types';
import { useState } from 'react';

export default function PendaftaranUlang({ user, handleSubmit, submitted }) {
  const [members, setMembers] = useState([{ name: '', phone: '', email: '' }]);

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  const addMemberField = () => {
    setMembers([...members, { name: '', phone: '', email: '' }]);
  };

  const removeMemberField = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filteredMembers = members.filter(member => member.name.trim() !== '');
    formData.append('members', JSON.stringify(filteredMembers));
    handleSubmit(e, formData);
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Pendaftaran Ulang</h2>
      {user && (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Masukkan nama lengkap"
              defaultValue={user.koordinator}
              name="nama_lengkap"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Asal Komunitas</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Masukkan asal komunitas"
              defaultValue={user.nama_komunitas}
              name="asal_komunitas"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email Aktif</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Masukkan email aktif"
              defaultValue={user.email_komunitas}
              name="email"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nomor HP</label>
            <input
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Masukkan nomor HP"
              defaultValue={user.telepon}
              name="nomor_hp"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Jumlah Anggota</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Masukkan jumlah anggota"
              name="jumlah_anggota"
              min="1"
              required
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Daftar Anggota</label>
            {members.map((member, index) => (
              <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder={`Nama anggota ${index + 1}`}
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  />
                  {members.length > 1 && (
                    <button
                      type="button"
                      className="p-2 text-red-600 hover:text-red-800"
                      onClick={() => removeMemberField(index)}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={`Nomor HP anggota ${index + 1}`}
                  value={member.phone}
                  onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                />
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={`Email anggota ${index + 1}`}
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={addMemberField}
            >
              + Tambah Anggota
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md transition-all duration-300 font-medium"
          >
            Kirim Pendaftaran
          </button>
          {submitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Pendaftaran berhasil dikirim!</p>
                  <p className="text-sm text-green-700 mt-1">
                    Status: <span className="font-semibold">Menunggu persetujuan</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

PendaftaranUlang.propTypes = {
  user: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
};