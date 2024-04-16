import { useMutation } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { QuestionResponse } from "../gql/graphql";
import { ASK_QUESTION } from "../queries/queries";
import { useEffect, useState } from "react";
import AudioRecorder from "../components/AudioRecorder";
import AudioPlayer from "../components/AudioPlayer";

const CustomerChatPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState("");

  const [askQuestion, { data, loading }] = useMutation(ASK_QUESTION);

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

  function handleSend(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    setAudioPhrase("Thank you, give me a couple of seconds to check on that");
    askQuestion({ variables: { input: { question: currentQuestion } } });
    setCurrentQuestion("");
  }

  function handleReceiveText(text: string): void {
    setAudioPhrase("Thank you, give me a couple of seconds to check on that");
    askQuestion({ variables: { input: { question: text } } });
  }

  return (
    <Container>
      <Typography variant="h2">Customer</Typography>
      <AudioPlayer textToPlay={audioPhrase} />
      <AudioRecorder handleReceiveText={handleReceiveText} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2",
          marginTop: "2rem",
        }}
      >
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={currentQuestion}
          onChange={(e) => {
            setCurrentQuestion(e.currentTarget.value);
          }}
        />
        <LoadingButton loading={loading} onClick={(e) => handleSend(e)}>
          Send
        </LoadingButton>
      </Box>
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
    </Container>
  );
};

export default CustomerChatPage;
