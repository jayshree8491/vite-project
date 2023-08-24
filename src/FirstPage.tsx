import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FirstPage.css';
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
      <div className="first-page-container">
        <h1>My Data App</h1>
        <h2>Please enter your details</h2>
        <div className="form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            value={userDetails.name}
            onChange={handleInputChange}
          />
          <br/>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter your Phone Number"
            value={userDetails.phoneNumber}
            onChange={handleInputChange}
          />
          <br/>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
          <br/>
          <button className="submit-button" onClick={handleSubmit}>
            Submit and Go to Second Page
          </button>
        </div>
      </div>
    );
};

export default FirstPage;
