import Container from "@/components/Container";
import QuizCard from "@/components/QuizCard";
import Title from "@/components/Title";

export default async function Quiz({ params }: { params: { id: string } }) {

  const res = await fetch('http://localhost:3000/api/data', {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({ id: params.id }),
  });
  const recieved = await res.json();

  const {quiz, questions, options} = recieved;

  return (
    <Container>
      <Title>{quiz.title}</Title>
      <QuizCard questions={questions} options={options} quiz={quiz}></QuizCard>
    </Container>
  )
}