import React, { useState } from "react";
import { Movie } from "../models/Movie";
import { useParams } from 'react-router-dom';

export default function ShowPage(){
  const imdbId = useParams<{ imdbId: string }>().imdbId;
  return(
    <div className="w-full h-full">
      <div className="w-full h-auto mt-5 justify-center items-center">
        <DatesComponent />
      </div>
      <div className="w-full">
        This is the page of movie with imdbId: {imdbId}
      </div>
    </div>
  )
}

const DatesComponent = () => {
  const today = new Date();

  return (
    <div className="w-full flex justify-center space-x-10 ">
      {[...Array(7)].map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return <DateComponent key={i} day={date} />;
      })}
    </div>
  );
};

const DateComponent = ({ day }: { day: Date }) => {
  const [isClicked, setIsClicked] = useState(false);
  const today = new Date();
  const isToday = day.getDate() === today.getDate();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button 
      className={`w-[10%] h-20 whitespace-nowrap overflow-x-auto font-light hover:bg-blue-400 hover:text-white hover:rounded-md 
        ${isClicked ? 'bg-blue-600 text-white rounded-md' : ''}`}
      onClick={handleClick}
    >
      <p className="w-full">{isToday ? 'Today' : day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
      <p className="w-full">{`${day.toLocaleDateString('en-US', { month: 'short' })} ${day.getDate()}`}</p>
    </button>
  );
};