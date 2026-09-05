const KAVENEGAR_ERROR_MESSAGES: Record<number, string> = {
  418: "اعتبار حساب کاوه‌نگار کافی نیست",
  422: "داده‌ها به دلیل وجود کاراکتر نامناسب قابل پردازش نیست",
  424: "الگوی پیامک پیدا نشد یا هنوز تایید نشده است",
  426: "استفاده از این متد نیازمند سرویس پیشرفته است",
  428: "ارسال کد از طریق تماس تلفنی امکان‌پذیر نیست",
  431: "ساختار کد صحیح نیست",
  432: "پارامتر %token% در متن الگو تعریف نشده است",
  607: "نام تگ انتخابی اشتباه است",
};

export async function sendOtpSms(phone: string, code: string): Promise<void> {
  const apiKey = process.env.KAVENEGAR_API_KEY!;
  const template = process.env.KAVENEGAR_TEMPLATE!;

  const url = new URL(
    `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json`,
  );
  url.searchParams.set("receptor", phone);
  url.searchParams.set("token", code);
  url.searchParams.set("template", template);

  const res = await fetch(url.toString());
  const data = await res.json();

  console.log("📩 پاسخ کامل کاوه‌نگار:", JSON.stringify(data, null, 2));

  const status = data?.return?.status;

  if (status !== 200) {
    const message =
      KAVENEGAR_ERROR_MESSAGES[status] ||
      data?.return?.message ||
      `خطای ناشناخته (${status})`;
    throw new Error(`Kavenegar: ${message}`);
  }
}
