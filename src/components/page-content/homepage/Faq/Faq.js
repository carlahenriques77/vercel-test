import React, { useState } from "react";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import Link from "next/link";

const Faq = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[FrequentlyAskedQuestions][populate][QuestionsAndAnswers][populate]=*";
  const { completeDataJSON: faqData } = useDataFetching(urlToFetch);

  // State to manage visibility of all answers
  const [openQuestions, setOpenQuestions] = useState([]);

  const toggleQuestion = (id) => {
    setOpenQuestions((previousOpenQuestions) =>
      previousOpenQuestions.includes(id)
        ? previousOpenQuestions.filter((previousId) => previousId !== id)
        : [...previousOpenQuestions, id]
    );
  };

  return (
    <>
      {!faqData.data && (
        <div className="px-[24px] lg:px-[48px] mt-[72px] mb-[72px] flex flex-col gap-4">
          <h1 className="w-fit text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem]">
            Lorem ipsum dolor sit amet consectetur
          </h1>

          <hr aria-hidden="true" className="border-skeletonLoading" />

          <ul className="flex flex-col gap-2">
            {Array.from({ length: 3 }, (_, itemIndex) => (
              <li key={itemIndex}>
                <div
                  className={`text-skeletonLoading bg-skeletonLoading rounded-[12px]  w-full text-left pl-[16px] pr-[16px] pt-[12px] pb-[12px] flex flex-row gap-3 items-center xl:text-[1.125rem]`}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit
                </div>
              </li>
            ))}
          </ul>

          <hr aria-hidden="true" className="border-black25" />

          <p className="w-fit text-skeletonLoading bg-skeletonLoading rounded-[12px] xl:text-[1.125rem]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem
            necessitatibus aut accusantium totam quibusdam ut provident sed.
          </p>
        </div>
      )}

      {faqData.data && (
        <div className="px-[24px] lg:px-[48px] mt-[72px] mb-[72px] flex flex-col gap-4">
          <h1 className="text-primaryBlue font-bold text-[1.75rem]">
            {faqData.data.attributes.FrequentlyAskedQuestions.SectionTitle}
          </h1>

          <hr aria-hidden="true" className="border-black25" />

          <ul className="flex flex-col gap-2">
            {faqData.data.attributes.FrequentlyAskedQuestions.QuestionsAndAnswers.map(
              (mapItem) => (
                <li key={mapItem.id}>
                  <button
                    aria-expanded={openQuestions.includes(mapItem.id)}
                    className={`text-shadow-black-light bg-primaryBlue text-white90 font-bold  w-full text-left pl-[16px] pr-[16px] pt-[12px] pb-[12px] flex flex-row gap-3 items-center justify-between hover:text-[white] xl:text-[1.125rem]`}
                    onClick={() => toggleQuestion(mapItem.id)}
                  >
                    {mapItem.Question}

                    {openQuestions.includes(mapItem.id) ? (
                      <Image
                        aria-hidden="true"
                        className="w-[16px] xl:w-[18px]"
                        src="/minus-icon.svg"
                        alt="Icone Menos"
                        width="0"
                        height="0"
                        unoptimized
                      />
                    ) : (
                      <Image
                        aria-hidden="true"
                        className="w-[16px] xl:w-[18px]"
                        src="/plus-icon.svg"
                        alt="Icone Mais"
                        width="0"
                        height="0"
                        unoptimized
                      />
                    )}
                  </button>

                  <div
                    className={`transition-max-height max-h-0 overflow-hidden ${
                      openQuestions.includes(mapItem.id)
                        ? "!max-h-[500px] bg-navyBlue text-[white]"
                        : "bg-navyBlue text-[white]"
                    }`}
                    aria-hidden={!openQuestions.includes(mapItem.id)}
                  >
                    <p className="w-full text-left pl-[16px] pr-[16px] pt-[12px] pb-[12px]">
                      {mapItem.Answer}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>

          <hr aria-hidden="true" className="border-black25" />

          <p className="font-bold xl:text-[1.125rem]">
            {faqData.data.attributes.FrequentlyAskedQuestions.ContactUsText}
            {"  "}
            <Link className="text-primaryBlue" href="/">
              {
                faqData.data.attributes.FrequentlyAskedQuestions
                  .ContactUsLinkOutlinedText
              }
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Faq;
