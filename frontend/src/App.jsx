import { useState, useEffect } from 'react'
import { getItems, addItem, updateItem, deleteItem } from "./api"

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

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

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await updateItem(id, { name: newName });
      fetchItems();
    }
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
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
            <button type="button" onClick={() => handleUpdate(item._id)}>Edit</button>
            <button type="button" onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
