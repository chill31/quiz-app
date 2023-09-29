import Button from "@/components/Button";
import Container from "@/components/Container";
import SignOutButton from "@/components/SignOutButton";
import Title from "@/components/Title";

import {UserButton, UserProfile} from '@clerk/nextjs';

export default function Dashboard() {


  return (
    <Container>
      <Title>Dashboard</Title>
      <SignOutButton />
      <UserProfile  />
    </Container>
  )

}