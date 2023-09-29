import { Input } from "@nextui-org/react";

export default function QuizInput({ size, className, label, placeholder, value, onInput, type }: { size?: 'lg' | 'md' | 'sm', className?: string, label?: string, placeholder?: string, value: string, onInput?: (e: any) => void, type?: 'number' | 'text' | 'password'}) {

  return <Input className={`${className} w-[25rem] max-w-[95vw]`} label={label} placeholder={placeholder ? placeholder : ''} size={size ? size : 'md'} value={value} onInput={onInput} type={type ? type : 'text'} />

}