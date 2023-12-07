import Image from "next/image";
import React from "react";

const MeetOurTeam = () => {
  return (
    <div className="px-[24px] lg:px-[48px]">
      <h1 className="text-[black] font-bold text-[1.75rem]">
        Meet the Manager of each Facility!
      </h1>

      <div>
        <div>
          <Image
            className="block w-full h-full rounded-[12px]"
            src={`https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            alt={`replace later`}
            width="0"
            height="0"
            unoptimized
          />
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
