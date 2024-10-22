import React from 'react';

const RewardCard = ({ image, name, points }) => {
  return (
    <div className="bg-n-7 shadow-lg rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Card Image */}
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-t-lg" />
      
      {/* Card Content */}
      <div className="py-4">
        <h3 className="h3 text-color-1 mb-2">{name}</h3>
        <p className="body-1 text-n-3 mb-4">Redeem for {points} points</p>
        <button className="bg-gradient-to-r from-color-1 to-color-5 text-white px-4 py-2 rounded-md font-bold uppercase hover:bg-color-2">
          Redeem Now
        </button>
      </div>
    </div>
  );
};

const RewardsPage = () => {
  const user = {
    credits: 150,
  };

  const rewards = [
    { image: 'https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Keyboard', points: 50 },
    { image: 'https://images.pexels.com/photos/3766257/pexels-photo-3766257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Bottle', points: 30 },
    { image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Mouse', points: 40 },
    { image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpKfD7DZWxyKvY9vq8-c896gsKQlVA7Mf_icjE9vjOpPC6vdsEbFPL_v0q7HjLzdS65vfRHq2TeQdYVIbZNG_IlPnCUKPopfM6xypNsTYR4vp4aOhJehK5GX5DRRG6ic3wpkNtVBvIzEMcRnGqFXYBPb2JWGc6a1fttJ4r57gABOn_etM-QkC9pyN7/s1600/argentina-2022-world-cup-away-kit-6.jpg', name: 'T-Shirt', points: 100 },
    { image: 'https://m.media-amazon.com/images/I/51FuoR3MLUL._SX679_.jpg', name: 'Bag', points: 80 },
    { image: 'https://images.pexels.com/photos/816527/pexels-photo-816527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Diary', points: 20 },
  ];

  return (
    <div className="container mt-10">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="h1 text-color-1">Rewards</h1>
        <div className="bg-color-1 text-white px-6 py-2 rounded-full">
          <p className="body-1">Credits: <span className="font-bold">{user.credits}</span></p>
        </div>
      </div>

      {/* Rewards Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rewards.map((reward, index) => (
          <RewardCard key={index} image={reward.image} name={reward.name} points={reward.points} />
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;
