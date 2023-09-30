import Button from "@/components/Button";
import Container from "@/components/Container";
import QuizButtons from "@/components/QuizButtons";
import SignOutButton from "@/components/SignOutButton";
import Title from "@/components/Title";

import {UserButton, UserProfile} from '@clerk/nextjs';
import Link from "next/link";
import { BsPlus } from "react-icons/bs";

export default function Dashboard() {


  return (
    <Container>
      <Title>Dashboard</Title>
      <QuizButtons dashboard={true} />
      <SignOutButton />
      <UserProfile  />
    </Container>
  )

}