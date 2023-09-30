import { Input, Textarea } from "@nextui-org/input";
type Variant = "flat" |"bordered" | "underlined" | "faded";

export default function QuizInput({ size, className, label, placeholder, value, onInput, type, textarea = false, variant = 'bordered' }: { size?: 'lg' | 'md' | 'sm', className?: string, label?: string, placeholder?: string, value: string, onInput?: (e: any) => void, type?: 'number' | 'text' | 'password', textarea?: boolean, variant?: Variant }) {

  if(textarea) {
    return <Textarea className={`${className} w-[25rem] max-w-[92%]`} label={label} placeholder={placeholder ? placeholder : ''} size={size ? size : 'md'} value={value} onInput={onInput} variant={variant} />
  }

  return <Input className={`${className} w-[25rem] max-w-[92%]`} label={label} placeholder={placeholder ? placeholder : ''} size={size ? size : 'md'} value={value} onInput={onInput} type={type ? type : 'text'} variant={variant} />

}