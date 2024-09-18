import 'server-only';
import path from 'path';
export const REPOSITORY_ROOT = process.cwd();
export const NOTICES_DIR = path.resolve(REPOSITORY_ROOT, './markdown/notices');
export const MARKDOWN_EXTENSION = '.mdx';
