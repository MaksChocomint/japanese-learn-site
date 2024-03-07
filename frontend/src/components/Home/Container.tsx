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
  return <div className={"px-60 py-4 " + styles}>{children}</div>;
}
