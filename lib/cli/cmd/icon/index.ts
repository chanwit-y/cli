import ora from "ora";
import chalk from "chalk";

import { file, write } from "bun";
import { readdir } from "node:fs/promises";
import { DOMParser } from "xmldom";
import { get } from "lodash";
import { sleep } from "../../../util";

const svgElementType: Record<string, string> = {
  strokeLinecap: `"butt" | "round" | "square" | "inherit" | undefined`,
  strokeLinejoin: `"miter" | "round" | "bevel" | "inherit" | undefined`,
};

export class IconWatcher {
  constructor(private _watchPath: string, private _outPath: string) {}

  private async _watch() {
    const icons = await readdir(this._watchPath);
    for (const icon of icons) {
      const spinner = ora("Watching icons...").start();

      try {
        const iconPath = `${this._watchPath}${icon}`;
        const iconContent = await file(iconPath).text();

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(iconContent, "text/xml");

        const svgElements = get(svgDoc.getElementsByTagName("svg"), "[0]");

        const svgProps: Record<string, string> = {};
        const svgPropsType: Record<string, string> = {};
        const children: string[] = [];

        if (svgElements) {
          if (svgElements.attributes && svgElements.attributes.length > 0) {
            for (let i = 0; i < svgElements.attributes.length; i++) {
              const attr = get(svgElements.attributes, "[0]");
              if (attr?.name) {
                const attrName = attr.name.toCamelCase().toJSXAttribute();
                svgProps[attrName] = attr?.value;
                svgPropsType[attrName] =
                  svgElementType[attrName] || typeof attr?.value;
              }

              if (svgElements.childNodes) {
                for (let j = 0; j < svgElements.childNodes.length; j++) {
                  const child = get(svgElements.childNodes, `[${j}]`);
                  if (child?.nodeType === 1) {
                    const childString = child.toString();
                    if (!children.includes(childString)) {
                      children.push(childString);
                    }
                  }
                }
              }
            }
          }
        }

        const iconTemplateTsx = await file(
          "./lib/template/icon.template.txt"
        ).text();

        const propsTypeString = Object.entries(svgPropsType)
          .map(([k, v]) => `  ${k}: ${v};`)
          .join("\n");

        const propsExtractString = Object.entries(svgProps)
          .map(([k, v]) => `  ${k} = ${typeof v === "string" ? `"${v}"` : v},`)
          .join("\n");

        const propsSetString = Object.entries(svgPropsType)
          .map(([k, v]) => `  ${k}={${k}}`)
          .join("\n\t\t");

        const childrenString = children.join("\n\t\t\t");

        const templateContent = iconTemplateTsx
          .replace("{{props}}", propsTypeString)
          .replace("{{props_extract}}", propsExtractString)
          .replace("{{props_set}}", propsSetString)
          .replace("{{child}}", childrenString);

        const fileName = icon.toCamelCase().capitalize().replace(/svg/, "tsx");

        const outputPath = `./example/output/${fileName}`;
        await write(outputPath, templateContent);

        await sleep(1000);
        spinner.succeed(`Create icon ${chalk.green(fileName)}`);
      } catch (err) {
        spinner.fail(`Failed to create icon ${chalk.red(icon)}`);
      }
    }
  }

  async run() {
    this._watch();
  }
}
