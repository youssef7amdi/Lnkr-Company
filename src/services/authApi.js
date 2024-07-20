import { BASE_URL } from '../environment/environment';

// LOG IN
export async function login({ mobile, password }) {
  const res = await fetch(`${BASE_URL}dentist/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ mobile, password }),
  });

  if (!res.ok) throw new Error('Unable to Log In');

  const data = await res.json();
  console.log('login', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// SIGN UP
export async function signUp(signUpObject) {
  const res = await fetch(`${BASE_URL}dentist/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(signUpObject),
  });

  if (!res.ok) throw new Error('Unable to Sign Up');

  const data = await res.json();
  console.log('signUp', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// GET SPECIALTY LIST
export async function getSpecialtyList() {
  const res = await fetch(`${BASE_URL}assets/physician/specialty_signup`);

  if (!res.ok) throw new Error('Unable to fetch Specialty List');

  const data = await res.json();
  console.log('Specialty List', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// CHOOSE CLINIC
export async function chooseClinic(clinicObject, accessToken) {
  const res = await fetch(`${BASE_URL}clinic/chosen_clinic`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify(clinicObject),
  });

  if (!res.ok) throw new Error('Unable to Choose Clinic');

  const data = await res.json();
  console.log('choose Clinic', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
