"use client"; // Ensures this is a Client Component

import { auth, createUserWithEmailAndPassword, db, collection, addDoc } from '@/database/firebase-config';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

function SignUp() {
  const route = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        userId: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);

      await Swal.fire({
        title: 'Signup Complete',
        text: email,
        icon: 'success',
        confirmButtonText: 'Good'
      });

      route.push("/Signin");
    } catch (error) {
      console.error("Error adding document: ", error);

      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try again'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center flex-col m-10'>
      <h1 className='text-2xl font-bold p-4'>SignUp Page</h1>
      <div className='border-2 border-gray-200 rounded-lg p-14 bg-yellow-200 cursor-pointer'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='mr-6'>Name: </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder='Your name'
              value={name}
              className='p-2 rounded-md outline-none '
              required
            />
          </div>
          
          <div className='mb-4'>
            <label className='mr-8'>Email: </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Your Email'
              value={email}
              className='p-2 rounded-md outline-none'
              required
            />
          </div>
          
          <div className='mb-4'>
            <label>Password: </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Your password'
              value={password}
              className='p-2 rounded-md outline-none'
              required
            />
          </div>
          {loading ? (
            <div>
              Wait Karan....
            </div>) : 
            
            <button type='submit' className='bg-green-300 p-3 rounded-md text-white'>
              Submit
            </button>
          }
        </form>
      </div>
    </div>
  );
}

export default SignUp;
