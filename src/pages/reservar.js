import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import ReservationForm from "@/components/page-content/reservation/ReservationForm/ReservationForm";
import Head from "next/head";
import React from "react";

const Reservation = () => {
  return (
    <div>
      <Head>
        <title>Formulário de Reservação | Doggy Daycare</title>
        <meta
          name="description"
          content="Reserve um lugar para o seu amigão na nossa Creche para Cães! Preencha nosso formulário de reservas para garantir uma estadia confortável e divertida para o seu pet."
        />
      </Head>

      <NavBar />

      <ReservationForm />

      <Footer />
    </div>
  );
};

export default Reservation;
