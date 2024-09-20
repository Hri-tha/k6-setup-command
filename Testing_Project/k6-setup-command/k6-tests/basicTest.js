import http from 'k6/http';
import { check, sleep } from 'k6';

// Set default values that can be overridden by environment variables
export const options = {
  vus: __ENV.VUS ? parseInt(__ENV.VUS) : 10,               // Number of Virtual Users
  duration: __ENV.DURATION ? __ENV.DURATION : '30s',       // Duration of the test
};

export default function () {
  const url = __ENV.URL ? __ENV.URL : 'https://test-api.k6.io/';
  const method = __ENV.METHOD ? __ENV.METHOD : 'GET'; // HTTP method
  const payload = __ENV.PAYLOAD ? JSON.parse(__ENV.PAYLOAD) : null; // Payload for POST/PUT

  let res;
  if (method === 'POST') {
    res = http.post(url, payload);
  } else if (method === 'PUT') {
    res = http.put(url, payload);
  } else {
    res = http.get(url);
  }

  const expectedStatus = __ENV.STATUS ? parseInt(__ENV.STATUS) : 200;
  check(res, { [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus });

  const sleepTime = __ENV.SLEEP ? parseFloat(__ENV.SLEEP) : 1;
  sleep(sleepTime);
}
