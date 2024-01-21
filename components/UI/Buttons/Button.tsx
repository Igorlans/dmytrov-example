import { FC, ReactNode } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { gtmService } from "@/services/gtmService";
import LoginAside from '@/components/LoginAside';
import useLoginAside from '@/context/useLoginAside';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, href, onClick }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { isOpen, setIsOpen } = useLoginAside();

    const handleClick = () => {
        if (!!onClick) {
            return onClick();
        }
        if (href) {
            router.push(href);
            return
        }
        if (session?.user) {
            router.push("/createpage")
        } else {
            setIsOpen(true)
            gtmService.unregisteredOrderClick()
        }
    }
    
  return (
    <>
        <LoginAside open={isOpen} setOpen={setIsOpen} />
        <div
            className="button customButton"
            onClick={() => handleClick()}
        >
            { children }               
        </div>
    </>
  )
}

export default Button