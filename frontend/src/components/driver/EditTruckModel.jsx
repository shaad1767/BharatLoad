const EditTruckModal = ({
  show,
  onClose,
  truckData,
  setTruckData,
  onSave,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-[90%] md:w-[550px] p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Edit Truck Details
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Truck Type */}
        <div className="mb-4">

          <label className="block font-semibold mb-2">
            Truck Type
          </label>

          <input
            type="text"
            value={truckData.truckType}
            onChange={(e) =>
              setTruckData({
                ...truckData,
                truckType: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Vehicle Number */}
        <div className="mb-4">

          <label className="block font-semibold mb-2">
            Vehicle Number
          </label>

          <input
            type="text"
            value={truckData.vehicleNumber}
            onChange={(e) =>
              setTruckData({
                ...truckData,
                vehicleNumber: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Brand */}
        <div className="mb-4">

          <label className="block font-semibold mb-2">
            Brand
          </label>

          <input
            type="text"
            value={truckData.brand}
            onChange={(e) =>
              setTruckData({
                ...truckData,
                brand: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Capacity */}
        <div className="mb-4">

          <label className="block font-semibold mb-2">
            Capacity
          </label>

          <input
            type="text"
            value={truckData.capacity}
            onChange={(e) =>
              setTruckData({
                ...truckData,
                capacity: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Model */}
        <div className="mb-6">

          <label className="block font-semibold mb-2">
            Model
          </label>

          <input
            type="text"
            value={truckData.model}
            onChange={(e) =>
              setTruckData({
                ...truckData,
                model: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditTruckModal;