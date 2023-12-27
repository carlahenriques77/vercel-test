// components/common/Button.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Button = ({
  pageHref,
  buttonText,
  iconSrc,
  altText,
  buttonClassName,
}) => {
  return (
    <Link
      className={`cursor-pointer transition-all bg-crimsonRed px-[32px] py-[16px] rounded-lg border-deepMaroon border-b-[4px] border-solid hover:brightness-90 active:border-b-[2px] active:brightness-60 active:translate-y-[2px] text-[white] font-bold md:max-w-[600px] flex flex-row gap-[16px] justify-center items-center ${buttonClassName}`}
      href={pageHref}
    >
      {buttonText}

      {iconSrc && (
        <Image
          aria-hidden={true}
          className="w-[16px]"
          src={iconSrc}
          alt={altText}
          width={0}
          height={0}
          unoptimized
        />
      )}
    </Link>
  );
};

export default Button;
