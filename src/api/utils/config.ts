import { isLocalhost } from "utils/isLocalhost";
export const apiVersion = "v1";
const clientPort = 4011;
const localUrl = `${window.location.protocol}//${window.location.hostname}:${clientPort}/api/${apiVersion}`
const prodUrl = `${window.location.origin}/api/${apiVersion}`

export const basePath = isLocalhost ? localUrl : prodUrl;