#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to generate an HTML report from the K6 JSON result
function generateHTMLReport(jsonPath, outputHtmlPath) {
  if (!fs.existsSync(jsonPath)) {
    console.error('JSON result file not found.');
    return;
  }

  let result;
  try {
    const data = fs.readFileSync(jsonPath);
    result = JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error.message);
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>K6 Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h1>K6 Test Report</h1>
      <p>Test Summary:</p>
      <table>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Virtual Users</td>
          <td>${result.metrics.vus.max}</td>
        </tr>
        <tr>
          <td>Duration</td>
          <td>${result.state.testRunDuration}</td>
        </tr>
        <tr>
          <td>Requests</td>
          <td>${result.metrics.http_reqs.count}</td>
        </tr>
        <tr>
          <td>Failures</td>
          <td>${result.metrics.http_req_failed.count}</td>
        </tr>
      </table>
    </body>
    </html>
  `;

  fs.writeFileSync(outputHtmlPath, htmlContent);
  console.log(`HTML report generated at: ${outputHtmlPath}`);
}

// Main function to trigger HTML report generation
function createHTMLReport() {
  const jsonPath = './k6-tests/testResult.json';
  const outputHtmlPath = './k6-tests/testReport.html';
  generateHTMLReport(jsonPath, outputHtmlPath);
}

// Run the report generation process
createHTMLReport();
