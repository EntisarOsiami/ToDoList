import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Layout() {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
        <Navbar />
        <main className='flex-grow'>
            <Outlet />
        </main>
        <Footer />

    </div>
  )
}

export default Layout