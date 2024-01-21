import { FC } from 'react'
import Image from 'next/image';
import style from "./fullView.module.scss"
interface FullViewImgProps {
  src: string;
  onClick: () => void
}

const FullViewImg: FC<FullViewImgProps> = ({ src, onClick }) => {
  return (
    <div className={style.fullWrapper} 
        onClick={onClick}
    > 
    <div className={style.container}>
        <div>

            <Image
                src={src}
                fill={true}
                style={{objectFit: "contain"}}
                alt='slider image'
            />
        </div>
    </div>
    </div>
  )
}

export default FullViewImg