import { useState, useEffect } from 'react'
import { getItems, addItem, updateItem, deleteItem } from "./api"
import Modal from "./components/Modal";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [currentItemId, setCurrentItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  const handleAdd = async () => {
    if (name) {
      await addItem({ name });
      setName("");
      fetchItems();
    }
  };

  const handleUpdate = async (id, newName) => {
    if (newName) {
      await updateItem(id, { name: newName });
      fetchItems();
    }
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  const openModal = (id) => {
    setCurrentItemId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItemId(null);
  };

  const handleModalSubmit = (newName) => {
    if (currentItemId) {
      handleUpdate(currentItemId, newName);
    }
    closeModal();
  };

  return (
    <>
      <h1>CRUD App</h1>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>Add</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}
            <button type="button" onClick={() => openModal(item._id)}>Edit</button>
            <button type="button" onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal onSubmit={handleModalSubmit} onClose={closeModal} />
      )}
    </>
  )
}

export default App
