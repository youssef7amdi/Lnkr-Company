import { BASE_URL } from '../../environment/environment';

// Prescriptions
export async function getPrescriptions({
  accessToken,
  page = 1,
  query = null,
}) {
  const res = await fetch(
    `${BASE_URL}dentist/prescription?page=${page}${query ? '&q=' + query : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get Prescriptions');

  const data = await res.json();
  console.log('Get Prescriptions', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// prescriptions assets

// diagnosis assets
export async function getDiagnosisAssets({ category, accessToken }) {
  const res = await fetch(
    `${BASE_URL}assets/prescription/diagnosis?category=${category ? category : 'all'}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) throw new Error('Unable to get category diagnosis');

  const data = await res.json();
  console.log('Get Category', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// choices assets
export async function getChoicesAssets(accessToken) {
  const res = await fetch(`${BASE_URL}assets/prescription`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Unable to get choices');

  const data = await res.json();
  console.log('Get choices', data);

  if (!data.success) throw new Error(data.message);

  return data;
}

// SET Prescription
export async function setPrescription({ newPrescriptionObj, accessToken }) {
  const res = await fetch(`${BASE_URL}dentist/prescription`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify(newPrescriptionObj),
  });

  if (!res.ok) throw new Error('Unable to set Prescription');

  const data = await res.json();
  console.log('set new Prescription:', data);

  if (Object.keys(data).includes('success') && !data.success)
    throw new Error(data.message);
  if (data.code === 'token_not_valid')
    throw new Error('Log in expired, Please Log in again');

  return data;
}
