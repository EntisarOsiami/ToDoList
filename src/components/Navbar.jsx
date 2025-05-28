import { Link } from 'react-router';
import { CiMenuBurger } from 'react-icons/ci';
import { FaTasks } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <nav className='navbar hidden md:block mb-3 text-white bg-blue-800 shadow-lg border-b-2 border-red-300'>
        <div className='container mx-auto px-4 py-4 flex gap-3 justify-start items-center'>
          <FaTasks className='text-white text-4xl' />
          <Link
            to='/'
            className='text-2xl text-white font-bold hover:text-red-300 transition-colors'>
            ToDo List
          </Link>
        </div>
      </nav>

      <nav className='md:hidden bg-blue-800 shadow-lg border-b-2 border-red-400'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <Link to='/' className=''>
            <FaTasks className='text-white text-4xl' />
          </Link>
          <button className='text-white text-2xl focus:outline-none transition-colors'>
            <CiMenuBurger />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
