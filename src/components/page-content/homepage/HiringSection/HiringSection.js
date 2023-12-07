// pages/index.js
import Button from "@/components/utils/Button";
import useDataFetching from "@/hooks/useDataFetching";

const HiringSection = () => {
  const urlToFetch =
    "http://localhost:1337/api/content-media?populate[JoinUs][populate]=*";
  const { completeDataJSON: joinUsData } = useDataFetching(urlToFetch);

  return (
    <div>
      {!joinUsData.data && (
        <div className="pulsate bg-black25 rounded-[12px] mt-[72px] text-skeletonLoading bg-skeletonLoading rounded-[12px] flex justify-center items-center relative">
          <h1 className="text-skeletonLoading bg-skeletonLoading text-center text-[1.5rem] xl:text-[1.625rem] my-[12%] text-[white] rounded-[12px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </h1>
        </div>
      )}

      {joinUsData.data && (
        <div
          style={{
            backgroundImage: `url(http://localhost:1337${joinUsData.data.attributes.JoinUs.BackgroundImage.data.attributes.formats.small.url})`,
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
              <h1 className="text-[1.5rem] xl:text-[1.625rem] text-skyBlue font-bold">
                {joinUsData.data.attributes.JoinUs.Title}
              </h1>

              <p className="text-[white] font-semibold max-w-[600px] mx-auto xl:text-[1.125rem]">
                {
                  joinUsData.data.attributes.JoinUs.Description[0].children[0]
                    .text
                }
              </p>
            </div>

            <div>
              <Button
                pageHref="/vagas-disponiveis"
                buttonText="Junte-se a nós!"
                buttonClassName="w-fit px-[32px] mx-auto !bg-blueForText"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HiringSection;
