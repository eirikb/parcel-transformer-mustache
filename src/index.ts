// @ts-ignore https://github.com/parcel-bundler/parcel/issues/3912
import { Transformer } from '@parcel/plugin';
import mustache from 'mustache';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export default new Transformer({
  async transform({ asset }: { asset: any }) {
    dotenv.config();
    const code = await asset.getCode();
    let view = { ...process.env };

    try {
      const filePath = asset.filePath;
      const jsonFile = path.basename(filePath, path.extname(filePath));
      if (fs.existsSync(jsonFile)) {
        const json = fs.readFileSync(jsonFile, 'utf-8');
        const parsed = JSON.parse(json);
        view = { ...view, ...parsed };
      }
    } catch (ignored) {}

    (view as any).url = () => (text: string) =>
      asset.addURLDependency(text, {
        isAsync: false,
        isUrl: false,
      });

    const rendered = mustache.render(code, view);
    asset.setCode(rendered);
    return [asset];
  },
});
