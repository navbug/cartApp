import React from "react";
import PageNotFoundImage from "../assets/404.jpg"

const PageNotFound = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <img
              src={PageNotFoundImage}
              className="max-w-lg rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
