import React from 'react'
import Login from './components/login/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Admin from './components/admin/Admin'
import Employee from './components/employee/Employee'
import Inventory from './components/inventory/Inventory'
import Header from './components/header/Header'
import Routing from './components/Routing'
import Pagefound from './components/Pagefound'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={
            <Routing component={Login} />
          } />
          <Route path='/admin' element={
            <Routing component={Admin} />
          } />
          <Route path='/employee' element={
            <Routing component={Employee} />
          } />
          <Route path='/inventory' element={
            <Routing component={Inventory} />
          } />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App