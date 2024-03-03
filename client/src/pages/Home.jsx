import React from 'react';
import { Head, Card, Foot } from '../components';

const Home = () => {
  return (
    <div className="max-h-screen">
      {/* <div className="bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-black via-blue-900 to-black  w-full min-h-screen text-lime-300 font-ae font-semibold flex-row justify-between items-center md:px-96 md:py-20 p-8 py-12"> */}
      <div className="bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-black via-blue-900 to-black flex flex-col justify-between min-h-screen text-lime-300 font-ae lg:px-96 lg:py-20 p-8 py-12">
        <Head />
        <Card />
        <Foot />
      </div>
    </div>
  );
};

export default Home;
