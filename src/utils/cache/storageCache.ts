import { isNil } from "@/utils/is";

declare type Nullable<T> = T | null;
export interface CreateStorageParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout: Nullable<number>;
}
// TODO 移除此文件夹下全部代码
export const createStorage = ({
  prefixKey = "",
  storage = sessionStorage,
  timeout = 0
}: Partial<CreateStorageParams> = {}) => {
  /**
   * Cache class
   * Construction parameters can be passed into sessionStorage, localStorage,
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     * Set cache
     * @param {string} key
     * @param {*} value
     * @param {*} expire Expiration time in seconds
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNil(expire) ? new Date().getTime() + expire * 1000 : null
      });
      this.storage.setItem(this.getKey(key), stringData);
    }

    /**
     * Read cache
     * @param {string} key
     * @param {*} def
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const data = JSON.parse(val);
        const { value, expire } = data;
        if (isNil(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * Delete all caches of this instance
     */
    clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
