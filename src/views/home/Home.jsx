import React, { useState, useEffect } from 'react';
import { openGameRoute, sendMessageRoute, userListRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { createGameRoute, deleteGameRoute } from '../../utils/APIRoutes';
import socket from "../../utils/Socket";
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
        socket.emit("send-message", {
          room: 101
        });

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


  useEffect(() => {

    socket.emit("is-online", 
      userId._id
    );

    fetchUserList();
    // Emit join-room event when the socket connection is established
    // socket.emit("join-room", 101);
   
    // socket.on("receive-message", (data) => {
    //   console.log(data)
    //   setData(data)
    //   //setChatMessages((prevMessages) => [...prevMessages, data]);
    // });

    socket.on("disconnect", () => {
      // When the socket disconnects, emit an "is-online" event to the server
      socket.emit("is-online", userId._id);
  });
  

    return () => {
      // Unsubscribe from socket events here if needed
      // Note: It's generally not necessary to manually disconnect the socket here,
      // as it will be disconnected automatically when the component unmounts.
    };
  }, []);

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

    <div className='h-screen p-5'>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <p className=' font-semibold'>Chat User</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>


        {
          userData &&
          userData.map((item, index) =>
            item._id !== userId._id ? (
              <Link onClick={() => generateRoomCode(item._id)} key={index} to={`/chat/${item._id}`} className='flex justify-between items-center bg-white w-full h-20 px-5 rounded-2xl mb-3'>
                <div className='flex justify-center items-center gap-2'>
                  <div>
                    <img className=' size-12' src={item.profile} alt="" />
                  </div>
                  <div>
                    <p className='text-black font-semibold'>{item.name}</p>
                    <p className={`text-sm font-semibold ${item.isOnline ? "text-green-500" : "text-gray-500"} `}>{item.isOnline ? "Online..." : item.lastSeen}</p>
                  </div>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ) : null
          )
        }

       

      

       
      </div>

    </div>

    
    {showModal ? (
        <>
          <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
            <div className="w-full">
              <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-black outline-none focus:outline-none xl:p-6 p-5">
                <div className='flex justify-between ' onClick={() => setShowModal(false)}>
                  <p className=' text-bold font-semibold'></p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <form >

                <div>
                    <div className='mb-4 text-center p-1'>
                      <input
                        id="amount"
                        name='amount'
                        className={`w-full text-white text-center px-8 py-3 rounded-full font-semibold bg-[#1e1d22]  placeholder-gray-500 text-xl focus:outline-none focus:border-gray-400 mb-4`}
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <p className=' text-[#1e1d22] text-sm'>₹ 3.5 commission Pay a commission ₹ 5000</p>
                    </div>

                    <div className='flex justify-around items-center gap-3 text-white mb-4 text-2xl '>
                      <button type="button" onClick={() => handleButtonClick('1')}>1</button>
                      <button type="button" onClick={() => handleButtonClick('2')}>2</button>
                      <button type="button" onClick={() => handleButtonClick('3')}>3</button>
                    </div>
                    <div className='flex justify-around items-center gap-3 text-white mb-4 text-2xl '>
                      <button type="button" onClick={() => handleButtonClick('4')}>4</button>
                      <button type="button" onClick={() => handleButtonClick('5')}>5</button>
                      <button type="button" onClick={() => handleButtonClick('6')}>6</button>
                    </div>
                    <div className='flex justify-around items-center gap-3 text-white mb-4 text-2xl '>
                      <button type="button" onClick={() => handleButtonClick('7')}>7</button>
                      <button type="button" onClick={() => handleButtonClick('8')}>8</button>
                      <button type="button" onClick={() => handleButtonClick('9')}>9</button>
                    </div>
                    <div className='flex justify-around items-center gap-3 text-white mb-4 text-2xl '>
                      <button type="button" onClick={() => handleButtonClick('.')}>.</button>
                      <button type="button" onClick={() => handleButtonClick('0')}>0</button>
                      <svg type="button" onClick={() => handleButtonClick('clear')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                    </svg>
                    </div>
                  </div>

                    <button
                        type='submit'
                        className="mt-5 tracking-wide font-semibold bg-white text-black w-full py-3 rounded-full hover:bg-gray-100 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"                        
                    >
                      <span>Send Money</span>                  
                    </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    


    </>
  )
}

export default Home