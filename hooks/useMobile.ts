import { useEffect, useState } from "react";
 
const useMobile = ( breakPoint: number ) => {
    const [mobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        if (window.innerWidth < breakPoint) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            }
        }
    }, []);

    const handleResize = () => {
            if (window.innerWidth < breakPoint) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
    }

    return mobile
}
 
export default useMobile;