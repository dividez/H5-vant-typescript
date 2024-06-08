import { createStorage as create} from './storageCache';
import type { CreateStorageParams } from "./storageCache";
import { DEFAULT_CACHE_TIME } from "@/utils/cache/cacheEnum";
import pkg from "../../../package.json";

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // No encryption in debug mode
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export function getStorageShortName() {
  return `${pkg.name}${`__${pkg.version}`}__`.toUpperCase();
}

export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export default WebStorage;
