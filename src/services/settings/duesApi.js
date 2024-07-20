import { BASE_URL } from '../../environment/environment';

// Dues
export async function getDues({ accessToken }) {
  const res = await fetch(`${BASE_URL}clinic/loggedin/dues`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Unable to get dues');

  const data = await res.json();
  console.log('Get Dues', data);

  if (!data.success) throw new Error(data.message);

  return data;
}
