import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { Post, Review } from "@prisma/client";
interface IRatingProps {
    item: Post & {Review: Review[]};
    readOnly: boolean;
}

export default function BasicRating( {item, readOnly }: IRatingProps) {
   const rating= item?.Review?.reduce((acc, item) => acc + item?.rating, 0) / item?.Review?.length
    const roundedRating = Number(rating.toFixed(1))
    const ratesNum = item?.Review?.length;
  const [value, setValue] = useState(roundedRating || rating || 0);
   const postId = item.id
  const { t } = useTranslation()
    const handleChange = async ( newValue: number) => {
        try {
            await toast.promise(
                fetch("/api/rating", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ rating: newValue, postId })
                }),
                {
                    loading: `${t("validation:reviewSaving")}...`,
                    success: (res) => {
                        if (!res.ok) throw new Error(res.statusText)
                        return `${t("validation:thanksForReview")}`
                    },
                    error: (err) => `${t("validation:error")}: ${err.message}`,
                }
            )
        } catch (e) {
            console.log(e);
        }
    };

  return (
    <div
        style={{alignSelf: "flex-start", paddingBottom: 20, width: "fit-content", display: "flex", flexDirection: 'column', gap: "8px"}}
    >
      <Rating
        name="half-rating"
        value={value}
        precision={0.5}
        readOnly={ readOnly }
        onChange={(event, newValue) => {
            if (newValue) {
                setValue(newValue);
                handleChange(newValue)
            }
        }}
      />
        {ratesNum ?
            <div style={{fontSize: 12, color: '#9f9e9e'}}>
                { ratesNum + ` ${t('common:rates')}`}
            </div>
            : null
        }

    </div>
  );
}