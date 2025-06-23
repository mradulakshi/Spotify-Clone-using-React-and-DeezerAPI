import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/deezerCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingDetails, error } = useGetSongDetailsQuery(songid);
  const { data: relatedData, isFetching: isFetchingRelated } = useGetSongRelatedQuery(songid);

  if (isFetchingDetails || isFetchingRelated) return <Loader title="Fetching song details..." />;
  if (error) return <Error />;

  const handlePauseClick = () => dispatch(playPause(false));

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedData?.data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={songData?.artist?.id} songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <p className="text-gray-400 text-base mt-4">Lyrics not available for Deezer tracks.</p>
      </div>

      <RelatedSongs
        data={relatedData?.data}
        artistId={songData?.artist?.id}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
