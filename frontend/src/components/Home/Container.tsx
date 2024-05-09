import React from "react";

type Props = {
  styles: string;
};

export default function Container({
  children,
  styles,
}: Readonly<{
  children: React.ReactNode;
}> &
  Props) {
  return (
    <div className={"lg:px-60 md:px-40 sm:px-20 py-4 " + styles}>
      {children}
    </div>
  );
}
