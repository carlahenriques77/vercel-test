import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

const ReservationForm = () => {
  const urlToFetch01 = `https://not-cool.onrender.com/api/locations-maps?populate=*`;
  const { completeDataJSON: servicesData } = useDataFetching(urlToFetch01);

  const [numberOfDogs, setNumberOfDogs] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Location: "",
    ReturningCustomer: "",
    ReferralSource: "",
    EmergencyContact: {
      EmergencyName: "",
      EmergencyPhoneNumber: "",
    },
    DogsInformation: [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [firstGroupWithError, setFirstGroupWithError] = useState(null);

  useEffect(() => {
    if (firstGroupWithError !== null) {
      const firstErrorGroupRef = document.getElementById(
        `dogName${firstGroupWithError + 1}`
      );
      if (firstErrorGroupRef) {
        const navbarHeight = 140;
        const targetPosition = firstErrorGroupRef.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }

      // Reset firstGroupWithError after scroll
      setFirstGroupWithError(null);
    }
  }, [firstGroupWithError]);

  const [isShaking, setShaking] = useState(false);
  const buttonClassName = `btn ${isShaking ? "shake" : ""}`;

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const locationRef = useRef(null);
  const returningCustomerRef = useRef(null);
  const numberOfDogsRef = useRef(null);
  const emergencyNameRef = useRef(null);
  const emergencyPhoneNumberRef = useRef(null);

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
    "Location",
    "ReturningCustomer",
    "FirstName",
    "LastName",
    "Email",
    "PhoneNumber",
    "EmergencyName",
    "EmergencyPhoneNumber",
    "numberOfDogs",
  ];

  const phoneFormat = (input) => {
    input = input.replace(/\D/g, "");
    const size = input.length;

    if (size > 0) {
      input = `(${input}`;
    }
    if (size > 2) {
      input = `${input.slice(0, 3)}) ${input.slice(3, 12)}`;
    }
    if (size > 6) {
      input = `${input.slice(0, 9)}-${input.slice(9)}`;
    }

    return input;
  };

  const handleChangeField = (fieldName) => (e) => {
    const formattedValue = phoneFormat(e.target.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: formattedValue,
    }));
  };

  const handleChangePhone = handleChangeField("PhoneNumber");
  const handleChangeEmergencyPhone = handleChangeField(
    "EmergencyContact.EmergencyPhoneNumber"
  );

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

    console.log(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(
          "https://not-cool.onrender.com/api/booking-collections?populate=*",
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
        setShaking(false);
      }, 500);

      setTimeout(() => {
        const scrollToErrorResult = scrollToError(
          errors,
          {
            FirstName: firstNameRef,
            LastName: lastNameRef,
            Email: emailRef,
            PhoneNumber: phoneNumberRef,
            Location: locationRef,
            ReturningCustomer: returningCustomerRef,
            EmergencyName: emergencyNameRef,
            EmergencyPhoneNumber: emergencyPhoneNumberRef,
            numberOfDogs: numberOfDogsRef,
          },
          priorityList
        );

        if (!scrollToErrorResult) {
          // Find the first group with errors and set it to state
          setFirstGroupWithError(
            formData.DogsInformation.findIndex(
              (_, index) =>
                errors.DogsInformation &&
                errors.DogsInformation[index] &&
                Object.keys(errors.DogsInformation[index]).length > 0
            )
          );
        }
      }, 1300);

      setSubmitting(false);
    }
  };

  const handleChange = (changeEvent) => {
    const { name, value } = changeEvent.target;

    // Check if the name contains a dot (.) indicating nested property
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setFormData({
        ...formData,
        [parentKey]: {
          ...formData[parentKey],
          [childKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFieldChange = (e, index, fieldName) => {
    const { value, type, checked } = e.target;

    setFormData((prevFormData) => {
      const updatedDogsInformation = [...prevFormData.DogsInformation];

      if (type === "radio") {
        // Handle radio buttons
        updatedDogsInformation[index][fieldName] = checked ? value : "";
      } else {
        // Handle other input types
        updatedDogsInformation[index][fieldName] = value;
      }

      return {
        ...prevFormData,
        DogsInformation: updatedDogsInformation,
      };
    });
  };

  const handleCheckboxChange = () => {
    setAgreeToTerms(!agreeToTerms);
  };

  const handleSelectChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setNumberOfDogs(selectedValue);

    setFormData((prevFormData) => {
      const existingDogsInformation = prevFormData.DogsInformation;
      let updatedDogsInformation;

      // Remove excess fields if the selection is decreased
      if (selectedValue < existingDogsInformation.length) {
        updatedDogsInformation = existingDogsInformation.slice(
          0,
          selectedValue
        );
      } else {
        // Add new dogs if the selection is increased
        updatedDogsInformation = [
          ...existingDogsInformation,
          ...Array.from(
            { length: selectedValue - existingDogsInformation.length },
            () => ({
              DogName: "",
              Breed: "",
              Age: "",
              AdditionalInformation: "",
              SpreyedNeutered: "",
              VaccinationStatus: "",
            })
          ),
        ];
      }

      return {
        ...prevFormData,
        DogsInformation: updatedDogsInformation,
      };
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

    if (!data.PhoneNumber.trim()) {
      errors.PhoneNumber = "O Número de Telefone é obrigatório";
    } else if (data.PhoneNumber.length < 15) {
      errors.PhoneNumber = "Número de Telefone inválido";
    }

    if (!data.Email.trim()) {
      errors.Email = "O Email é obrigatório";
    } else if (!isValidEmail(data.Email)) {
      errors.Email = "Endereço de email inválido";
    }

    if (!data.Location || data.Location === "") {
      errors.Location = "A Localização é obrigatória";
    }

    if (!data.ReturningCustomer || data.ReturningCustomer === "") {
      errors.ReturningCustomer =
        "A seleção de Cliente com Experiencia é obrigatória";
    }

    if (!data.EmergencyContact.EmergencyName.trim()) {
      errors.EmergencyName = "O Nome do Contato de Emergência é obrigatório";
    } else if (data.EmergencyContact.EmergencyName.length < 15) {
      errors.EmergencyName = "Número de Telefone inválido";
    }

    if (!data.EmergencyContact.EmergencyPhoneNumber.trim()) {
      errors.EmergencyPhoneNumber =
        "O Número de Telefone do Contato de Emergência é obrigatório";
    }

    if (!agreeToTerms) {
      errors.agreeToTerms = "Por favor, aceite nossos termos para continuar";
    }

    if (numberOfDogs === "") {
      errors.numberOfDogs = "Por favor, selecione o número de cães";
    }

    // Validate DogsInformation array
    data.DogsInformation?.forEach((dog, index) => {
      const dogErrors = {};

      if (!dog.DogName.trim()) {
        dogErrors.DogName = `O Nome do Cão #${index + 1} é obrigatório`;
      }

      if (!dog.Breed.trim()) {
        dogErrors.Breed = `A Raça do Cão #${index + 1} é obrigatória`;
      }

      if (!dog.Age.trim()) {
        dogErrors.Age = `A Idade do Cão #${index + 1} é obrigatória`;
      }

      if (!dog.SpreyedNeutered || dog.SpreyedNeutered === "") {
        dogErrors.SpreyedNeutered = `A seleção de Castrado/Castrada para o Cão #${
          index + 1
        } é obrigatória`;
      }

      if (!dog.VaccinationStatus || dog.VaccinationStatus === "") {
        dogErrors.VaccinationStatus = `A situação de Vacinação para o Cão #${
          index + 1
        } é obrigatória`;
      }

      if (Object.keys(dogErrors).length > 0) {
        // If there are errors for this dog, add them to the main errors object
        errors.DogsInformation = errors.DogsInformation || [];
        errors.DogsInformation[index] = dogErrors;
      }
    });

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptions02, setSelectedOptions02] = useState({});

  const handleRadioChange = (event, index) => {
    setSelectedOptions((prevSelectedOptions) => {
      return {
        ...prevSelectedOptions,
        [index]: event.target.id,
      };
    });
  };

  const handleRadioChange02 = (event, index) => {
    setSelectedOptions02((prevSelectedOptions) => {
      return {
        ...prevSelectedOptions,
        [index]: event.target.id,
      };
    });
  };

  const formFieldsHasError =
    formErrors.FirstName ||
    formErrors.LastName ||
    formErrors.Email ||
    formErrors.Location ||
    formErrors.ReturningCustomer ||
    formErrors.EmergencyName ||
    formErrors.EmergencyPhoneNumber ||
    formErrors.numberOfDogs ||
    formErrors.agreeToTerms ||
    (formErrors.DogsInformation &&
      formErrors.DogsInformation.some((dog) => Object.keys(dog).length > 0)) ||
    formErrors.DogName ||
    formErrors.Breed ||
    formErrors.Age ||
    formErrors.SpreyedNeutered ||
    formErrors.VaccinationStatus;

  const genericInputClassName =
    "w-full rounded-[4px] py-[8px] px-[12px] border-solid border-[2px] border-black75 focus:border-skyBlue focus:outline-none focus:transition-none focus:static focus:z-0";

  const renderSelect = (
    label,
    id,
    name,
    value,
    error,
    options,
    selectFieldText,
    inputReference,
    helpfulText,
    isRequired,
    selectIcon,
    isLocationSelectField,
    isReturningCostumerSelectField
  ) => (
    <div className="flex gap-[4px] flex-col">
      <label className="font-bold uppercase" htmlFor={id}>
        {label}{" "}
        {isLocationSelectField && (
          <Link
            aria-label="Veja o Mapa antes de Selecionar a Localidade onde você deseja fazer a Reserva"
            className="text-primaryBlue"
            href={"/"}
          >
            [Veja o Mapa]
          </Link>
        )}
        :{isRequired && <span className="text-crimsonRed">*</span>}
      </label>

      <select
        ref={inputReference}
        className={`${genericInputClassName} ${
          error ? "!border-crimsonRed" : ""
        }`}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option
          aria-label={`${
            isLocationSelectField
              ? "Selecione a Localização onde você deseja fazer a Reserva"
              : isReturningCostumerSelectField
              ? "Selecione se você já utilizou nossos Serviçoes anteriormente"
              : "Selecione por onde você ouviu sobre nossa Creche para Cães"
          }`}
          value=""
          disabled
        >
          {selectIcon} {selectFieldText} {selectIcon}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <>
          <p aria-hidden="true" className="font-bold text-crimsonRed">
            {error}
          </p>

          <p
            aria-hidden="true"
            className="mt-[4px] text-crimsonRed font-bold brightness-75"
          >
            {helpfulText && (
              <>
                <span className="text-crimsonRed">*</span>
                {helpfulText}
              </>
            )}{" "}
          </p>
        </>
      ) : (
        <p aria-hidden="true" className="mt-[4px] text-black75 font-bold">
          {helpfulText && (
            <>
              <span className="text-crimsonRed">*</span>
              {helpfulText}
            </>
          )}
        </p>
      )}
    </div>
  );

  const renderInputField = (
    label,
    id,
    name,
    value,
    error,
    type = "text",
    placeholder,
    inputReference,
    onChange
  ) => (
    <div className="flex gap-[4px] flex-col">
      <label className="font-bold uppercase" htmlFor={id}>
        {label}:<span className="text-crimsonRed">*</span>
      </label>

      <input
        ref={inputReference}
        className={`${genericInputClassName} ${
          error ? "!border-crimsonRed" : ""
        }`}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && (
        <span aria-hidden="true" className="font-bold text-crimsonRed">
          {error}
        </span>
      )}
    </div>
  );

  const renderDogInfoInput = (
    label,
    id,
    name,
    value,
    error,
    onChange,
    placeholder,
    isRequired
  ) => (
    <div className="flex gap-[4px] flex-col" id={id}>
      <label className="font-bold uppercase" htmlFor={id}>
        {label}:{isRequired && <span className="text-crimsonRed">*</span>}
      </label>

      <input
        className={`${genericInputClassName}  ${
          error ? "!border-crimsonRed" : ""
        }`}
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && (
        <span aria-hidden="true" className="font-bold text-crimsonRed">
          {error}
        </span>
      )}
    </div>
  );

  const radioLabelClassName =
    "bg-[#f5f5f5] text-[14px] font-bold py-[8px] px-[24px] border-solid border-black50 border-[1px] w-fit rounded-[4px] hover:bg-primaryBlue hover:text-[white] cursor-pointer";

  return (
    <>
      <div className="my-[72px]">
        <div className="px-[24px] lg:px-[48px]">
          <h1 id="main-content" className="font-bold text-[1.75rem] uppercase">
            Formulario de Reservação
          </h1>
        </div>

        <hr
          aria-hidden="true"
          className={`my-[32px] border-[4px] border-lightBlue border-solid ${
            formFieldsHasError ? "border-lightRed" : ""
          }`}
        />

        <form className="" action="" onSubmit={handleSubmit}>
          <div className="px-[24px] lg:px-[48px]">
            <div className="grid gap-[24px]">
              <div className="grid md:grid-cols-2 gap-[60px] items-start">
                {servicesData.data ? (
                  <>
                    {renderSelect(
                      "Localidade",
                      "Location",
                      "Location",
                      formData.Location,
                      formErrors.Location,
                      servicesData.data.map((mapItem) => ({
                        value: mapItem.attributes.Title,
                        label: `${mapItem.attributes.Title}, ${mapItem.attributes.SpecificLocation}`,
                      })),
                      "Selecione a Localidade",
                      locationRef,
                      "A Localidade que você quer fazer a Reserva",
                      true,
                      "⚠️",
                      true
                    )}
                  </>
                ) : (
                  <>
                    {renderSelect(
                      "Localidade",
                      "Location",
                      "Location",
                      formData.Location,
                      formErrors.Location,
                      [{ value: "carregando...", label: "carregando..." }],
                      "Selecione a Localidade",
                      locationRef,
                      "*A Localidade que você quer fazer a Reserva",
                      true,
                      "⚠️",
                      true
                    )}
                  </>
                )}

                {renderSelect(
                  "Você já utilizou nossos Serviços antes?",
                  "ReturningCustomer",
                  "ReturningCustomer",
                  formData.ReturningCustomer,
                  formErrors.ReturningCustomer,
                  [
                    { value: "yes", label: "Sim" },
                    { value: "no", label: "Não" },
                  ],
                  "Selecione a Opção",
                  returningCustomerRef,
                  null,
                  true,
                  "⚠️",
                  false,
                  true
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-[60px] items-start">
                {renderSelect(
                  "Por onde você ouviu sobre nós?",
                  "ReferralSource",
                  "ReferralSource",
                  formData.ReferralSource,
                  null,
                  [
                    { value: "amigos_familia", label: "Amigos ou Família" },
                    { value: "redes_sociais", label: "Redes Sociais" },
                    { value: "busca_online", label: "Busca Online" },
                    {
                      value: "publicidade_online",
                      label: "Publicidade Online",
                    },
                    {
                      value: "indicacao_cliente",
                      label: "Indicação de Cliente",
                    },
                    { value: "evento_feira", label: "Evento ou Feira" },
                    { value: "blog_artigo", label: "Blog ou Artigo" },
                    { value: "outros_sites", label: "Outros Sites" },
                    {
                      value: "panfletos_cartazes",
                      label: "Panfletos ou Cartazes",
                    },
                    { value: "email_marketing", label: "Email Marketing" },
                    { value: "outro", label: "Outro" },
                  ],
                  "Selecione a fonte de referência",
                  null,
                  null,
                  false
                )}
              </div>
            </div>
          </div>

          <hr
            aria-hidden="true"
            className={`my-[32px] border-[4px] border-lightBlue border-solid ${
              formFieldsHasError ? "border-lightRed" : ""
            }`}
          />

          <div className="px-[24px] lg:px-[48px] grid gap-[32px]">
            <div>
              <h2
                tabIndex="0"
                aria-label="Instruções: Insira as Informações do Proprietário nos Campos abaixo. (Pressione Tab para navegar)"
                className="text-[1.5rem] font-bold"
              >
                Informações do Proprietário:
              </h2>
            </div>

            <div className="grid gap-[24px]">
              <div className="grid md:grid-cols-2 gap-[24px]">
                {renderInputField(
                  "Primeiro Nome",
                  "FirstName",
                  "FirstName",
                  formData.FirstName,
                  formErrors.FirstName,
                  "text",
                  "Digite seu primeiro nome",
                  firstNameRef,
                  handleChange
                )}

                {renderInputField(
                  "Sobrenome",
                  "LastName",
                  "LastName",
                  formData.LastName,
                  formErrors.LastName,
                  "text",
                  "Digite seu sobrenome",
                  lastNameRef,
                  handleChange
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-[24px]">
                {renderInputField(
                  "Email",
                  "Email",
                  "Email",
                  formData.Email,
                  formErrors.Email,
                  "text",
                  "Digite seu endereço de email",
                  emailRef,
                  handleChange
                )}

                {renderInputField(
                  "Telefóne",
                  "PhoneNumber",
                  "PhoneNumber",
                  formData.PhoneNumber,
                  formErrors.PhoneNumber,
                  "text",
                  "Digite seu número",
                  phoneNumberRef,
                  handleChangePhone
                )}
              </div>
            </div>
          </div>

          <hr
            aria-hidden="true"
            className={`my-[32px] border-[4px] border-lightBlue border-solid ${
              formFieldsHasError ? "border-lightRed" : ""
            }`}
          />

          <div className="px-[24px] lg:px-[48px]">
            <div className="grid gap-[32px]">
              <div>
                <h2
                  aria-label="Instruções: Insira as Informações do Contato de Emergência nos Campos abaixo. (Pressione Tab para navegar)"
                  tab-index="0"
                  className="text-[1.5rem] font-bold"
                >
                  Contato de Emergência:
                </h2>
              </div>

              <div className="grid">
                <p
                  aria-label="Informação Importante: Por favor, forneça um contato de emergência usando os campos abaixo para garantir a segurança do
                seu cão durante a estadia. Em caso de qualquer situação de
                emergência, este contato será fundamental para obter
                informações adicionais ou autorização para cuidados médicos."
                  className={`mt-[8px] text-black75 font-bold ${
                    formErrors.EmergencyPhoneNumber && formErrors.EmergencyName
                      ? "text-crimsonRed brightness-75"
                      : ""
                  }`}
                >
                  <span aria-hidden="true" className="text-crimsonRed">
                    *
                  </span>
                  Forneça um contato de emergência para garantir a segurança do
                  seu cão durante a estadia. Em caso de qualquer situação de
                  emergência, este contato será fundamental para obter
                  informações adicionais ou autorização para cuidados médicos.
                </p>

                <div className="grid gap-[24px] order-[-1]">
                  <div className="grid md:grid-cols-2 gap-[24px]">
                    {renderInputField(
                      "Nome",
                      "EmergencyName",
                      "EmergencyContact.EmergencyName",
                      formData.EmergencyContact.EmergencyName,
                      formErrors.EmergencyName,
                      "text",
                      "Digite o nome do contato de emergência",
                      emergencyNameRef,
                      handleChange
                    )}

                    {renderInputField(
                      "Telefóne",
                      "EmergencyPhoneNumber",
                      "EmergencyContact.EmergencyPhoneNumber",
                      formData.EmergencyContact.EmergencyPhoneNumber,
                      formErrors.EmergencyPhoneNumber,
                      "text",
                      "Digite o número de telefone do contato de emergência",
                      emergencyPhoneNumberRef,
                      handleChangeEmergencyPhone
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr
            aria-hidden="true"
            className={`my-[32px] border-[4px] border-lightBlue border-solid ${
              formFieldsHasError ? "border-lightRed" : ""
            }`}
          />

          <div className="px-[24px] lg:px-[48px] grid gap-[32px] md:grid-cols-2 items-center">
            <div className="grid gap-[32px]">
              <div>
                <h2 className="text-[1.5rem] font-bold">
                  Sobre seu Animal de Estimação:
                </h2>
              </div>

              <div className="grid gap-[24px]">
                <div className="flex gap-[4px] flex-col">
                  <label className="font-bold uppercase" htmlFor="numberOfDogs">
                    Numero de Cães:<span className="text-crimsonRed">*</span>
                  </label>

                  <select
                    ref={numberOfDogsRef}
                    className={`${genericInputClassName} ${
                      formErrors.numberOfDogs ? "!border-crimsonRed" : ""
                    }`}
                    name="numberOfDogs"
                    id="numberOfDogs"
                    value={numberOfDogs}
                    onChange={handleSelectChange}
                  >
                    <option
                      aria-label="Selecione o Número de Cães que você quer enviar para a nossa Creche"
                      value=""
                      disabled
                    >
                      ⚠️ Selecione o Número de Cães ⚠️
                    </option>

                    {Array.from({ length: 7 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>

                  {formErrors.numberOfDogs && (
                    <span
                      aria-hidden="true"
                      className="font-bold text-crimsonRed"
                    >
                      {formErrors.numberOfDogs}
                    </span>
                  )}

                  {!formErrors.numberOfDogs && (
                    <p
                      aria-hidden="true"
                      className="mt-[4px] text-black75 font-bold"
                    >
                      <span className="text-crimsonRed">*</span>O Número de Cães
                      que você quer enviar para a nossa Creche
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              {formFieldsHasError ? (
                <Image
                  aria-hidden={true}
                  className="rotate-[8deg] w-full h-[100px]"
                  src="trail-and-ball-red.svg"
                  alt="Bola de Tennis"
                  width="0"
                  height="0"
                  unoptimized
                />
              ) : (
                <Image
                  aria-hidden={true}
                  className="rotate-[8deg] w-full h-[100px]"
                  src="trail-and-ball.svg"
                  alt="Bola de Tennis"
                  width="0"
                  height="0"
                  unoptimized
                />
              )}
            </div>
          </div>

          <hr
            aria-hidden="true"
            className={`my-[32px] border-[4px] border-lightBlue border-solid ${
              formFieldsHasError ? "border-lightRed" : ""
            }`}
          />

          <div>
            {numberOfDogs !== "" &&
              formData.DogsInformation.map((mapItem, index) => (
                <div key={index}>
                  <div className="px-[24px] lg:px-[48px] grid gap-[24px]">
                    <div>
                      <h3
                        aria-label={`Instruções: Insira as Informações do seu Cão #${
                          index + 1
                        } nos Campos abaixo. (Pressione Tab para navegar)`}
                        tabIndex="0"
                        className="text-[1.25rem] font-bold uppercase"
                      >
                        Cachorro #{index + 1}:
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-[24px]">
                      {renderDogInfoInput(
                        "Nome",
                        `dogName${index + 1}`,
                        `DogsInformation.${index}.DogName`,
                        mapItem.DogName,
                        formErrors.DogsInformation &&
                          formErrors.DogsInformation[index] &&
                          formErrors.DogsInformation[index].DogName,
                        (e) => handleFieldChange(e, index, "DogName"),
                        `Digite o nome do cachorro #${index + 1}`,
                        true
                      )}

                      {renderDogInfoInput(
                        "Raça",
                        `breed${index + 1}`,
                        `DogsInformation.${index}.Breed`,
                        mapItem.Breed,
                        formErrors.DogsInformation &&
                          formErrors.DogsInformation[index] &&
                          formErrors.DogsInformation[index].Breed,
                        (e) => handleFieldChange(e, index, "Breed"),
                        `Digite a raça do cachorro #${index + 1}`,
                        true
                      )}
                    </div>

                    {renderDogInfoInput(
                      "Idade",
                      `age${index + 1}`,
                      `DogsInformation.${index}.Age`,
                      mapItem.Age,
                      formErrors.DogsInformation &&
                        formErrors.DogsInformation[index] &&
                        formErrors.DogsInformation[index].Age,
                      (e) => handleFieldChange(e, index, "Age"),
                      `Digite a idade aproximada do seu Cão #${
                        index + 1
                      } em meses ou anos.`,
                      true
                    )}

                    <div className="flex gap-[4px] flex-col">
                      <label className="font-bold uppercase" htmlFor="Message">
                        Necessidades Especiais / Condições Médicas / Informação
                        Adicional:
                      </label>

                      <textarea
                        className={`${genericInputClassName}`}
                        rows="4"
                        id={`additionalInfo${index + 1}`}
                        name={`DogsInformation.${index}.AdditionalInformation`}
                        value={mapItem.AdditionalInformation}
                        onChange={(e) =>
                          handleFieldChange(e, index, "AdditionalInformation")
                        }
                        placeholder={`Digite aqui quaisquer necessidades especiais, condições médicas, instruções especiais que você quer, ou informações adicionais sobre o seu cão #${
                          index + 1
                        }.`}
                      ></textarea>
                    </div>

                    <div className="grid md:grid-cols-2 gap-[24px]">
                      <div className="h-fit grid gap-[12px]">
                        <div>
                          <h4
                            aria-label={`Instruções: Selecione o Estado de Esterrilização do Cão #${
                              index + 1
                            } usando os Botões abaixo. (Pressione Tab para navegar)`}
                            tabIndex="0"
                            className="font-bold uppercase"
                          >
                            Estado de Esterilização:
                            <span className="text-crimsonRed">*</span>
                          </h4>
                        </div>

                        <div className="grid">
                          <div>
                            {formErrors.DogsInformation &&
                              formErrors.DogsInformation[index] &&
                              formErrors.DogsInformation[index]
                                .SpreyedNeutered && (
                                <span className="block mt-[4px] font-bold text-crimsonRed">
                                  {
                                    formErrors.DogsInformation[index]
                                      .SpreyedNeutered
                                  }
                                </span>
                              )}

                            <p
                              tabIndex="0"
                              aria-label="Mensagem Importante, leia antes de prosseguir: A informação sobre o estado de esterilização pode
                            nos ajudar a proporcionar a melhor experiência
                            para ele. Em caso do seu Cão ser muito jovem,
                            então marque a opção 'Não se Aplica'. (Pressione Tab para navegar)"
                              className={`mt-[8px] text-black75 font-bold ${
                                formErrors.DogsInformation &&
                                formErrors.DogsInformation[index] &&
                                formErrors.DogsInformation[index]
                                  .SpreyedNeutered
                                  ? "brightness-75 text-crimsonRed"
                                  : ""
                              }`}
                            >
                              <span
                                aria-hidden="true"
                                className="text-crimsonRed"
                              >
                                *
                              </span>
                              A informação sobre o estado de esterilização pode
                              nos ajudar a proporcionar a melhor experiência
                              para ele. Em caso do seu Cão ser muito jovem,
                              então marque a opção 'Não se Aplica'.
                            </p>
                          </div>

                          <div className="order-[-1] flex gap-[12px]">
                            <label
                              className={`${radioLabelClassName} ${
                                selectedOptions[index] ===
                                `spayedNeutered${index + 1}`
                                  ? "!bg-primaryBlue text-[white] border-[black]"
                                  : ""
                              }`}
                              htmlFor={`spayedNeutered${index + 1}`}
                            >
                              <input
                                className="visually-hidden"
                                type="radio"
                                id={`spayedNeutered${index + 1}`}
                                name={`DogsInformation.${index}.SpreyedNeutered`}
                                onChange={(e) => {
                                  handleFieldChange(
                                    e,
                                    index,
                                    "SpreyedNeutered"
                                  );
                                  handleRadioChange(e, index);
                                }}
                                value="Castrado(a)"
                              />
                              Castrado(a)
                            </label>

                            <label
                              className={`${radioLabelClassName} ${
                                selectedOptions[index] ===
                                `notApplicable${index + 1}`
                                  ? "!bg-primaryBlue text-[white] border-[black]"
                                  : ""
                              }`}
                              htmlFor={`notApplicable${index + 1}`}
                            >
                              <input
                                className="visually-hidden"
                                type="radio"
                                id={`notApplicable${index + 1}`}
                                name={`DogsInformation.${index}.SpreyedNeutered`}
                                onChange={(e) => {
                                  handleFieldChange(
                                    e,
                                    index,
                                    "SpreyedNeutered"
                                  );
                                  handleRadioChange(e, index);
                                }}
                                value="Não Aplicavel"
                              />
                              Não se Aplica
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="h-fit grid gap-[12px]">
                        <h4
                          aria-label={`Instruções: Selecione o Status de Vicanação do Cão #${
                            index + 1
                          } usando os Botões abaixo. (Pressione Tab para navegar)`}
                          tabIndex="0"
                          className="font-bold uppercase"
                        >
                          Status de Vacinação:
                          <span className="text-crimsonRed">*</span>
                        </h4>

                        <div className="grid">
                          <div>
                            {formErrors.DogsInformation &&
                              formErrors.DogsInformation[index] &&
                              formErrors.DogsInformation[index]
                                .VaccinationStatus && (
                                <span className="block mt-[4px] font-bold text-crimsonRed">
                                  {
                                    formErrors.DogsInformation[index]
                                      .VaccinationStatus
                                  }
                                </span>
                              )}

                            <p
                              tabIndex="0"
                              aria-label="Mensagem Importante, leia antes de prosseguir: Se o
                              status de vacinação do seu cão não estiver
                              atualizado, ou você não tiver certeza. por favor,
                              conclua o formulário. Entraremos em contato por
                              e-mail para fornecer instruções adicionais sobre
                              os próximos passos necessários para garantir que
                              seu cão possa ser vacinado e participar da nossa
                              creche! Agradecemos pela compreensão e aguardamos
                              a oportunidade de cuidar do seu animal de
                              estimação. (Pressione Tab para cotinuar e Navegar)"
                              className={`mt-[8px] text-black75 font-bold ${
                                formErrors.DogsInformation &&
                                formErrors.DogsInformation[index] &&
                                formErrors.DogsInformation[index]
                                  .VaccinationStatus
                                  ? "brightness-75 text-crimsonRed"
                                  : ""
                              }`}
                            >
                              <span className="text-crimsonRed">*</span>Se o
                              status de vacinação do seu cão não estiver
                              atualizado, ou você não tiver certeza. por favor,
                              conclua o formulário. Entraremos em contato por
                              e-mail para fornecer instruções adicionais sobre
                              os próximos passos necessários para garantir que
                              seu cão possa ser vacinado e participar da nossa
                              creche! Agradecemos pela compreensão e aguardamos
                              a oportunidade de cuidar do seu animal de
                              estimação.
                            </p>
                          </div>

                          <div className="order-[-1] flex gap-[12px]">
                            <label
                              className={`${radioLabelClassName} ${
                                selectedOptions02[index] ===
                                `updatedStatus${index + 1}`
                                  ? "!bg-primaryBlue text-[white] border-[black]"
                                  : ""
                              }`}
                              htmlFor={`updatedStatus${index + 1}`}
                            >
                              <input
                                className="visually-hidden"
                                type="radio"
                                id={`updatedStatus${index + 1}`}
                                name={`DogsInformation.${index}.VaccinationStatus`}
                                onChange={(e) => {
                                  handleFieldChange(
                                    e,
                                    index,
                                    "VaccinationStatus"
                                  );
                                  handleRadioChange02(e, index);
                                }}
                                value="Atualizado"
                              />
                              Atualizada
                            </label>

                            <label
                              className={`${radioLabelClassName} ${
                                selectedOptions02[index] ===
                                `notUpdatedStatus${index + 1}`
                                  ? "!bg-primaryBlue text-[white] border-[black]"
                                  : ""
                              }`}
                              htmlFor={`notUpdatedStatus${index + 1}`}
                            >
                              <input
                                className="visually-hidden"
                                type="radio"
                                id={`notUpdatedStatus${index + 1}`}
                                name={`DogsInformation.${index}.VaccinationStatus`}
                                onChange={(e) => {
                                  handleFieldChange(
                                    e,
                                    index,
                                    "VaccinationStatus"
                                  );
                                  handleRadioChange02(e, index);
                                }}
                                value="Não Atualizado"
                              />
                              Não Atualizada
                            </label>

                            <label
                              className={`${radioLabelClassName} ${
                                selectedOptions02[index] ===
                                `notSureStatus${index + 1}`
                                  ? "!bg-primaryBlue text-[white] border-[black]"
                                  : ""
                              }`}
                              htmlFor={`notSureStatus${index + 1}`}
                            >
                              <input
                                className="visually-hidden"
                                type="radio"
                                id={`notSureStatus${index + 1}`}
                                name={`DogsInformation.${index}.VaccinationStatus`}
                                onChange={(e) => {
                                  handleFieldChange(
                                    e,
                                    index,
                                    "VaccinationStatus"
                                  );
                                  handleRadioChange02(e, index);
                                }}
                                value="Não Tenho Certeza..."
                              />
                              Não Tenho Certeza...
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr
                    aria-hidden="true"
                    className={`my-[32px] border-[4px] border-lightBlue border-solid ${
                      formFieldsHasError ? "border-lightRed" : ""
                    }`}
                  />
                </div>
              ))}
          </div>

          <div className="px-[24px] lg:px-[48px] grid gap-[12px]">
            <label className="font-bold">
              <input
                className="visually-hidden"
                type="checkbox"
                checked={agreeToTerms}
                onChange={handleCheckboxChange}
              />

              <div className="flex gap-[8px] items-center">
                <span
                  className={`flex items-center justify-center cursor-pointer h-[20px] w-[20px] bg-[#f5f5f5] rounded-[4px] border-solid border-black50 border-[1px] ${
                    agreeToTerms ? "!bg-primaryBlue" : ""
                  }`}
                >
                  {" "}
                  <Image
                    aria-hidden={true}
                    className="w-[12px] select-none"
                    src="/checkmark.svg"
                    alt="Check Icone"
                    width={0}
                    height={0}
                    unoptimized
                  />
                </span>

                <div className="select-none">
                  <p>
                    <span aria-hidden="true" className="text-crimsonRed">
                      *
                    </span>{" "}
                    Eu Concordo com os{" "}
                    <Link
                      className={`underline text-primaryBlue ${
                        formFieldsHasError ? "!text-deepMaroon" : ""
                      }`}
                      href="/"
                    >
                      Termos e Condições
                    </Link>
                  </p>
                </div>
              </div>
            </label>

            {formErrors.agreeToTerms && (
              <span aria-hidden="true" className="font-bold text-crimsonRed">
                {formErrors.agreeToTerms}
              </span>
            )}

            <button
              className={`cursor-pointer transition-all bg-primaryBlue px-[32px] py-[16px] rounded-lg border-navyBlue border-b-[4px] hover:brightness-110  hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-[white] font-bold md:w-[600px] flex flex-row gap-[16px] justify-center items-center ${
                formFieldsHasError ? "!bg-crimsonRed !border-deepMaroon" : ""
              } ${buttonClassName}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
              <Image
                aria-hidden={true}
                className="w-[16px]"
                src="/calendar-icon.svg"
                alt="Calendario Icone"
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
                  {formErrors.FirstName && `${formErrors.FirstName},`}
                  {formErrors.LastName && ` ${formErrors.LastName},`}
                  {formErrors.PhoneNumber && ` ${formErrors.PhoneNumber},`}
                  {formErrors.Email && ` ${formErrors.Email},`}
                  {formErrors.Location && ` ${formErrors.Location},`}
                  {formErrors.ReturningCustomer &&
                    ` ${formErrors.ReturningCustomer},`}
                  {formErrors.EmergencyName && ` ${formErrors.EmergencyName},`}
                  {formErrors.EmergencyPhoneNumber &&
                    ` ${formErrors.EmergencyPhoneNumber},`}
                  {formErrors.agreeToTerms && ` ${formErrors.agreeToTerms},`}
                  {formErrors.numberOfDogs && ` ${formErrors.numberOfDogs},`}
                  {formErrors.DogsInformation &&
                    formErrors.DogsInformation.map((dogErrors, index) => (
                      <span key={index}>
                        {`, ${dogErrors.DogName}`}
                        {dogErrors.Breed && `, ${dogErrors.Breed}`}
                        {dogErrors.Age && `, ${dogErrors.Age}`}
                        {dogErrors.SpreyedNeutered &&
                          `, ${dogErrors.SpreyedNeutered}`}
                        {dogErrors.VaccinationStatus &&
                          `, ${dogErrors.VaccinationStatus}`}
                      </span>
                    ))}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReservationForm;
