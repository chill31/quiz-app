import Container from '@/components/Container';
import QuizCard from '@/components/QuizCard';
import Title from '@/components/Title';

export default async function Quiz({ params }: { params: { id: string } }) {

  const res = await fetch(process.env.URL + '/api/data', {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({ id: params.id }),
  });
  const recieved = await res.json();


  const {quiz, questions} = recieved;
  if(!quiz || !questions) {
    return (
      <Container>
        <Title>404</Title>
        <p className="text-center mx-4">quiz not found. Ask the person who sent you this quiz id for a new or correct one.</p>
      </Container>
    )
  }

  return (
    <Container>
      <Title>{quiz.title}</Title>
      <QuizCard questions={questions} quiz={quiz} URL={process.env.URL ?? 'https://chill31-quiz.vercel.app'}></QuizCard>
    </Container>
  )
}