import { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  number: string;
  id?: string;
}

const PhoneBook = () => {
  const [list, setList] = useState<User[]>([]);
  const [formPhone, setFormPhone] = useState<User>({
    firstName: '',
    lastName: '',
    number: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormPhone((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveUser = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formPhone.firstName !== '' || formPhone.lastName !== '' || formPhone.number !== '') {
      const newContact = { ...formPhone };
      const updatedList = [...list, newContact];
      setList(updatedList);
      localStorage.setItem('myContacts', JSON.stringify(updatedList));
      setFormPhone({ firstName: '', lastName: '', number: '' });
    }
  };

  const handleDelete = (id: string) => {
    const filterdList = list.filter((item) => item.id !== id);
    localStorage.removeItem('myContacts');
    const copy = [...filterdList];
    setList(copy);
  };
  return (
    <form onSubmit={handleSaveUser}>
      <div>
        <label htmlFor="firstName">Name</label>
        <input name="firstName" value={formPhone.firstName} onChange={handleChange} type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <input value={formPhone.lastName} name="lastName" onChange={handleChange} type="text" />
      </div>
      <div>
        <label htmlFor="number">Number</label>
        <input value={formPhone.number} name="number" onChange={handleChange} type="number" />
      </div>
      <button
        type="submit"
        style={{
          border: '2px solid gray',
          background: 'green',
          color: 'white',
          borderRadius: '12px',
        }}
      >
        Save
      </button>

      <ul style={{ listStyle: 'none' }}>
        {list.map((contact) => (
          <li onClick={() => handleDelete(contact.id!)} key={contact.id}>
            {contact.firstName} {contact.lastName} — {contact.number} _ {'X'}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default PhoneBook;
