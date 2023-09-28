import Container from "@/components/Container";
import QuizButtons from "@/components/QuizButtons";
import Title from "@/components/Title";

export default function Home() {
  return (
    <Container>
      <Title>Quiz</Title>
      <p className="mx-4 text-center max-sm:mx-2">Create a quiz by pressing on the button below or enter a quiz id to take that quiz.</p>

      <QuizButtons />
    </Container>
  )
}
