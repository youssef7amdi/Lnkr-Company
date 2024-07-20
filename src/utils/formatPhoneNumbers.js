export function formatPhoneNumber(phoneNumberString) {
  return phoneNumberString.replace(
    /(\d{3,5})(\d{4})(\d{3})(\d{3,4})/,
    '$1 $2 $3 $4',
  );
}
