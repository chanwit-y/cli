#!/usr/bin/env bun

import "./extension/String.extension.ts"; // Import string extensions
import { CLI } from "./lib/index.ts";

const cli = new CLI();
cli.run()

