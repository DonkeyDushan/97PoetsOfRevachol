// eslint-disable-next-line import/no-extraneous-dependencies
import { PauseCircle, PlayArrowRounded } from '@mui/icons-material';
import { Checkbox, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';

type Types = {
  text: string;
  checked: boolean;
  /*  check: (checked: string) => void; */
  onClick: () => void;
  audio: HTMLAudioElement;
};

const AudioButton = ({ text, checked, onClick, audio }: Types) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [paused, setPaused] = useState(true);

  const start = () => {
    audio.play();
  };
  const pause = () => {
    audio.pause();
  };
  /*   const stop = () => {
    audio.pause();
    audio.currentTime = 0;
  }; */

  return (
    <Stack justifyContent={'center'} color={'#000'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <span>
          <Checkbox checked={checked} onClick={onClick} />
          {text}
        </span>

        <IconButton
          onClick={() => {
            if (!audio.paused) {
              pause();
              setPaused(true);
            } else {
              start();
              setPaused(false);
            }
          }}
        >
          {paused ? <PlayArrowRounded fontSize={'large'} /> : <PauseCircle fontSize={'large'} />}
        </IconButton>
        {/*  {!paused && (
          <IconButton
            onClick={() => {
              setPaused(true);
              stop();
            }}
          >
            <StopCircleRounded fontSize={'large'} />
          </IconButton>
        )} */}
      </Stack>
    </Stack>
  );
};

export default AudioButton;
