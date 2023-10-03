export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h1 className={`text-h1 text-center font-extrabold mt-12 max-sm:text-[3.4rem] max-sm:mt-16 overflow-clip w-[98%] ${className}`}>{children}</h1>  
}