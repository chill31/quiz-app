import { Button as Btn } from "@nextui-org/button";
type BtnColor = 'default' | 'primary' | 'success' | 'warning' | 'secondary' | 'danger';

export default function Button({ children, onPress = () => {}, className, color = 'default', tabIndex = 0, isLoading = false }: { children?: React.ReactNode, onPress?: () => void, className?: string, tabIndex?: any, color?: BtnColor, isLoading?: boolean }) {
  return <Btn onPress={onPress} className={className} radius={'sm'} color={color} tabIndex={tabIndex} isLoading={isLoading}>{children}</Btn>
}