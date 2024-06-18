import { build } from "@/lib/api/builder/backend";

export const apiCheckOnline = build<{}, null>("GET", "/api/is-secure", []);