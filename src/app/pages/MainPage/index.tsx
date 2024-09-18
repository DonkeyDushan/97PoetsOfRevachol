/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import styles from './index.module.css';
import AudioButton from 'app/components/AudioButton';
import { PauseCircle, PlayArrowRounded, RestartAltRounded } from '@mui/icons-material';

export const MainPage = () => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Funk
  const bass1 = useMemo(() => new Audio(`Funk_Bass1.wav`), []);
  const bass2 = useMemo(() => new Audio(`Funk_Bass2.wav`), []);
  const drums1 = useMemo(() => new Audio(`Funk_Drumz1.wav`), []);
  const drums2 = useMemo(() => new Audio(`Funk_Drumz2.wav`), []);
  const drums3 = useMemo(() => new Audio(`Funk_Drumz3.wav`), []);
  const keys1 = useMemo(() => new Audio(`Funk_Keys1.wav`), []);
  const keys2 = useMemo(() => new Audio(`Funk_Keys2.wav`), []);
  const keys3 = useMemo(() => new Audio(`Funk_Keys3.wav`), []);
  // Anodic
  const arp1 = useMemo(() => new Audio(`Anodic_Arp1.wav`), []);
  const arp2 = useMemo(() => new Audio(`Anodic_Arp2.wav`), []);
  const arp3 = useMemo(() => new Audio(`Anodic_Arp3.wav`), []);
  const anodicDrums1 = useMemo(() => new Audio(`Anodic_Drums1.wav`), []);
  const anodicDrums2 = useMemo(() => new Audio(`Anodic_Drums2.wav`), []);
  const anodicDrums3 = useMemo(() => new Audio(`Anodic_Drums3.wav`), []);
  const pad1 = useMemo(() => new Audio(`Anodic_Pad1.wav`), []);
  const pad2 = useMemo(() => new Audio(`Anodic_Pad2.wav`), []);
  const pad3 = useMemo(() => new Audio(`Anodic_Pad3.wav`), []);

  const bassList = useMemo(
    () => [
      { text: 'Funk Bass 1', src: 'Funk_Bass1', audio: bass1 },
      { text: 'Funk Bass 2', src: 'Funk_Bass2', audio: bass2 },
    ],
    [bass1, bass2],
  );
  const drumsList = useMemo(
    () => [
      { text: 'Funk Drums 1', src: 'Funk_Drumz1', audio: drums1 },
      { text: 'Funk Drums 2', src: 'Funk_Drumz2', audio: drums2 },
      { text: 'Funk Drums 3', src: 'Funk_Drumz3', audio: drums3 },
      { text: 'Anodic Drums 1', src: 'Anodic_Drums1', audio: anodicDrums1 },
      { text: 'Anodic Drums 2', src: 'Anodic_Drums2', audio: anodicDrums2 },
      { text: 'Anodic Drums 3', src: 'Anodic_Drums3', audio: anodicDrums3 },
    ],
    [drums1, drums2, drums3, anodicDrums1, anodicDrums2, anodicDrums3],
  );
  const keysList = useMemo(
    () => [
      { text: 'Funk Keys 1', src: 'Funk_Keys1', audio: keys1 },
      { text: 'Funk Keys 2', src: 'Funk_Keys2', audio: keys2 },
      { text: 'Funk Keys 3', src: 'Funk_Keys3', audio: keys3 },
    ],
    [keys1, keys2, keys3],
  );
  const arpList = useMemo(
    () => [
      { text: 'Anodic Arp 1', src: 'Anodic_Arp1', audio: arp1 },
      { text: 'Anodic Arp 2', src: 'Anodic_Arp2', audio: arp2 },
      { text: 'Anodic Arp 3', src: 'Anodic_Arp3', audio: arp3 },
    ],
    [arp1, arp2, arp3],
  );
  const padList = useMemo(
    () => [
      { text: 'Anodic Pad 1', src: 'Anodic_Pad1', audio: pad1 },
      { text: 'Anodic Pad 2', src: 'Anodic_Pad2', audio: pad2 },
      { text: 'Anodic Pad 3', src: 'Anodic_Pad3', audio: pad3 },
    ],
    [pad1, pad2, pad3],
  );

  const getAllAudio = () => {
    const checked = [
      ...bassList.filter((item) => checkedValues.includes(item.src)),
      ...keysList.filter((item) => checkedValues.includes(item.src)),
      ...drumsList.filter((item) => checkedValues.includes(item.src)),
      ...arpList.filter((item) => checkedValues.includes(item.src)),
      ...padList.filter((item) => checkedValues.includes(item.src)),
    ];
    const checkedAudio = checked.map((item) => item.audio);
    return checkedAudio;
  };

  const allAudio = useMemo(
    () => getAllAudio(),
    [bassList, drumsList, keysList, arpList, padList, checkedValues],
  );

  const playAll = () => {
    allAudio.forEach((audio) => {
      audio?.play();
    });

    setIsPlaying(true);
  };

  useEffect(() => {
    if (allAudio.filter((n) => n).length === 0) {
      setIsPlaying(false);
    } /* else if (isPlaying) playAll(); */
  }, [allAudio]);

  const stopAll = () => {
    allAudio.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const handleCheck = ({
    key,
    audio,
    values = checkedValues,
    setValues = setCheckedValues,
  }: {
    key: string;
    audio: HTMLAudioElement;
    values?: string[];
    setValues?: (values: string[]) => void;
  }) => {
    if (values.includes(key)) {
      const newValues = values.filter((v: string) => v !== key);
      setValues(newValues);
      audio.pause();
      audio.currentTime = 0;
    } else {
      setValues([...values, key]);
      const playingAudio = allAudio.find((a) => !a.paused);
      const currentTime = playingAudio ? playingAudio.currentTime : 0;
      audio.currentTime = currentTime;
      if (isPlaying) {
        audio.play();
      }
    }
  };

  const handleLoopAudio = (audio: HTMLAudioElement) => {
    audio.addEventListener('ended', () => {
      console.log(audio.src, 'ended');
      audio.currentTime = 0; // Reset to the beginning
      audio.play(); // Play again
    });
  };
  bassList.forEach(({ audio }) => handleLoopAudio(audio));
  drumsList.forEach(({ audio }) => handleLoopAudio(audio));
  keysList.forEach(({ audio }) => handleLoopAudio(audio));
  arpList.forEach(({ audio }) => handleLoopAudio(audio));
  padList.forEach(({ audio }) => handleLoopAudio(audio));

  const saveCheckedValuesToLocalStorage = () => {
    localStorage.setItem('checkedAudioValues', JSON.stringify(checkedValues));
  };
  const loadCheckedValuesFromLocalStorage = () => {
    setCheckedValues([]);
    stopAll();
    setIsPlaying(false);
    const savedValues = JSON.parse(localStorage.getItem('checkedAudioValues') || '');
    setCheckedValues(savedValues || []);
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.window}>
        <Box className={styles.header}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            {'Audio mixing tool'}
            <Stack direction={'row'} gap={'24px'}>
              <Button onClick={saveCheckedValuesToLocalStorage}>Save</Button>
              <Button onClick={loadCheckedValuesFromLocalStorage}>Load saved mix</Button>
            </Stack>
          </Stack>
        </Box>
        <Box className={styles.content}>
          <Box className={styles.grid}>
            {drumsList.map(({ text, src, audio }) => (
              <AudioButton
                key={src}
                text={text}
                checked={checkedValues.includes(src)}
                audio={audio}
                onClick={() => handleCheck({ key: src, audio: audio })}
              />
            ))}
          </Box>
          <Box className={styles.grid}>
            {bassList.map(({ text, src, audio }) => (
              <AudioButton
                key={src}
                text={text}
                audio={audio}
                checked={checkedValues.includes(src)}
                onClick={() => handleCheck({ key: src, audio: audio })}
              />
            ))}
          </Box>
          <Box className={styles.grid}>
            {keysList.map(({ text, src, audio }) => (
              <AudioButton
                key={src}
                text={text}
                audio={audio}
                checked={checkedValues.includes(src)}
                onClick={() => handleCheck({ key: src, audio: audio })}
              />
            ))}
          </Box>
          <Box className={styles.grid}>
            {arpList.map(({ text, src, audio }) => (
              <AudioButton
                key={src}
                text={text}
                audio={audio}
                checked={checkedValues.includes(src)}
                onClick={() => handleCheck({ key: src, audio: audio })}
              />
            ))}
          </Box>
          <Box className={styles.grid}>
            {padList.map(({ text, src, audio }) => (
              <AudioButton
                key={src}
                text={text}
                audio={audio}
                checked={checkedValues.includes(src)}
                onClick={() => handleCheck({ key: src, audio: audio })}
              />
            ))}
          </Box>
          <Stack direction={'row'} justifyContent={'center'} sx={{ padding: '12px' }}>
            <IconButton
              onClick={() => {
                if (isPlaying) {
                  stopAll();
                  setIsPlaying(false);
                } else {
                  playAll();
                }
              }}
              sx={{ width: 'fit-content' }}
            >
              {isPlaying ? (
                <PauseCircle fontSize={'large'} />
              ) : (
                <PlayArrowRounded fontSize={'large'} />
              )}
            </IconButton>

            <IconButton
              onClick={() => {
                setCheckedValues([]);
                stopAll();
              }}
              sx={{ width: 'fit-content' }}
            >
              {<RestartAltRounded fontSize={'large'} />}
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
