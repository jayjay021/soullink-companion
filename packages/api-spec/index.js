const { readFileSync } = require('fs');
const { join } = require('path');

const openApiSpec = JSON.parse(
  readFileSync(join(__dirname, 'generated/openapi.json'), 'utf-8')
);

// Export the OpenAPI spec as default for CommonJS
module.exports = openApiSpec;
