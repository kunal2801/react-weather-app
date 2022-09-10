import React from "react";

const Topbtns = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Sydney",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Delhi",
    },
    {
      id: 5,
      title: "Paris",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => {
        return (
          <button
            key={city.id}
            className=" text-white text-lg font-medium transition ease-out hover:scale-125"
            onClick={() => setQuery({ q: city.title })}
          >
            {city.title}
          </button>
        );
      })}
    </div>
  );
};

export default Topbtns;
