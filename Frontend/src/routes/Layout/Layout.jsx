import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
      <Header />
      </div>
      <div className="content">
      <Outlet />
      </div>
    </div>
  )
}

export default Layout