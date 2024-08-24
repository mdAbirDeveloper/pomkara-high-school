import React from 'react'
import Navber from '../Shared/Navber'
import Footer from '../Shared/Footer'

const Layout = ({children}) => {
  return (
    <div>
        <Navber />
        <div className='min-h-screen'>{children}</div>
        <Footer />
    </div>
  )
}

export default Layout