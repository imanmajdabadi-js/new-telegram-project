import { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  number: string;
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
    const newContact = { ...formPhone };
    const updatedList = [...list, newContact];
    setList(updatedList);
    localStorage.setItem('myContacts', JSON.stringify(updatedList));
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
      <ul>
        {list.map((contact, index) => (
          <li key={index}>
            {contact.firstName} {contact.lastName} — {contact.number}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default PhoneBook;
