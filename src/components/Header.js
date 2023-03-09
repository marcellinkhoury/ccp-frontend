import React from "react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3">
      <div className=" mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-sky-700 font-semibold text-xl uppercase">
              Contact Center Dashboard
            </h1>
          </div>
          <div className="flex items-center">
            <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-sm uppercase font-medium">
              Nouveau Compte
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
