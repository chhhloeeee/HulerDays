import { useRouter } from 'next/router';

export function GetBusinessDatesCount(startDate, endDate) {
  let count = 0;
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
}

export function Logout(userId: number) {
  const router = useRouter();
  var requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
  };

  fetch('http://localhost:1234/logout?id=' + userId, requestOptions)
    .then((response) => {
      router.push('/');
      response.text();
    })
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
}
