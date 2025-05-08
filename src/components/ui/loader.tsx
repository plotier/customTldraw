import React from "react";

type LoaderProps = {
  size?: number;
};

const Loader = ({ size = 24 }: LoaderProps) => {
  return (
    <div
      className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900"
      style={{ width: size, height: size }}
    />
  );
};

export default Loader;
