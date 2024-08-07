import { BASE_URL } from '../../environment/environment';

// reports

export async function getLabs({ accessToken, page, query = null, type }) {
  const res = await fetch(
    `${BASE_URL}dentist/lab_${type}?page=${page}${query ? '&q=' + query : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get labResults');

  const data = await res.json();
  console.log('Get Lab Results', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// get lab assets
export async function getLabAssets({ category, accessToken }) {
  const res = await fetch(
    `${BASE_URL}assets/lab/service?category=${category ? category : 'all'}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get category lab');

  const data = await res.json();
  console.log('Get Category lab', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// set reports
export async function requestLab(newLabObj, accessToken) {
  const res = await fetch(`${BASE_URL}dentist/lab_request`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify(newLabObj),
  });

  if (!res.ok) throw new Error('Unable to request Lab');

  const data = await res.json();
  console.log('request new Lab:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
