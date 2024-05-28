import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchAllTalents } from '../../redux/talents/actions';

import Sidebar from '../../components/sidebar';

export default function DataPembicara() {
  const { talents, error } = useSelector((state) => state.talents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTalents());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-4">
        <h1 className="text-2xl">Data Pembicara</h1>
        {error && <p className="text-red-500">Error fetching data: {error}</p>}
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Nomor Telepon</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {talents &&
                talents
                  .filter((talent) => talent.role === 'pembicara')
                  .map((user, index) => (
                    <tr key={user._id} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.no_telp}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                          //   onClick={() => handleEdit(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          //   onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
