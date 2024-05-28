import { useSelector, useDispatch } from 'react-redux';
import {
  useEffect,
  // useState
} from 'react';
import { format } from 'date-fns';

import { fetchAllEvents } from '../../redux/events/actions';

import Sidebar from '../../components/sidebar';
// import PopUp from '../../components/popUp';
// import AddTalentModal from './addTalentModal';

export default function DataKegiatan() {
  const { events, error } = useSelector((state) => state.events);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  //   const [isEdit, setIsEdit] = useState(false);
  //   const [selectedTalent, setSelectedTalent] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'dd MMM yyyy, HH:mm');
  };

  const formatPrice = (price) => {
    return price.toLocaleString('id-ID');
  };

  //   const handleCreateTalent = () => {
  //     setIsEdit(false);
  //     setSelectedTalent(null);
  //     setIsModalOpen(true);
  //   };

  //   const handleEdit = (talentData) => {
  //     setIsEdit(true);
  //     setSelectedTalent(talentData);
  //     setIsModalOpen(true);
  //   };

  //   const handlePopUpDelete = () => {
  //     setIsPopUpOpen(true);
  //   };

  //   const handleDelete = (id) => {
  //     dispatch(fetchDeleteTalent(id));
  //     setIsPopUpOpen(false);
  //   };

  return (
    <div className="w-full">
      <Sidebar />
      <main className="ml-64 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl">Data Kegiatan</h1>
          <button
            // onClick={handleCreateTalent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tambah
          </button>
        </div>
        <hr className="mb-10" />
        {error && <p className="text-red-500">Error fetching data: {error}</p>}
        <div className="grid grid-cols-2 gap-10">
          {events &&
            events.map((event) => (
              <div
                key={event._id}
                className="card border border-slate-400 p-10 rounded-lg"
              >
                <div className="flex flex-col gap-5">
                  <h2 className="text-2xl font-medium">{event.name}</h2>
                  <p>{event.description}</p>
                  <p>{event.talentID}</p>
                  <p>{event.linkMeeting}</p>
                  <div className="flex items-start justify-between">
                    <div className="">
                      <p className="font-semibold">Lokasi:</p>
                      <p>{event.location}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Jadwal:</p>
                      {Array.isArray(event.schedules) &&
                        event.schedules.map((schedule) => (
                          <div key={schedule._id} className="mt-1">
                            <p>Start: {formatDateTime(schedule.start_time)}</p>
                            <p>End: {formatDateTime(schedule.end_time)}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>{event.event_status}</p>
                    <p className="font-semibold">
                      Rp.{formatPrice(event.price)}
                    </p>
                  </div>
                  <hr className="bg-slate-400" />
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      //   onClick={() => handleEdit(talent)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      //   onClick={handlePopUpDelete}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
      {/* {isModalOpen && (
        <AddTalentModal
          onClose={() => setIsModalOpen(false)}
          isEdit={isEdit}
          talentData={selectedTalent}
        />
      )} */}
    </div>
  );
}
