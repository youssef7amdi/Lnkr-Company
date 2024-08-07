import { BASE_URL } from '../../environment/environment';

// reports

export async function getScans({ accessToken, page, query = null, type }) {
  const res = await fetch(
    `${BASE_URL}dentist/scan_${type}?page=${page}${query ? '&q=' + query : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get scans');

  const data = await res.json();
  console.log('Get scans', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// get scan assets
export async function getScanAssets({ category, accessToken }) {
  const res = await fetch(
    `${BASE_URL}assets/scan/service?category=${category ? category : 'all'}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get category scan');

  const data = await res.json();
  console.log('Get Category scan', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// set reports
export async function requestScan(newScanObj, accessToken) {
  console.log(JSON.stringify(newScanObj));
  const res = await fetch(`${BASE_URL}dentist/scan_request`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify(newScanObj),
  });

  if (!res.ok) throw new Error('Unable to request Scan');

  const data = await res.json();
  console.log('request new Scan:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
