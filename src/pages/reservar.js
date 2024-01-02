import Footer from "@/components/common/Footer/Footer";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import NavBar from "@/components/common/NavBar/NavBar";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import ReservationForm from "@/components/page-content/reservation/ReservationForm/ReservationForm";
import useCheckFetch from "@/hooks/useCheckFetch";
import Head from "next/head";
import React from "react";

const Reservation = () => {
  const apiUrl = "https://not-cool.onrender.com/api/locations-maps?populate=*";
  const { loading, error } = useCheckFetch(apiUrl);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ServerDown />;
  }

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
