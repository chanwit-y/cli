# @chanwity/vega

A CLI tool to convert SVG icons to TypeScript React components with proper TypeScript types.

## Features

- Converts SVG files to TypeScript React components
- Watches directories for changes
- Generates properly typed components
- Interactive CLI interface

## Installation

Install globally via npm:

```bash
npm install -g @chanwity/vega
```

Or use with npx:

```bash
npx @chanwity/vega
```

## Usage

1. Run the CLI:
```bash
vega
```

2. Select "Create icons tsx" from the menu
3. The tool will read your `config.yaml` file and watch for SVG files in the specified directory

## Configuration

Create a `config.yaml` file in your project root:

```yaml
icon:
  watchPath: "./icons/"     # Path to your SVG files
  outPath: "./components/"  # Output directory for TSX files
```

## Example

Given an SVG file `arrow-down.svg`, the tool will generate a corresponding `ArrowDown.tsx` React component with proper TypeScript types.

## Development

To develop locally:

```bash
git clone <repository-url>
cd vega
bun install
bun run index.ts
```

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


npm pack --dry-run