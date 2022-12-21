export async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status:${response.status}`);
  }

  return response.json();
}

export async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status:${response.status}`);
  }

  return response.json();
}
