import { Button as Btn } from "@nextui-org/react";

export default function Button({ children, onPress = () => {}, className, tabIndex }: { children?: React.ReactNode, onPress?: () => void, className?: string, tabIndex?: any }) {
  return <Btn onPress={onPress} className={className} radius={'sm'}>{children}</Btn>
}