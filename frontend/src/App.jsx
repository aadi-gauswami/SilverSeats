import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import AdminLayout from './admin/AdminLayout';
import AdminDashboardPage from './admin/DashboardPage';
import AdminMoviesPage from './admin/MoviesPage';
import AdminUsersPage from './admin/UsersPage';
import AdminMovieBookingsPage from './admin/MovieBookingsPage';

import AdminLoginPage from "./admin/AdminLoginPage";

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import TicketPage from './pages/TicketPage';
import MyBookingsPage from './pages/MyBookingsPage';
import SupportPage from './pages/SupportPage';

import './pages/style.css';

/* Layout Component */
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="movies" element={<AdminMoviesPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="bookings" element={<AdminMovieBookingsPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />

        
        <Route path="/" element={ <MainLayout> <HomePage /> </MainLayout> }/>

        <Route path="/movies" element={ <MainLayout> <MoviesPage /> </MainLayout> }/>

        <Route path="/book/:movieId" element={ <MainLayout> <BookingPage /> </MainLayout> }/>

        <Route path="/payment" element={ <MainLayout> <PaymentPage /> </MainLayout> } />

        <Route path="/ticket" element={ <MainLayout> <TicketPage /> </MainLayout> } />

        <Route path="/my-bookings" element={ <MainLayout> <MyBookingsPage /> </MainLayout> }/>

        <Route path="/support" element={ <MainLayout> <SupportPage /> </MainLayout> }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
