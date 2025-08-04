import { file } from "bun";
import { join } from "path";
import yaml from "js-yaml";

export const sleep = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const y2j = async <T extends Record<string, any>>(
  path: string
): Promise<T> => {
  const p = join("./", path);
  const f = await file(p);
  const t = await f.text();
  return yaml.load(t) as T;
};
