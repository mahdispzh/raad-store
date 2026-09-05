import { z } from "zod";
import { Patterns } from "./patterns";

export const Rules = {
  phone: z
    .string()
    .nonempty("شماره تلفن الزامی است")
    .length(10, "شماره تلفن باید 10 رقم باشد")
    .regex(Patterns.phoneNumber, "شماره تلفن معتبر نیست"),

  email: z.string().regex(Patterns.email, "ایمیل معتبر نیست"),

  nationalCode: z
    .string()
    .length(10, "کد ملی باید 10 رقم باشد")
    .regex(Patterns.nationalCode, "کد ملی باید 10 رقم باشد"),

  name: z
    .string()
    .min(2, "نام باید حداقل 2 حرف باشد")
    .max(50, "نام باید حداکثر 50 حرف باشد")
    .regex(Patterns.onlyLetters, "نام باید فقط شامل حروف باشد"),

  otpCode: z
    .string()
    .length(4, "کد تایید باید 4 رقم باشد")
    .regex(/^\d{4}$/, "کد تایید باید 4 رقم باشد"),

  cardNumber: z
    .string()
    .length(16, "شماره کارت باید 16 رقم باشد")
    .regex(Patterns.cardNumber, "شماره کارت باید 16 رقم باشد"),

  shaba: z.string().regex(Patterns.shaba, "شماره شبا معتبر نیست"),

  bankAccount: z
    .string()
    .length(16, "شماره حساب باید 16 رقم باشد")
    .regex(Patterns.bankAccount, "شماره حساب معتبر نیست"),

  postalCode: z
    .string()
    .length(10, "کد پستی باید 10 رقم باشد")
    .regex(Patterns.postalCode, "کد پستی معتبر نیست"),

  onlyNumbers: z
    .string()
    .regex(Patterns.onlyNumbers, "فقط می‌تواند شامل اعداد باشد"),

  alphanumeric: z
    .string()
    .regex(Patterns.alphanumeric, "فقط می‌تواند شامل حروف و اعداد باشد"),

  text: z.string().min(3, "حداقل 3 کاراکتر").max(500, "حداکثر 500 کاراکتر"),
  pelak: z
    .string()
    .min(1, "پلاک حداقل ۱ رقم است")
    .max(5, "پلاک حداکثر ۵ رقم است")
    .regex(Patterns.pelak, "پلاک باید عدد باشد"),
     province: z
    .string()
    .min(1, "انتخاب استان الزامی است")
    .regex(Patterns.onlyLetters, "استان باید فقط شامل حروف باشد"),

  city: z
    .string()
    .min(1, "انتخاب شهر الزامی است")
    .regex(Patterns.onlyLetters, "شهر باید فقط شامل حروف باشد"),

  address: z
    .string()
    .min(5, "آدرس باید حداقل ۵ کاراکتر باشد")
    .max(500, "آدرس حداکثر ۵۰۰ کاراکتر است"),
      addressname: z
    .string()
    .min(4, "نام ادرس  باید حداقل 4 کاراکتر باشد")
    .max(10, "نام آدرس حداکثر 10 کاراکتر است"),
};
