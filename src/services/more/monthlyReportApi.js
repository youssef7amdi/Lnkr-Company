import { BASE_URL } from '../../environment/environment';

// Dues
export async function getMonthlyReport({ accessToken }) {
  const res = await fetch(`${BASE_URL}dentist/more/report`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Unable to get Monthly Report');

  const blob = await res.blob();
  console.log('Get Monthly Report', blob);

  const pdfURL = URL.createObjectURL(blob);

  return pdfURL;
}
