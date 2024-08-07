import { BASE_URL } from '../../environment/environment';

// Vital Data
export async function getVitalData({ accessToken, page, query = null }) {
  const res = await fetch(
    `${BASE_URL}dentist/vital_signs?page=${page}${query ? '&q=' + query : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get Vital Data');

  const data = await res.json();
  console.log('Get Vital Data', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// SET VITAL DATA
export async function setVitalData(newVitalsObj, accessToken) {
  const res = await fetch(`${BASE_URL}dentist/vital_signs`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify(newVitalsObj),
  });

  if (!res.ok) throw new Error('Unable to set Vital data');

  const data = await res.json();
  console.log('set new VitalData:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
