import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin w-10 h-10"></div>
    </div>
  );
};

export default Loader;
