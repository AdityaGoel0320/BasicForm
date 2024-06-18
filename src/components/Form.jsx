import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

export const Form = () => {


    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
        age: '',
        gender: '',
        location: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };
    
      const validateForm = () => {
        const { name, number, email, age, gender, location } = formData;
    
        if (!name || !number || !email || !age || !gender || !location) {
          toast.error('Please fill out all fields.');
          return false;
        }
    
        if (name.length < 3) {
          toast.error('Name must be at least 3 characters long.');
          return false;
        }
    
        if (!/^\d{10}$/.test(number)) {
          toast.error('Number must be exactly 10 digits.');
          return false;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          toast.error('Please enter a valid email address.');
          return false;
        }
    
        if (age < 0) {
          toast.error('Age must be a non-negative number.');
          return false;
        }
    
        return true;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          toast.success('Form submitted successfully , you can check the local storage !');
          localStorage.setItem('formData', JSON.stringify(formData));
        }
      };

  return (
    <>
     <div className=" flex items-center justify-center bg-gray-100  h-[100vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center uppercase">Form</h2>
        <form onSubmit={handleSubmit} className=''>
          {['name', 'number', 'email', 'age', 'location'].map((field) => (
            <div key={field} className="mb-4 flex justify-between items-center gap-4 ">
              <label htmlFor={field} className="block text-xl text-bold text-gray-700 mb-2 capitalize">
                {field}
              </label>
              <input
                type={field === 'number' || field === 'age' ? 'number' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-72 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black border-2 border-black"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block  text-xl text-bold text-gray-700 mb-2 capitalize mb-4 ">Gender</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Prefer not to say"
                  checked={formData.gender === 'Prefer not to say'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Prefer not to say
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
    </>
  )
}
