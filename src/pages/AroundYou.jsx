import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/deezerCore'; // Make sure you created this endpoint

const CountryTracks = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    axios
      .get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`)
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  if (isFetching || loading) return <Loader title="Loading songs around you..." />;
  if (error || !data?.data) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.data.map((song, i) => (
          <SongCard
            key={song.id}
            song={{
              ...song,
              title: song.title,
              subtitle: song.artist.name,
              images: {
                coverart: song.album.cover_medium,
              },
            }}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data.data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
