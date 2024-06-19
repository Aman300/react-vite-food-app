import React, { useState, useEffect } from 'react';
import { openGameRoute, sendMessageRoute, userListRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { createGameRoute, deleteGameRoute } from '../../utils/APIRoutes';
// import socket from "../../utils/Socket";
import 'animate.css';
import { Link } from 'react-router-dom';


const validate = values => {
  const errors = {};

  if (!values.amount) {
    errors.amount = 'Required';
  } 

  return errors;
};


function Home() {

  let userId = JSON.parse(localStorage.getItem("user"))

  const [showModal, setShowModal] = useState(false);
  const [data,setData] = useState([])
  const [userData,setUserData] = useState([])

  const [amount, setAmount] = useState('');

  const handleButtonClick = (value) => {
    if (value === '.') {
      // If the dot (.) button is clicked, hide the number
      setAmount(amount + value);
    } else if (value === 'clear') {
      // If the clear button is clicked, clear the last character
      setAmount(amount.slice(0, -1));
    } else {
      // For other buttons, append the value to the input
      setAmount(amount + value);
    }
  };

async function fetchUserList(){
  try{
    let response = await axios.get(userListRoute)
    if(response.data.status){
      setUserData(response.data.data) 
    }
  }catch(e){
    console.log(e)
  }
}

  
  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        const response = await axios.post(createGameRoute + `/${userId._id}`, {
          amount: values.amount,
        });

        toast.success(response.data.message);
        setShowModal(false)
      

      } catch (error) {
        // Handle any errors
        console.error('Login failed:', error);
        toast.error(error.response.data.message);
      } finally {
        // Reset the form's submitting state
        setSubmitting(false);
      }
    },
  });




  function generateRoomCode(id) {
    // Ensure userId is a string
    const senderId = String(userId._id);
    
    // Ensure id is a string
    const receiverId = String(id);
  
    // Combine senderId and receiverId
    const roomCode = senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;
  
    localStorage.setItem("room", roomCode);
    
    return roomCode;
  }
  
  



  return (
    <>

    <div className='h-screen'>

      <div className='bg-black h-48 rounded-3xl ml-4 mr-4'>
        <img className='object-cover h-48 w-full rounded-3xl' src="https://cdn.pixabay.com/photo/2024/05/06/16/58/burger-8743791_1280.jpg" alt="" />
      </div>
      <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
        <div className="w-full">
          <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
            
            <div className='flex justify-start items-center mb-6'>
              <h1 className=' text-xl font-semibold'>Categories</h1>
            </div>

            <div className='flex items-center gap-2 mb-6'> 
              <div className='flex justify-start gap-2 items-center p-1.5 bg-orange-500 rounded-full shadow-xl'>
                <div className='bg-white rounded-full p-1'>
                  <img className=' size-6' src="https://www.svgrepo.com/show/475195/hamburger.svg" alt="" />
                </div>
                <div>
                  <p className='text-white font-semibold'>Hamburger</p>
                </div>
              </div>
              <div className='flex justify-start gap-2 items-center p-1.5 bg-[#f5f7f9] rounded-full'>
                <div className='bg-white rounded-full p-1'>
                  <img className=' size-6' src="https://www.svgrepo.com/show/475216/pizza.svg" alt="" />
                </div>
                <div>
                  <p className='text-black font-semibold'>Pizza</p>
                </div>
              </div>
              <div className='flex justify-start gap-2 items-center p-1.5 bg-[#f5f7f9] rounded-full'>
                <div className='bg-white rounded-full p-1'>
                  <img className=' size-6' src="https://www.svgrepo.com/show/406568/meat-on-bone.svg" alt="" />
                </div>
                <div>
                  <p className='text-black font-semibold'>Meat</p>
                </div>
              </div>
            </div>

            <div className='flex justify-start items-center mb-4'>
              <h1 className=' text-xl font-semibold'>Menu</h1>
            </div>

            <div className='grid grid-cols-2 mb-4'>

              <div className='h-48 bg-[#f5f7f9] rounded-2xl p-2'>
                 <img className=' h-24 w-full rounded-3xl' src="https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646_1280.jpg" alt="" />
                 <p className='text-center text-sm p-1 text-gray-500'>Hamburger</p>
                 <p className='text-center p-1'>Dubble Hamger</p>
                 <button className='py-1 w-full bg-orange-500 flex justify-center items-center gap-2 rounded-full text-sm text-white'>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Add to Chart</button>
              </div>



            </div>
           
         
         

              <div className='flex justify-around items-center'>
                <div className='py-2 px-8 border rounded-xl'>
                  <img className=' size-8' src="https://www.svgrepo.com/show/223041/google.svg" alt="" />
                </div>
                <div className='py-2 px-8 border rounded-xl'>
                  <img className=' size-8' src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="" />
                </div>

                <div className='py-2 px-8 border rounded-xl'>
                  <img className=' size-8' src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="" />
                </div>
              </div>

             
                
          </div>
        </div>
      </div>
    </div>


    </>
  )
}

export default Home