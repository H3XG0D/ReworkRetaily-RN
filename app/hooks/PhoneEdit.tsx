export const PhoneEdit = (phone: string) => {
  const userNumber = phone
    .replace(' ', '')
    .replace('-', '')
    .replace('-', '')
    .replace('(', '')
    .replace(')', '');

  phone = userNumber;
  return phone;
};
