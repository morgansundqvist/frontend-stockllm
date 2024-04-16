import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { BackendHost } from "../config/config";

interface IProps {
  handleReceiveText: (text: string) => void;
}

function AudioRecorder(props: IProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaRecorder]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let audioChunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => audioChunks.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        audioChunks = []; // Reset chunks for the next recording

        // Here you would send the blob to your server
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.webm");

        let token = localStorage.getItem("authToken");

        fetch(BackendHost + "/upload", {
          method: "POST",
          body: formData,
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            props.handleReceiveText(data.text);
          })
          .catch((error) => console.error("Error:", error));
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the microphone", error);
    }
  };

  const stopRecording = () => {
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    setIsRecording(false);
  };

  return (
    <Box>
      <Button onClick={startRecording} disabled={isRecording}>
        Start recording
      </Button>
      <Button onClick={stopRecording} disabled={!isRecording}>
        Stop recording
      </Button>
    </Box>
  );
}

export default AudioRecorder;
