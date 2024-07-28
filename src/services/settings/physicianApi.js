import { BASE_URL } from '../../environment/environment';

// Physician User Info
export async function getUserInfo(accessToken) {
  const res = await fetch(`${BASE_URL}dentist/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Unable to get User Info');

  const data = await res.json();
  console.log('Get User Info', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// SET Physician User Info
export async function setUserInfo(newUserInfoObj, accessToken) {
  const res = await fetch(`${BASE_URL}dentist/user`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify(newUserInfoObj),
  });

  if (!res.ok) throw new Error('Unable to set User info');

  const data = await res.json();
  console.log('set User info:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}

// Physician Profile Info
export async function getProfileInfo(accessToken) {
  const res = await fetch(`${BASE_URL}dentist/personal`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'en-us,ar-eg',
    },
  });

  if (!res.ok) throw new Error('Unable to get Physician Profile Info');

  const data = await res.json();
  console.log('Get Physician Profile Info', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// Physician Profile assets
export async function getProfileTitleAssets(accessToken) {
  const res = await fetch(`${BASE_URL}assets/physician/title`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'ar-eg',
    },
  });

  if (!res.ok) throw new Error('Unable to get Profile title assets');

  const data = await res.json();
  console.log('Get Profile title assets', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// SET Physician Profile Info
export async function setProfileInfo(newProfileInfoObj, accessToken) {
  const res = await fetch(`${BASE_URL}dentist/personal`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'en-us,ar-eg',
    },

    body: JSON.stringify(newProfileInfoObj),
  });

  if (!res.ok) throw new Error('Unable to set Physician Profile info');

  const data = await res.json();
  console.log('set Physician Profile info:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
