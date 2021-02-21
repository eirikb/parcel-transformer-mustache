import transformer from '../src';
// @ts-ignore
import { CONFIG } from '@parcel/plugin';

import fs from 'fs';

jest.mock('fs');

it('should transform env variables', async () => {
  let code = '{{TEST}} world!';
  process.env.TEST = 'Hello,';
  const asset = {
    getCode: async () => code,
    setCode: (c: string) => (code = c),
  };
  await transformer[CONFIG].transform({ asset });
  expect(code).toBe('Hello, world!');
});

it('should transform similarly named .json-files', async () => {
  (fs.existsSync as any).mockReturnValue(true);
  (fs.readFileSync as any).mockReturnValue(`{"TAST": "ing"}`);

  let code = '{{TAST}} world!';
  const asset = {
    filePath: 'manifest.xml',
    getCode: async () => code,
    setCode: (c: string) => (code = c),
  };
  await transformer[CONFIG].transform({ asset });
  expect(code).toBe('ing world!');
});
