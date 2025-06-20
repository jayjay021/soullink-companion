const { readFileSync } = require('fs');
const { join } = require('path');

const openApiSpec = JSON.parse(
  readFileSync(join(__dirname, 'generated/openapi.json'), 'utf-8')
);

module.exports = openApiSpec;
