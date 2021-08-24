import Redis from 'ioredis';

export const redis = new Redis(
  19710,
  'redis-19710.c55.eu-central-1-1.ec2.cloud.redislabs.com:1',
  { password: '32ckQc3AeLGu7bz' },
);
