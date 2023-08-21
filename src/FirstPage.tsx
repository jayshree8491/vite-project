import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = () => {
    if (userDetails.name && userDetails.phoneNumber && userDetails.email) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      navigate('/SecondPage');
    } else {
      alert('Please provide all necessary details');
    }
  };

  return (
    <div>
      <h1>First Page</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={userDetails.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={userDetails.phoneNumber}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={userDetails.email}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit and Go to Second Page</button>
    </div>
  );
};

export default FirstPage;
