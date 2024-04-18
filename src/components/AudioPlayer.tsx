import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BackendHost } from "../config/config";

interface IProps {
  textToPlay: string;
  setStartedAndLoaded: (startedAndLoaded: boolean) => void;
}

const AudioPlayer = (props: IProps) => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [localTextToPlay, setLocalTextToPlay] = useState<string>("");
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the MP3 file URL from the API
    if (props.textToPlay !== "" && props.textToPlay !== localTextToPlay) {
      const fetchAudio = async () => {
        try {
          let token = localStorage.getItem("authToken");

          const response = await fetch(BackendHost + "/textToSpeech", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify({ text: props.textToPlay }),
          });
          //data is a mp3 file
          const data = await response.blob();
          const url = URL.createObjectURL(data);
          setAudioSrc(url);
          setLocalTextToPlay(props.textToPlay);
        } catch (error) {
          console.error("Failed to fetch audio:", error);
        }
      };

      fetchAudio();
    }
  }, [props.textToPlay]);

  useEffect(() => {
    if (isStarted && audioSrc && audioRef.current) {
      const playAudio = async () => {
        if (audioRef.current) {
          try {
            await audioRef.current.play();
          } catch (err) {
            console.error("Auto-play failed", err);
          }
        }
      };
      playAudio();
    }
  }, [isStarted]);

  useEffect(() => {
    if (audioSrc) {
      setButtonEnabled(true);
      props.setStartedAndLoaded(true);
    }
    if (isStarted && audioSrc && audioRef.current) {
      const playAudio = async () => {
        if (audioRef.current) {
          try {
            await audioRef.current.play();
          } catch (err) {
            console.error("Auto-play failed", err);
          }
        }
      };
      playAudio();
    }
  }, [audioSrc]);

  return (
    <Box>
      <Button
        onClick={() => {
          setIsStarted(true);
          setButtonEnabled(false);
        }}
        disabled={!buttonEnabled}
      >
        Play
      </Button>
      {audioSrc && <audio ref={audioRef} src={audioSrc} />}
    </Box>
  );
};

export default AudioPlayer;
