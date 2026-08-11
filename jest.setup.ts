import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd(), true, { info: () => null, error: console.error });
