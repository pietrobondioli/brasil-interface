#!/usr/bin/env node

import { program } from "commander";
import "./core/sdks";
import "./core/utils";

program.version("0.0.0");

program.parse(process.argv);
