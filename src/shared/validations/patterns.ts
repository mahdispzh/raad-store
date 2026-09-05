export const Patterns = {
  onlyLetters: /^[A-Za-z\u0600-\u06FF\s]+$/,
  phoneNumber: /^9\d{9}$/,
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  nationalCode: /^[0-9]{10}$/,
  shaba: /^IR[0-9]{24}$/i,
  bankAccount: /^[0-9]{16}$/,
  postalCode: /^[0-9]{10}$/,
  onlyNumbers: /^[0-9]+$/,
  alphanumeric: /^[A-Za-z0-9\u0600-\u06FF]+$/,
  otpCode: /^[0-9]{6}$/,
  cardNumber: /^[0-9]{16}$/,
    pelak: /^[0-9]{1,5}$/, 
 province: /^[A-Za-z\u0600-\u06FF\s]+$/,
  city: /^[A-Za-z\u0600-\u06FF\s]+$/
};
