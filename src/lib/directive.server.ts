import 'server-only';
import path from 'path';
export const REPOSITORY_ROOT = process.cwd();
export const NOTICES_DIR = path.resolve(REPOSITORY_ROOT, './src/markdown/notices');
export const MARKDOWN_EXTENSION = '.mdx';

/// session management
export const COOKIE_AUTH_TOKEN = 'auth_token';
export const COOKIE_REFRESH_TOKEN = 'refresh_token';
