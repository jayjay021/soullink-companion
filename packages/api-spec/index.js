const { readFileSync } = require('fs');
const { join } = require('path');

const openApiSpec = JSON.parse(
  readFileSync(join(__dirname, 'generated/openapi.json'), 'utf-8')
);

// Export both the OpenAPI spec and Zod schemas
module.exports = openApiSpec;

// Try to require the zod schemas, handling different file extensions
try {
  module.exports.schemas = require('./generated/zod.js');
} catch (e) {
  try {
    module.exports.schemas = require('./generated/zod');
  } catch (e2) {
    console.warn('Could not load zod schemas:', e2.message);
  }
}
