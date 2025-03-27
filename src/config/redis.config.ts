import { createClient } from 'redis';

class RedisConfig {
  private redisClient: ReturnType<typeof createClient>;

  constructor() {
    this.redisClient = createClient({
      url: process.env.REDIS_URL
    });
  }

  async set(key: string, value: string, time: number): Promise<void> {
    await this.redisClient.connect();
    await this.redisClient.set(key, value, {
      EX: time
    });
  }

  async get(key: string): Promise<string> {
    await this.redisClient.connect();
    return await this.redisClient.get(key);
  }
}

export default RedisConfig;
