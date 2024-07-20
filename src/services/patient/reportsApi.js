import { BASE_URL } from '../../environment/environment';

// reports

export async function getReports({ accessToken, page = 1, query = null }) {
  const res = await fetch(
    `${BASE_URL}dentist/report?page=${page}${query ? '&q=' + query : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get reports');

  const data = await res.json();
  console.log('Get Report', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// set reports
export async function setReport(newReportObj, accessToken) {
  const res = await fetch(`${BASE_URL}dentist/report`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },

    body: newReportObj,
  });

  if (!res.ok) throw new Error('Unable to set Report');

  const data = await res.json();
  console.log('set new Report:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
