"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from '@/database/firebase-config';

function SignIn() {
  const [email, setEmail] = useState(''); // Initialize as empty strings
  const [password, setPassword] = useState(''); // Initialize as empty strings
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Correct the naming

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // If the login is successful, navigate to the chat-app page
      router.push("/chat-app");
    } catch (error) {
      const errorMessage = error.message;
      alert(`Login failed: ${errorMessage}`); // Show the error message
    } finally {
      setLoading(false); // Reset the loading state after operation completes
    }
  };

  return (
    <div className='flex justify-center items-center flex-col m-10'>
      <h1 className='text-2xl font-bold p-4'>Log In Page</h1>
      <div className='border-2 border-gray-200 rounded-lg p-14 bg-yellow-200 cursor-pointer'>
        <form onSubmit={handleSubmit}>
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
            <div>Wait Karan...</div>
          ) : (
            <button type='submit' className='bg-green-300 p-3 rounded-md text-white'>
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
