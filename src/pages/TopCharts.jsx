import React from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/deezerCore';

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts" />;
  if (error || !data?.tracks) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.tracks.data.map((song, i) => (
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
            data={data.tracks.data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
