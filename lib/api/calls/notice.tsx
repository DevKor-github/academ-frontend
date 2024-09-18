import 'server-only';
import nodePath from 'path';
import { REPOSITORY_ROOT } from '@/lib/directive.server';
import fs from 'fs/promises';
import naturalCompare from 'natural-compare';
import { MARKDOWN_EXTENSION } from '@/lib/directive.server';

export default async function apiNoticeFilenames() {
  const dir = nodePath.resolve(REPOSITORY_ROOT, './markdown/notices/');
  return fs.readdir(dir).then((a) =>
    a
      .filter((v) => v.endsWith(MARKDOWN_EXTENSION))
      // use descending order
      .sort((a, b) => naturalCompare(b.toLowerCase(), a.toLowerCase()))
      .map((fn) => fn.slice(0, - MARKDOWN_EXTENSION.length)),
  );
}
