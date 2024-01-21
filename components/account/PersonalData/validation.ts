import { z } from "zod";


export const personalDataValidationSchema = z.object({
    name: z.string().nonempty("Поле обов'язкове"),
    surname: z.string().nonempty("Поле обов'язкове"),
    fatherName: z.string().optional(),
    phone: z.string().regex(new RegExp(/^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/), "Неправильний формат"),
    skype: z.string().optional()
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().nonempty("Поле обов'язкове").min(8, "Мінімум 8 символів"),
    newPassword: z.string().nonempty("Поле обов'язкове").min(8, "Мінімум 8 символів")
});

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;