import { build } from "./builder/backend";

export const apiCheckOnline = build<{}, null>("GET", "/api/is-secure", []);