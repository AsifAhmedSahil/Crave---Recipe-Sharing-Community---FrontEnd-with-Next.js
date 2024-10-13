/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any; // Replace with your item type
  onUpdate: (updatedItem: any) => void; // Replace with your item type
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, item, onUpdate }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [type, setType] = useState(item.type);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setImage(item.image);
      setType(item.type);
    }
  }, [item]);

  const handleUpdate = () => {
    const updatedItem = { ...item, title, description, image, type };
    onUpdate(updatedItem);
    onClose(); // Close the modal after updating
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"> {/* Fixed width */}
        <h2 className="text-xl font-semibold mb-4 text-black">Update Recipe</h2>

        <label className="block mb-2 text-black">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 mb-4 w-full"
        />

        <label className="block mb-2 text-black">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mb-4 w-full"
        />

        <label className="block mb-2 bgbl text-black">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="border p-2 mb-4 w-full"
        />

        <label className="block mb-2 text-black">Type</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Type"
          className="border p-2 mb-4 w-full"
        />

        <div className="flex justify-end">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
            Update
          </button>
          <button onClick={onClose} className="ml-2 border px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
