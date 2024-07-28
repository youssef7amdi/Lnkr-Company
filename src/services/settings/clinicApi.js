import { BASE_URL } from '../../environment/environment';

// Clinic Basic Info
export async function getClinicBasicInfo(accessToken) {
  const res = await fetch(`${BASE_URL}clinic/loggedin`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'en-us',
    },
  });

  if (!res.ok) throw new Error('Unable to get Clinic Basic Info');

  const data = await res.json();
  console.log('Get Clinic Basic Info', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// Clinic Basic assets
export async function getClinicTitleAssets(accessToken) {
  const res = await fetch(`${BASE_URL}assets/clinic/title`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'en-us',
    },
  });

  if (!res.ok) throw new Error('Unable to get Clinic title assets');

  const data = await res.json();
  console.log('Get Clinic title assets', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// SET Clinic Basic Info
export async function setClinicBasicInfo(newClinicBasicInfoObj, accessToken) {
  const res = await fetch(`${BASE_URL}clinic/loggedin`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'en-us,ar-eg',
    },

    body: JSON.stringify(newClinicBasicInfoObj),
  });

  if (!res.ok) throw new Error('Unable to set Clinic Basic info');

  const data = await res.json();
  console.log('set Clinic Basic info:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}

// get address info
export async function getClinicAddressInfo(accessToken) {
  const res = await fetch(`${BASE_URL}clinic/loggedin/address`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'en-us',
    },
  });

  // if (!res.ok) throw new Error('Unable to get Clinic Address Info');

  const data = await res.json();
  console.log('Get Clinic Address Info', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// Clinic Address assets
export async function getClinicAddressAssets({ city, accessToken }) {
  const res = await fetch(
    `${BASE_URL}assets/clinic/address?city=${city ? city : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': 'en-us',
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get clinic Address assets');

  const data = await res.json();
  console.log('Get clinic Address assets', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// SET Clinic Address Info
export async function setClinicAddress({
  newClinicAddressObj,
  method,
  accessToken,
}) {
  const res = await fetch(`${BASE_URL}clinic/loggedin/address`, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'en-us,ar-eg',
    },

    body: JSON.stringify(newClinicAddressObj),
  });

  // if (!res.ok) throw new Error('Unable to set Clinic Address info');

  const data = await res.json();
  console.log('set Clinic Address info:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
