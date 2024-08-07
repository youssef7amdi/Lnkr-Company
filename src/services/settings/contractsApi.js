import { BASE_URL } from '../../environment/environment';

// Contracts
export async function getContracts({ accessToken, page, query = null }) {
  const res = await fetch(
    `${BASE_URL}clinic/loggedin/pricing?page=${page}${query ? '&q=' + query : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get Contracts');

  const data = await res.json();
  console.log('Get Contracts', data);

  if (!data.success) throw new Error(data.message);

  return data;
}
