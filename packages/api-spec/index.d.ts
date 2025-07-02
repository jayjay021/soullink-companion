declare const openApiSpec: {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
    contact?: {
      name?: string;
      email?: string;
    };
    license?: {
      name?: string;
      url?: string;
    };
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths: Record<string, any>;
  components?: Record<string, any>;
  tags?: Array<{
    name: string;
    description?: string;
  }>;
};

// Import the schemas from the generated Zod file
export { schemas } from './generated/zod';

export default openApiSpec;
