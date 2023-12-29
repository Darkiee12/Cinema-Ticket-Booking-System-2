import React from 'react';
import { useParams } from 'react-router-dom';

export default function Booking(){
  const showId = useParams<{ showId: string }>().showId;
  const [seats, setSeats] = React.useState<string[]>([]);
  console.log(showId);

  return (
    <div>
      <h1>Booking</h1>
      <p>Show ID: {showId}</p>
    </div>
  );
};
