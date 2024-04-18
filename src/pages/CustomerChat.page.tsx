import { useMutation } from "@apollo/client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import AudioRecorder from "../components/AudioRecorder";
import { QuestionResponse } from "../gql/graphql";
import { ASK_QUESTION } from "../queries/queries";

const CustomerChatPage = () => {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem("authToken") || ""
  );
  const [localAccessToken, setLocalAccessToken] = useState<string>("");
  const [startedAndLoaded, setStartedAndLoaded] = useState<boolean>(false);
  const [askQuestion, { data }] = useMutation(ASK_QUESTION);

  const [questions, setQuestions] = useState<QuestionResponse[]>([]);

  const [audioPhrase, setAudioPhrase] = useState<string>(
    "Hi, welcome to Volvo Construction Equipment Quarry. I'm Viola the digital quarry assistant, how can I be of service?"
  );

  useEffect(() => {
    if (data?.askQuestion) {
      setQuestions((prev) => [data.askQuestion, ...prev]);
      setAudioPhrase(data.askQuestion.answer);
    }
  }, [data]);

  function handleReceiveText(text: string): void {
    setAudioPhrase("Thank you, give me a couple of seconds to check on that");
    askQuestion({ variables: { input: { question: text } } });
  }

  return (
    <Container>
      {accessToken === "" && (
        <Box sx={{ boxShadow: 2, p: 2, borderRadius: 2, textAlign: "center" }}>
          <Typography variant="h4">
            Please log in to use this feature
          </Typography>
          <TextField
            label="Access Token"
            value={localAccessToken}
            onChange={(e) => setLocalAccessToken(e.target.value)}
          />
          <Button
            onClick={() => {
              localStorage.setItem("authToken", localAccessToken);
              setAccessToken(localAccessToken);
            }}
          >
            Log in
          </Button>
        </Box>
      )}
      {accessToken !== "" && (
        <Box sx={{ boxShadow: 2, p: 2, borderRadius: 2, textAlign: "center" }}>
          <Typography variant="h2">Viola</Typography>

          <AudioPlayer
            textToPlay={audioPhrase}
            setStartedAndLoaded={setStartedAndLoaded}
          />
          {startedAndLoaded && (
            <AudioRecorder handleReceiveText={handleReceiveText} />
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            {questions.map((question) => (
              <Box
                key={question.question}
                sx={{
                  backgroundColor: "lightgrey",
                  padding: "1rem",
                  borderRadius: "1rem",
                }}
              >
                <Typography variant="h4">{question.question}</Typography>
                <Typography variant="h5">{question.answer}</Typography>
              </Box>
            ))}
          </Box>
          <Button
            onClick={() => {
              localStorage.removeItem("authToken");
              setAccessToken("");
              setLocalAccessToken("");
            }}
          >
            Log out
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CustomerChatPage;
