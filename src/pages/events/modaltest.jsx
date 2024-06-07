import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCreateEvent, fetchUpdateEvent } from '../../redux/events/actions';

export default function AddEventModal({ onClose, isEdit, eventData, talents }) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    talentID: '',
    linkMeeting: '',
    location: '',
    schedules: [{ start_time: '', end_time: '' }],
    event_status: 'online',
    price: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && eventData) {
      setFormData({
        ...eventData,
        price: eventData.price.toString(),
      });
    }
  }, [isEdit, eventData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScheduleChange = (index, e) => {
    const newSchedules = formData.schedules.map((schedule, i) =>
      i === index ? { ...schedule, [e.target.name]: e.target.value } : schedule
    );
    setFormData({ ...formData, schedules: newSchedules });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name &&
      !formData.description &&
      !formData.event_status &&
      !formData.talentID
    ) {
      setError('Data harus diisi');
      return;
    }

    const formattedData = {
      ...formData,
      price: parseInt(formData.price, 10),
    };

    if (isEdit) {
      dispatch(fetchUpdateEvent(eventData._id, formattedData));
    } else {
      dispatch(fetchCreateEvent(formattedData));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl mb-4">
          {isEdit ? 'Edit Event' : 'Tambah Event Baru'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Talent</label>
            <select
              name="talentID"
              value={formData.talentID}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>
                Select a talent
              </option>
              {talents.map((talent) => (
                <option key={talent._id} value={talent._id}>
                  {talent.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Link Meeting</label>
            <input
              type="text"
              name="linkMeeting"
              value={formData.linkMeeting}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Schedules</label>
            {formData.schedules.map((schedule, index) => (
              <div key={index} className="mb-2">
                <input
                  type="datetime-local"
                  name="start_time"
                  value={schedule.start_time}
                  onChange={(e) => handleScheduleChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  type="datetime-local"
                  name="end_time"
                  value={schedule.end_time}
                  onChange={(e) => handleScheduleChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Event Status</label>
            <select
              name="event_status"
              value={formData.event_status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddEventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  eventData: PropTypes.object,
  talents: PropTypes.array.isRequired,
};
