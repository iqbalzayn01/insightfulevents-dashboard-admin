import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <ul className="p-4">
        <li className="mb-4">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/data-user">Data User</Link>
        </li>
        <li className="mb-4">
          <Link to="/data-pembicara">Data Pembicara</Link>
        </li>
        <li className="mb-4">
          <Link to="/data-kegiatan">Data Kegiatan</Link>
        </li>
        <li className="mb-4">
          <Link to="/data-pendaftaran">Data Pendaftaran</Link>
        </li>
        <li className="mb-4">
          <Link to="/data-pembayaran">Data Pembayaran</Link>
        </li>
      </ul>
    </div>
  );
}
