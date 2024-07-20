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
  console.log(res);

  if (!res.ok) throw new Error('Unable to get Clinic Basic Info');

  const data = await res.json();
  console.log('Get Clinic Basic Info', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// Clinic assets
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
// export async function setClinicBasicInfo(newClinicBasicInfoObj, accessToken) {
//   const res = await fetch(`${BASE_URL}clinic/loggedin`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },

//     body: JSON.stringify(newClinicBasicInfoObj),
//   });

// if (!res.ok) throw new Error('Unable to set Clinic Basic info');

//   const data = await res.json();
//   console.log('set Clinic Basic info:', data);

//   if (Object.keys(data).includes('success') && !data.success)
//     throw new Error(data.message);
//   if (data.code === 'token_not_valid')
//     throw new Error('Log in expired, Please Log in again');

//   return data;
// }
