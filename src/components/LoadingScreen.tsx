import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#575757] to-[#efeeff] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className='flex items-end justify-end'>
          <img src='/begs.webp' alt='bag' className='z-30 h-28 w-28 flex items-center justify-center'/>
          <h1 className="text-6xl font-bold bg-gradient-to-br from-[#e9d362] via-[#333333] to-[#e9d362] text-transparent bg-clip-text mb-8 animate-pulse ">
            ELEGANCE
          </h1>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#e9d362] via-[#333333] to-[#e9d362] rounded-full animate-pulse"></div>
        </div>

        <div className="mt-12 flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-[#e9d362] rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-accent rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#e9d362] rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;