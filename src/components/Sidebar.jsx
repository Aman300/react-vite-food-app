// Sidebar.js
import { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'animate.css';




const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };


  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location.href = '/'
  }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let userId = JSON.parse(localStorage.getItem("user"))

  let path = [

    
        {
          name: "Nofifications",
          path: "/",
          svgLogo: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
        },
        {
          name: "Refer and Earn",
          path: "/refer&earn",
          svgLogo: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
        },
        {
          name: "Support",
          path: "/support",
          svgLogo: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
        },
        {
          name: "Legal Terms",
          path: "/term&legal",
          svgLogo: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
        },
        {
          name: "Setting",
          path: "/term&legal",
          svgLogo: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
        },
        
      ]


  return (
    <>

        {/* Navigation links for larger screens */}
        <div className={`fixed inset-y-0 left-0 z-50 w-full  shadow-sm transition-transform transform ${isMenuOpen ? 'animate__animated animate__fadeInLeft animate__faster translate-x-0 text-center flex justify-center items-center' : '-translate-x-full'}`}>
          <div className="fixed flex flex-col top-0 left-0 w-full bg-white h-full shadow-2xl rounded-r-2xl">
            <div className="flex items-center ml-5 gap-3 h-14">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleMenu} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-orange-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </div>
              <div className=" font-bold text-xl items-center">
                  <Link to="/">
                    <h2><span className='text-orange-600'>Back</span></h2>
                  </Link>
              </div>
              
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1 p-3 ">

                <div className='w-full py-4 border rounded-xl px-5 mb-4'>
                    <div className='flex justify-between items-center gap-4 p-1 mb-2'>
                    <div className='flex justify-start items-center gap-4'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                      <h1>Aman Sharma</h1>
                    </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>

                    </div>
                    <hr />
                    <div className='flex justify-between items-center gap-4 p-1 mt-2'>
                      <div className='flex justify-start items-center gap-4'>
                        <img className=' size-6' src="https://www.svgrepo.com/show/490734/food-dinner.svg" alt="" />
                        <h1>My Order</h1>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                </div>
                    {path.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.path}
                          className={`relative flex justify-between items-center h-11 focus:outline-none hover:bg-orange-50 text-gray-600 hover:text-orange-700 border-b hover:border-orange-500 pr-6`}
                          onClick={() => (handleTabClick(index), toggleMenu(false))}
                        >
                          <div>
                            <span className="inline-flex justify-center items-center ml-4">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d={link.svgLogo}
                                />
                              </svg>
                            </span>
                            <span className="ml-2 text-md tracking-wide truncate">
                              {link.name}
                            </span>
                          </div>
                          
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                          </div>

                        </Link>
                      </li>
                    ))}
              </ul>

            </div>
             {/* logout  bottom in sidbar*/}
              <div className="flex justify-center items-center mb-5">

                  <button
                    onClick={logout}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-orange-50 text-gray-600 hover:text-orange-700 rounded-2xl pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                  </button>

                </div>

          </div>
        </div>


         {/* Main content */}
                      
         <div className={`flex justify-between items-center p-4 px-6`}>
      
               <div className="">
                  <button
                    className="text-white focus:outline-none"
                    onClick={toggleMenu}
                  >
                    {isMenuOpen ? (
                       <div className='bg-white py-3 px-3 rounded-full'>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-black"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
      
                    ) : (
                      <div className='bg-white py-3 px-3 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                      </div>


                    )}
      
                  </button>
               </div>

               <div className='flex justify-end items-center gap-3'>  
                <div className='bg-white py-3 px-3 rounded-full'>                 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>                   
                </div>
               </div>
          </div>


        </>



  );
};

export default Sidebar;