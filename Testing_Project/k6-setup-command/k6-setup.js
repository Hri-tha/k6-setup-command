#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Directory where the K6 tests will be stored
const k6TestDirectory = './k6-tests';

// Template for the K6 basic test script with values from config.js
const basicTestFile = `
import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';   // Import config file

export const options = {
  vus: __ENV.VUS ? parseInt(__ENV.VUS) : config.VUS,               // Number of Virtual Users
  duration: __ENV.DURATION ? __ENV.DURATION : config.DURATION,     // Duration of the test
};

export default function () {
  const url = __ENV.URL ? __ENV.URL : config.URL;
  const method = __ENV.METHOD ? __ENV.METHOD : config.METHOD; // HTTP method
  const payload = __ENV.PAYLOAD ? JSON.parse(__ENV.PAYLOAD) : JSON.parse(config.PAYLOAD); // Payload for POST/PUT

  let res;
  if (method === 'POST') {
    res = http.post(url, payload);
  } else if (method === 'PUT') {
    res = http.put(url, payload);
  } else {
    res = http.get(url);
  }

  const expectedStatus = __ENV.STATUS ? parseInt(__ENV.STATUS) : config.STATUS;
  check(res, { [\`status is \${expectedStatus}\`]: (r) => r.status === expectedStatus });

  const sleepTime = __ENV.SLEEP ? parseFloat(__ENV.SLEEP) : config.SLEEP;
  sleep(sleepTime);
}
`;

// Template for the config.js file
const configFileContent = `
export const config = {
  VUS: 10,
  DURATION: '30s',
  URL: 'https://hkt9137.netlify.app/',
  METHOD: 'POST',
  PAYLOAD: JSON.stringify({ name: 'Hrithik' }),
  STATUS: 201,
  SLEEP: 1
};
`;

// Function to create the directory for K6 tests if it doesn't exist
function createK6TestDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Created directory: ${directoryPath}`);
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
  }
}

// Function to write the K6 test script to the file system
function createK6TestScript(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created K6 basic test script: ${filePath}`);
  } else {
    console.log(`K6 test script already exists: ${filePath}`);
  }
}

// Function to create the config.js file
function createConfigFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created config file: ${filePath}`);
  } else {
    console.log(`Config file already exists: ${filePath}`);
  }
}

// Main function to set up the basic K6 test structure and config file
function setupK6Test() {
  createK6TestDirectory(k6TestDirectory);
  createK6TestScript(path.join(k6TestDirectory, 'basicTest.js'), basicTestFile);
  createConfigFile(path.join(k6TestDirectory, 'config.js'), configFileContent);  // Create config.js file
}

// Run the setup process
setupK6Test();




// #!/usr/bin/env node

// const fs = require('fs');
// const path = require('path');

// // Import user-defined config
// const { config } = require('./config');

// // Directory where the K6 tests will be stored
// const k6TestDirectory = './k6-tests';

// // Template for the K6 basic test script with values from config.js
// const basicTestFile = `
// import http from 'k6/http';
// import { check, sleep } from 'k6';
// import { config } from '../config';  // Import config file

// // Set default values that can be overridden by environment variables
// export const options = {
//   vus: __ENV.VUS ? parseInt(__ENV.VUS) : config.VUS,               // Number of Virtual Users
//   duration: __ENV.DURATION ? __ENV.DURATION : config.DURATION,       // Duration of the test
// };

// export default function () {
//   const url = __ENV.URL ? __ENV.URL : config.URL;
//   const method = __ENV.METHOD ? __ENV.METHOD : config.METHOD; // HTTP method
//   const payload = __ENV.PAYLOAD ? JSON.parse(__ENV.PAYLOAD) : JSON.parse(config.PAYLOAD); // Payload for POST/PUT

//   let res;
//   if (method === 'POST') {
//     res = http.post(url, payload);
//   } else if (method === 'PUT') {
//     res = http.put(url, payload);
//   } else {
//     res = http.get(url);
//   }

//   const expectedStatus = __ENV.STATUS ? parseInt(__ENV.STATUS) : config.STATUS;
//   check(res, { [\`status is \${expectedStatus}\`]: (r) => r.status === expectedStatus });

//   const sleepTime = __ENV.SLEEP ? parseFloat(__ENV.SLEEP) : config.SLEEP;
//   sleep(sleepTime);
// }
// `;

// // Function to create the directory for K6 tests if it doesn't exist
// function createK6TestDirectory(directoryPath) {
//   if (!fs.existsSync(directoryPath)) {
//     fs.mkdirSync(directoryPath);
//     console.log(`Created directory: ${directoryPath}`);
//   } else {
//     console.log(`Directory already exists: ${directoryPath}`);
//   }
// }

// // Function to write the K6 test script to the file system
// function createK6TestScript(filePath, content) {
//   if (!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, content);
//     console.log(`Created K6 basic test script: ${filePath}`);
//   } else {
//     console.log(`K6 test script already exists: ${filePath}`);
//   }
// }

// // Main function to set up the basic K6 test structure
// function setupK6Test() {
//   createK6TestDirectory(k6TestDirectory);
//   createK6TestScript(path.join(k6TestDirectory, 'basicTest.js'), basicTestFile);
// }

// // Run the setup process
// setupK6Test();


// #!/usr/bin/env node

// const fs = require('fs');
// const path = require('path');

// // Directory where the K6 tests will be stored
// const k6TestDirectory = './k6-tests';

// // Template for the K6 basic test script
// const basicTestFile = `import http from 'k6/http';
// import { check, sleep } from 'k6';

// // Set default values that can be overridden by environment variables
// export const options = {
//   vus: __ENV.VUS ? parseInt(__ENV.VUS) : 10,               // Number of Virtual Users
//   duration: __ENV.DURATION ? __ENV.DURATION : '30s',       // Duration of the test
// };

// export default function () {
//   const url = __ENV.URL ? __ENV.URL : 'https://test-api.k6.io/';
//   const method = __ENV.METHOD ? __ENV.METHOD : 'GET'; // HTTP method
//   const payload = __ENV.PAYLOAD ? JSON.parse(__ENV.PAYLOAD) : null; // Payload for POST/PUT

//   let res;
//   if (method === 'POST') {
//     res = http.post(url, payload);
//   } else if (method === 'PUT') {
//     res = http.put(url, payload);
//   } else {
//     res = http.get(url);
//   }

//   const expectedStatus = __ENV.STATUS ? parseInt(__ENV.STATUS) : 200;
//   check(res, { [\`status is \${expectedStatus}\`]: (r) => r.status === expectedStatus });

//   const sleepTime = __ENV.SLEEP ? parseFloat(__ENV.SLEEP) : 1;
//   sleep(sleepTime);
// }
// `;

// // Function to create the directory for K6 tests if it doesn't exist
// function createK6TestDirectory(directoryPath) {
//   if (!fs.existsSync(directoryPath)) {
//     fs.mkdirSync(directoryPath);
//     console.log(`Created directory: ${directoryPath}`);
//   } else {
//     console.log(`Directory already exists: ${directoryPath}`);
//   }
// }

// // Function to write the K6 test script to the file system
// function createK6TestScript(filePath, content) {
//   if (!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, content);
//     console.log(`Created K6 basic test script: ${filePath}`);
//   } else {
//     console.log(`K6 test script already exists: ${filePath}`);
//   }
// }

// // Main function to set up the basic K6 test structure
// function setupK6Test() {
//   createK6TestDirectory(k6TestDirectory);
//   createK6TestScript(path.join(k6TestDirectory, 'basicTest.js'), basicTestFile);
// }

// // Run the setup process
// setupK6Test();





// #!/usr/bin/env node

// const fs = require('fs');
// const path = require('path');

// // Directory where the K6 tests will be stored
// const k6TestDirectory = './k6-tests';

// // Template for the K6 basic test script
// const basicTestFile = `import http from 'k6/http';
// import { check, sleep } from 'k6';

// // Set default values that can be overridden by environment variables
// export const options = {
//   vus: __ENV.VUS ? parseInt(__ENV.VUS) : 10,               // Number of Virtual Users
//   duration: __ENV.DURATION ? __ENV.DURATION : '30s',       // Duration of the test
// };

// export default function () {
//   // Use environment variable for the URL or default to the K6 test API
//   const url = __ENV.URL ? __ENV.URL : 'https://test-api.k6.io/';
//   const res = http.get(url);

//   // Check the response status, defaulting to 200 if not provided
//   const expectedStatus = __ENV.STATUS ? parseInt(__ENV.STATUS) : 200;
//   check(res, { [\`status is \${expectedStatus}\`]: (r) => r.status === expectedStatus });

//   // Sleep for a dynamic amount of time, defaulting to 1 second
//   const sleepTime = __ENV.SLEEP ? parseFloat(__ENV.SLEEP) : 1;
//   sleep(sleepTime);
// }
// `;

// // Function to create the directory for K6 tests if it doesn't exist
// function createK6TestDirectory(directoryPath) {
//   if (!fs.existsSync(directoryPath)) {
//     fs.mkdirSync(directoryPath);
//     console.log(`Created directory: ${directoryPath}`);
//   } else {
//     console.log(`Directory already exists: ${directoryPath}`);
//   }
// }

// // Function to write the K6 test script to the file system
// function createK6TestScript(filePath, content) {
//   if (!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, content);
//     console.log(`Created K6 basic test script: ${filePath}`);
//   } else {
//     console.log(`K6 test script already exists: ${filePath}`);
//   }
// }

// // Main function to set up the basic K6 test structure
// function setupK6Test() {
//   createK6TestDirectory(k6TestDirectory);
//   createK6TestScript(path.join(k6TestDirectory, 'basicTest.js'), basicTestFile);
// }

// // Run the setup process
// setupK6Test();
// // module.exports = {
// //   setupK6Test
// // };


// // #!/usr/bin/env node
// // const fs = require('fs');
// // const path = require('path');

// // const k6TestDirectory = './k6-tests';
// // const basicTestFile = `import http from 'k6/http';
// // import { check, sleep } from 'k6';

// // // Setting default values, which can be overridden by environment variables
// // export const options = {
// //   vus: __ENV.VUS ? parseInt(__ENV.VUS) : 10,               // Number of Virtual Users
// //   duration: __ENV.DURATION ? __ENV.DURATION : '30s',       // Duration of the test
// // };

// // export default function () {
// //   // Using environment variable for the URL or defaulting to the K6 test API
// //   const url = __ENV.URL ? __ENV.URL : 'https://test-api.k6.io/';
// //   const res = http.get(url);

// //   // Check the response status, defaulting to 200 if not specified
// //   const expectedStatus = __ENV.STATUS ? parseInt(__ENV.STATUS) : 200;
// //   check(res, { [\`status is \${expectedStatus}\`]: (r) => r.status === expectedStatus });

// //   // Sleep for a dynamic amount of time, defaulting to 1 second
// //   const sleepTime = __ENV.SLEEP ? parseFloat(__ENV.SLEEP) : 1;
// //   sleep(sleepTime);
// // }
// // `;

// // // Create the directory for K6 tests if it doesn't exist
// // if (!fs.existsSync(k6TestDirectory)) {
// //   fs.mkdirSync(k6TestDirectory);
// //   console.log(`Created directory: ${k6TestDirectory}`);
// // }

// // // Write the basic K6 test file
// // fs.writeFileSync(path.join(k6TestDirectory, 'basicTest.js'), basicTestFile);
// // console.log('Created K6 basic test script: k6-tests/basicTest.js');


