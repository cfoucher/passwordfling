/* eslint-disable no-undef */
function save(id, hash, cb) {
  return fetch('/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(
      { id, hash }),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function retrieve(id, cb) {
  return fetch(`/retrieve?id=${encodeURIComponent(id)}`)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { save, retrieve };
export default Client;
