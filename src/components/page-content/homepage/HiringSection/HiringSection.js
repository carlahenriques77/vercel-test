// pages/index.js
import PrimaryButton from "@/components/utils/PrimaryButton";
import useDataFetching from "@/hooks/useDataFetching";

const HiringSection = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[JoinUs][populate]=*";
  const { completeDataJSON: joinUsData } = useDataFetching(urlToFetch);

  return (
    <div>
      {joinUsData.data && (
        <div
          style={{
            backgroundImage: `url(https://not-cool.onrender.com${joinUsData.data.attributes.JoinUs.BackgroundImage.data.attributes.formats.small.url})`,
          }}
          className="bg-cover bg-center relative bg-fixed"
        >
          <div
            style={{
              backgroundColor: `rgba(0, 0, 0, 0.${joinUsData.data.attributes.JoinUs.GlassOverlayTransparency})`,
            }}
            className="px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-2 py-[12%] w-[100%] h-[100%] sm:py-[8%]"
          >
            <div className="flex flex-col gap-3 text-center sm:gap-[20px]">
              <h1 className="text-[24px] xl:text-[26px] text-skyBlue font-bold">
                {joinUsData.data.attributes.JoinUs.Title}
              </h1>

              <p className="text-[white] font-semibold max-w-[600px] mx-auto xl:text-[18px]">
                {
                  joinUsData.data.attributes.JoinUs.Description[0].children[0]
                    .text
                }
              </p>
            </div>

            <div>
              <PrimaryButton
                pageHref="/vagas-disponiveis"
                buttonText="Junte-se a nós!"
                buttonClassName="w-fit px-[24px] mx-auto !bg-blueForText"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HiringSection;
