import type { BasicKeys } from "@/utils/cache/persistent";
import { Persistent } from "@/utils/cache/persistent";
import { TOKEN_KEY } from "../cache/cacheEnum";

const isLocal = false;

export function getAuthToken() : string {
  return getAuthCache(TOKEN_KEY);
}

export function setToken(value: any) {
  return setAuthCache(TOKEN_KEY, value);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value: any, userLocal: boolean = isLocal ) {
  const fn = userLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}
