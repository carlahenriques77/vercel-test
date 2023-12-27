import Footer from '@/components/common/Footer/Footer';
import NavBar from '@/components/common/NavBar/NavBar';
import ReservationForm from '@/components/page-content/reservation/ReservationForm/ReservationForm';
import React from 'react';

const Reservation = () => {
    return (
        <div>
            <NavBar />

            <ReservationForm />

            <Footer />
        </div>
    );
};

export default Reservation;