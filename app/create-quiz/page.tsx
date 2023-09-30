import Container from "@/components/Container";
import Title from "@/components/Title";
import NewQuizForm from "@/components/NewQuizForm";

import { currentUser, SignIn } from "@clerk/nextjs";

export default async function CreateQuiz() {

  const user = await currentUser();

  if(!user) {
    return (
      <Container>
        <Title>Create Quiz</Title>
        <p>You need to sign it to create a quiz</p>
        <SignIn afterSignInUrl={'/create-quiz'} />
      </Container>
    )
  } else {

    return (
      <Container>
        <Title>Create Quiz</Title>
        <NewQuizForm URL={process.env.URL ?? 'https://chill31-quiz.vercel.app'} />
      </Container>
    )

  }

}