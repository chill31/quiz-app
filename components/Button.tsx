import { Button as Btn } from "@nextui-org/react";

export default function Button({ children, onPress = () => {}, className }: { children?: React.ReactNode, onPress?: () => void, className?: string }) {
  return <Btn onPress={onPress} className={className} radius={'sm'}>{children}</Btn>
}