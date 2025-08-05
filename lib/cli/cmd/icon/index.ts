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
  width: `number | string | undefined`,
  height: `number | string | undefined`,
  viewBox: `string | undefined`,
  fill: `string | undefined`,
  stroke: `string | undefined`,
  strokeWidth: `number | string | undefined`,
  strokeOpacity: `number | string | undefined`,
};

const excludeProps = ["data-name"];

export class Icon {
  private _iconFiles: string[] = [];

  constructor(private _watchPath: string, private _outPath: string) {}

  private async _createIcons() {
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
              const attr = get(svgElements.attributes, `[${i}]`);
              if (attr?.name && !excludeProps.includes(attr?.name)) {
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

        const iconTemplateTsx = await this._getTemplate("icon");

        const propsTypeString = Object.entries(svgPropsType)
          .map(([k, v]) => `  ${k}?: ${v};`)
          .join("\n");

        const propsExtractString = Object.entries(svgProps)
          .map(([k, v]) => `  ${k} = ${typeof v === "string" ? `"${v}"` : v},`)
          .join("\n");

        const propsSetString = Object.entries(svgPropsType)
          .map(([k, v]) => `  ${k}={${k}}`)
          .join("\n\t\t");

        const childrenString = children.join("\n\t\t\t");

        const fileName = icon.toCamelCase().capitalize().replace(/.svg/, "");
        const templateContent = iconTemplateTsx
          .replace("{{name}}", fileName)
          .replace("{{props}}", propsTypeString)
          .replace("{{props_extract}}", propsExtractString)
          .replace("{{props_set}}", propsSetString)
          .replace("{{child}}", childrenString);

        const outputPath = `${this._outPath}${fileName}.tsx`;
        await write(outputPath, templateContent);

        this._iconFiles.push(fileName);

        await sleep(1000);
        spinner.succeed(`Create icon ${chalk.green(fileName)}`);
      } catch (err) {
        spinner.fail(`Failed to create icon ${chalk.red(icon)} \n ${err}`);
      }
    }
  }

  private async _createIndex() {
    const spinner = ora("Creating index...").start();
    try {
      // create import
      const importString = this._iconFiles
        .map((file) => `import { ${file}Icon } from "./${file}";`)
        .join("\n");

      // create icon_type
      const iconTypeString = this._iconFiles
        .map((file) => `  ${file}: typeof ${file}Icon,`)
        .join("\n");

      // create set_icon
      const setIconString = this._iconFiles
        .map((file) => `  ${file} = ${file}Icon;`)
        .join("\n");

      const indexTemplateTsx = await this._getTemplate(
        "index.icon.template.txt"
      );

      const templateContent = indexTemplateTsx
        .replace("{{import}}", importString)
        .replace("{{icon_type}}", iconTypeString)
        .replace("{{set_icon}}", setIconString);

      const outputPath = `${this._outPath}index.ts`;
      await write(outputPath, templateContent);

      await sleep(1000);
      spinner.succeed("Index created");
    } catch (err) {
      spinner.fail(`Failed to create index ${err}`);
    }
  }

  private async _getTemplate(name: string) {
    return await file(
      new URL(`../../../template/${name}.template.txt`, import.meta.url)
    ).text();
  }

  async run() {
    await this._createIcons();
    await this._createIndex();
  }
}
