import { BASE_URL } from '../../environment/environment';

// SEARCH PATIENT
export async function searchPatient(searchData, accessToken) {
  const res = await fetch(
    `${BASE_URL}dentist/search_patient?${searchData.label}=${searchData.value}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to search Patient');

  const data = await res.json();
  console.log('Search Patient', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

//GET SERVICE
export async function getServices(accessToken) {
  const res = await fetch(`${BASE_URL}clinic/patient_service`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Unable to search Patient');

  const data = await res.json();
  console.log('Get Service', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// CHOOSE SERVICE
export async function chooseService(serviceObject, accessToken) {
  const res = await fetch(`${BASE_URL}dentist/visit/walk-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify(serviceObject),
  });

  if (!res.ok) throw new Error('Unable to Access Profile');

  const data = await res.json();
  console.log('choose Service', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
