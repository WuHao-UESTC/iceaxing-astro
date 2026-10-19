import { Redis } from '@upstash/redis';

export interface PersistentStore {
  get<T>(key: string): Promise<T | null>;
  getdel<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options?: { ex?: number; nx?: boolean }): Promise<boolean>;
  delete(key: string): Promise<void>;
  addToSet(key: string, value: string): Promise<void>;
  removeFromSet(key: string, value: string): Promise<void>;
  members(key: string): Promise<string[]>;
  incrementWindow(key: string, windowSeconds: number): Promise<number>;
}

export class StoreConfigurationError extends Error {
  constructor() {
    super('Persistent subscription storage is not configured.');
    this.name = 'StoreConfigurationError';
  }
}

export class RedisPersistentStore implements PersistentStore {
  constructor(private readonly redis: Redis) {}

  get<T>(key: string) {
    return this.redis.get<T>(key);
  }

  getdel<T>(key: string) {
    return this.redis.getdel<T>(key);
  }

  async set<T>(key: string, value: T, options?: { ex?: number; nx?: boolean }) {
    const result =
      options?.ex && options.nx
        ? await this.redis.set(key, value, { ex: options.ex, nx: true })
        : options?.ex
          ? await this.redis.set(key, value, { ex: options.ex })
          : options?.nx
            ? await this.redis.set(key, value, { nx: true })
            : await this.redis.set(key, value);
    return result === 'OK';
  }

  async delete(key: string) {
    await this.redis.del(key);
  }

  async addToSet(key: string, value: string) {
    await this.redis.sadd(key, value);
  }

  async removeFromSet(key: string, value: string) {
    await this.redis.srem(key, value);
  }

  members(key: string) {
    return this.redis.smembers<string[]>(key);
  }

  incrementWindow(key: string, windowSeconds: number) {
    const script = `
      local count = redis.call('INCR', KEYS[1])
      if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
      return count
    `;
    return this.redis.eval<[string], number>(script, [key], [String(windowSeconds)]);
  }
}

export function getPersistentStore(): PersistentStore {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new StoreConfigurationError();
  return new RedisPersistentStore(new Redis({ url, token }));
}
