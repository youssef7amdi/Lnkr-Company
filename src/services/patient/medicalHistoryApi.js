import { BASE_URL } from '../../environment/environment';

// Medical History
export async function getMedicalHistory({ accessToken, page, query = null }) {
  const res = await fetch(
    `${BASE_URL}dentist/medical_history?page=${page}${query ? '&q=' + query : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get Medical History');

  const data = await res.json();
  console.log('Get Medical History', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

export async function getMedicalAssets(accessToken) {
  const res = await fetch(`${BASE_URL}assets/medical_history`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Unable to get Medical Assets');

  const data = await res.json();
  console.log('Get Medical Assets', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// SET MEDICAL HISTORY
export async function setMedicalHistory(newHistoryObj, accessToken) {
  const res = await fetch(`${BASE_URL}dentist/medical_history`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify(newHistoryObj),
  });

  if (!res.ok) throw new Error('Unable to set medical History');

  const data = await res.json();
  console.log('set new medicalHistory:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
