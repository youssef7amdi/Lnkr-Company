import { BASE_URL } from '../../environment/environment';

// Visits
export async function getVisits({ accessToken, page = 1, query = null }) {
  const res = await fetch(
    `${BASE_URL}clinic/loggedin/visit?page=${page}${query ? '&q=' + query : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get Visits');

  const data = await res.json();
  console.log('Get Visits', data);

  if (!data.success) throw new Error(data.message);

  return data;
}
