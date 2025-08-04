#!/usr/bin/env bun

import "./lib/extension/String.extension.ts"; // Import string extensions
import { CLI } from "./lib/cli/index.ts";

const cli = new CLI();
cli.run()

