import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const Contact = () => {
  const urlToFetch01 = `https://not-cool.onrender.com/api/locations-maps?populate=*`;
  const { completeDataJSON: servicesData } = useDataFetching(urlToFetch01);

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Location: "",
    InquiryType: "",
    Message: "",
  });

  const router = useRouter();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const locationRef = useRef(null);
  const inquiryTypeRef = useRef(null);
  const messageRef = useRef(null);

  const [isShaking, setShaking] = useState(false);
  const buttonClassName = `btn ${isShaking ? "shake" : ""}`;

  const scrollToError = (errors, refs, priorityList) => {
    for (const field of priorityList) {
      if (errors[field] && refs[field].current) {
        const navbarHeight = 140;
        const targetPosition = refs[field].current.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        return true; // Scroll successful
      }
    }

    return false; // No errors found
  };

  // Define the prioritized list
  const priorityList = [
    "FirstName",
    "LastName",
    "Email",
    "Message",
    "Location",
    "InquiryType",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the form is already being submitted
    if (isSubmitting) {
      return;
    }

    // Start the submission process
    setSubmitting(true);

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(
          "https://not-cool.onrender.com/api/contact-messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: formData }),
          }
        );

        if (response.ok) {
          console.log("Form submitted successfully!");

          // Get the current route
          const currentPath = router.asPath;

          // Redirect to the success page by manipulating the current route
          router.push(`${currentPath}/sucesso`);

          setSubmitting(false);
        } else {
          const errorDetails = await response.json(); // Parse the error response
          console.error("Error submitting form:", errorDetails);
        }
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    } else {
      setShaking(true);

      setTimeout(() => {
        scrollToError(
          errors,
          {
            FirstName: firstNameRef,
            LastName: lastNameRef,
            Email: emailRef,
            Location: locationRef,
            Message: messageRef,
          },
          priorityList
        );
      }, 1300);

      setSubmitting(false);
    }
  };

  const handleChange = (changeEvent) => {
    setFormData({
      ...formData,
      [changeEvent.target.name]: changeEvent.target.value,
    });
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.FirstName.trim()) {
      errors.FirstName = "O Nome é obrigatório";
    }

    if (!data.LastName.trim()) {
      errors.LastName = "O Sobrenome é obrigatório";
    }

    if (!data.Email.trim()) {
      errors.Email = "O Email é obrigatório";
    } else if (!isValidEmail(data.Email)) {
      errors.Email = "Endereço de email inválido";
    }

    if (!data.Location || data.Location === "") {
      errors.Location = "A Localização é obrigatória";
    }

    if (!data.InquiryType || data.InquiryType === "") {
      errors.InquiryType = "O Tipo de Consulta é obrigatório";
    }

    if (!data.Message.trim()) {
      errors.Message = "A Mensagem é obrigatória";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formFieldsHasError =
    formErrors.FirstName ||
    formErrors.LastName ||
    formErrors.Email ||
    formErrors.Location ||
    formErrors.InquiryType ||
    formErrors.Message;

  return (
    <>
      <div className="px-[24px] lg:px-[48px] my-[72px] grid">
        <div className="flex flex-col gap-[12px]">
          <h1 id="main-content" className="font-bold text-[1.75rem] uppercase">
            ENTRE EM CONTATO
          </h1>

          <p className="font-medium xl:text-[1.125rem]">
            Se você tiver alguma dúvida que não está respondida em nossa{" "}
            <Link
              className="text-primaryBlue underline"
              href={"/perguntas-frequentes"}
            >
              seção de Perguntas Frequentes (FAQ)
            </Link>
            , se tiver alguma sugestão, desejar relatar um erro em nosso site,
            ou até mesmo só quiser nos cumprimentar, ficaremos felizes em ouvir
            de você! Preencha o formulário abaixo, e entraremos em contato o
            mais breve possível.
          </p>
        </div>

        <hr aria-hidden="true" className="border-black25 my-[32px]" />

        <div>
          <form action="" onSubmit={handleSubmit} className="">
            <div className="flex gap-[48px] flex-col">
              <div className="flex flex-col gap-[24px]">
                <div className="flex gap-[4px] flex-col">
                  <label className="font-bold uppercase" htmlFor="FirstName">
                    Primeiro Nome:
                    <span aria-hidden={true} className="text-crimsonRed">
                      *
                    </span>
                  </label>

                  <input
                    ref={firstNameRef}
                    className={`w-full rounded-[4px] py-[8px] px-[12px] border-solid border-[2px] border-black75 focus:border-skyBlue focus:outline-none focus:transition-none focus:static focus:z-0 ${
                      formErrors.FirstName ? "!border-crimsonRed" : ""
                    }`}
                    type="text"
                    id="FirstName"
                    name="FirstName"
                    placeholder="Digite seu primeiro nome"
                    value={formData.FirstName}
                    onChange={handleChange}
                    aria-live="assertive"
                    aria-required="true"
                  />

                  {formErrors.FirstName && (
                    <span
                      aria-hidden={true}
                      className="font-bold text-crimsonRed"
                    >
                      {formErrors.FirstName}
                    </span>
                  )}
                </div>

                <div className="flex gap-[4px] flex-col">
                  <label className="font-bold uppercase" htmlFor="LastName">
                    Sobrenome:
                    <span aria-hidden={true} className="text-crimsonRed">
                      *
                    </span>
                  </label>

                  <input
                    ref={lastNameRef}
                    className={`w-full rounded-[4px] py-[8px] px-[12px] border-solid border-[2px] border-black75 focus:border-skyBlue focus:outline-none focus:transition-none focus:static focus:z-0 ${
                      formErrors.LastName ? "!border-crimsonRed" : ""
                    }`}
                    type="text"
                    id="LastName"
                    name="LastName"
                    placeholder="Digite seu sobrenome"
                    value={formData.LastName}
                    onChange={handleChange}
                    aria-live="assertive"
                    aria-required="true"
                  />

                  {formErrors.LastName && (
                    <span
                      aria-hidden={true}
                      className="font-bold text-crimsonRed"
                    >
                      {formErrors.LastName}
                    </span>
                  )}
                </div>

                <div className="flex gap-[4px] flex-col">
                  <label className="font-bold uppercase" htmlFor="Email">
                    Email:
                    <span aria-hidden={true} className="text-crimsonRed">
                      *
                    </span>
                  </label>

                  <input
                    ref={emailRef}
                    className={`w-full rounded-[4px] py-[8px] px-[12px] border-solid border-[2px] border-black75 focus:border-skyBlue focus:outline-none focus:transition-none focus:static focus:z-0 ${
                      formErrors.Email ? "!border-crimsonRed" : ""
                    }`}
                    type="email"
                    id="Email"
                    name="Email"
                    placeholder="Digite seu endereço de email"
                    value={formData.Email}
                    onChange={handleChange}
                    aria-live="assertive"
                    aria-required="true"
                  />

                  {formErrors.Email && (
                    <span
                      aria-hidden={true}
                      className="font-bold text-crimsonRed"
                    >
                      {formErrors.Email}
                    </span>
                  )}
                </div>

                <div className="flex gap-[4px] flex-col">
                  <label className="font-bold uppercase" htmlFor="Message">
                    Mensagem:
                    <span aria-hidden={true} className="text-crimsonRed">
                      *
                    </span>
                  </label>

                  <textarea
                    ref={messageRef}
                    className={`w-full rounded-[4px] py-[8px] px-[12px] border-solid border-[2px] border-black75 focus:border-skyBlue focus:outline-none focus:transition-none focus:static focus:z-0 ${
                      formErrors.Message ? "!border-crimsonRed" : ""
                    }`}
                    id="Message"
                    name="Message"
                    rows="4"
                    placeholder="Digite sua mensagem"
                    value={formData.Message}
                    onChange={handleChange}
                    aria-live="assertive"
                    aria-required="true"
                  ></textarea>

                  {formErrors.Message && (
                    <span
                      aria-hidden={true}
                      className="font-bold text-crimsonRed"
                    >
                      {formErrors.Message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-[24px] md:grid-cols-2">
                <div className="flex gap-[4px] flex-col">
                  <label className="font-bold uppercase" htmlFor="Location">
                    Localidade{" "}
                    <Link className="text-primaryBlue" href={"/"}>
                      [Veja o Mapa]
                    </Link>
                    :
                    <span aria-hidden={true} className="text-crimsonRed">
                      *
                    </span>
                  </label>

                  <select
                    ref={locationRef}
                    className={`w-full rounded-[4px] py-[8px] px-[12px] border-solid border-[2px] border-black75 focus:border-skyBlue focus:outline-none focus:transition-none focus:static focus:z-0 ${
                      formErrors.Location ? "!border-crimsonRed" : ""
                    }`}
                    id="Location"
                    name="Location"
                    onChange={handleChange}
                    aria-live="assertive"
                    aria-required="true"
                    value={formData.Location}
                  >
                    <option
                      aria-label="Selecione a Localização para onde você deseja enviar uma Mensagem"
                      value=""
                      disabled
                    >
                      ⚠️ Selecione uma Localização ⚠️
                    </option>

                    {servicesData.data ? (
                      <>
                        {servicesData.data.map((mapItem, itemIndex) => (
                          <option
                            value={mapItem.attributes.Title}
                            key={mapItem.id}
                          >
                            {mapItem.attributes.Title},{" "}
                            {mapItem.attributes.SpecificLocation}
                          </option>
                        ))}
                      </>
                    ) : (
                      <>
                        <option value="carregando...">carregando...</option>
                      </>
                    )}
                  </select>

                  {formErrors.Location ? (
                    <>
                      <span
                        aria-hidden={true}
                        className="font-bold text-crimsonRed"
                      >
                        {formErrors.Location}
                      </span>

                      <p
                        aria-hidden="true"
                        className="mt-[4px] text-crimsonRed font-bold brightness-75"
                      >
                        <span className="text-crimsonRed">*</span>Selecione a
                        Localização para onde deseja enviar a Mensagem
                      </p>
                    </>
                  ) : (
                    <p
                      aria-hidden="true"
                      className="mt-[4px] text-black75 font-bold"
                    >
                      <span className="text-crimsonRed">*</span>Selecione a
                      Localização para onde deseja enviar a Mensagem
                    </p>
                  )}
                </div>

                <div className="flex gap-[4px] flex-col">
                  <label className="font-bold uppercase" htmlFor="InquiryType">
                    Tipo de Contato :
                    <span aria-hidden={true} className="text-crimsonRed">
                      *
                    </span>
                  </label>

                  <select
                    ref={inquiryTypeRef}
                    className={`w-full rounded-[4px] py-[8px] px-[12px] border-solid border-[2px] border-black75 focus:border-skyBlue focus:outline-none focus:transition-none focus:static focus:z-0 ${
                      formErrors.InquiryType ? "!border-crimsonRed" : ""
                    }`}
                    id="InquiryType"
                    name="InquiryType"
                    onChange={handleChange}
                    aria-live="assertive"
                    aria-required="true"
                    value={formData.InquiryType}
                  >
                    <option
                      aria-label="Selecione o tipo de Consulta que deseja fazer"
                      value=""
                      disabled
                    >
                      ⚠️ Selecione o Tipo de Consulta ⚠️
                    </option>

                    <option value="general">Consulta Geral</option>
                    <option value="reservation">Reserva</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Reclamação</option>
                  </select>

                  {formErrors.InquiryType && (
                    <span
                      aria-hidden={true}
                      className="font-bold text-crimsonRed"
                    >
                      {formErrors.InquiryType}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <hr aria-hidden="true" className="border-black25 my-[32px]" />

            <div className="flex flex-col gap-[16px]">
              <div>
                <p className="text-[black] font-bold xl:text-[1.125rem]">
                  <span aria-hidden={true} className="text-crimsonRed">
                    *
                  </span>
                  <span className="visually-hidden">Mensagem Importante:</span>
                  As informações pessoais fornecidas por meio deste formulário
                  serão utilizadas exclusivamente para responder à sua pergunta
                  ou preocupação e não serão utilizadas para fins de marketing.
                  É necessário ter 16 anos ou mais para enviar este formulário.
                </p>
              </div>

              <button
                className={`cursor-pointer transition-all bg-primaryBlue px-[32px] py-[16px] rounded-lg border-navyBlue border-b-[4px] hover:brightness-110  hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-[white] font-bold md:max-w-[600px] flex flex-row gap-[16px] justify-center items-center ${
                  formFieldsHasError ? "!bg-crimsonRed !border-deepMaroon" : ""
                } ${buttonClassName}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
                <Image
                  aria-hidden={true}
                  className="w-[16px]"
                  src="/plane-icon.svg"
                  alt="Avião Icone"
                  width={0}
                  height={0}
                  unoptimized
                />
              </button>

              <div aria-live="assertive" role="alert">
                {formFieldsHasError && (
                  <p className="visually-hidden">
                    Houve um erro ao enviar o formulário. Por favor, corrija os
                    seguintes campos e tente novamente:{" "}
                    {formErrors.FirstName && ` ${formErrors.FirstName},`}
                    {formErrors.LastName && ` ${formErrors.LastName},`}
                    {formErrors.Email && ` ${formErrors.Email},`}
                    {formErrors.Message && ` ${formErrors.Message},`}
                    {formErrors.Location && ` ${formErrors.Location},`}
                    {formErrors.InquiryType && ` ${formErrors.InquiryType}.`}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
