import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: 'time,hostname,pid',
});

export const logger = pino(
  {
    name: 'logger',
    level: process.env.NODE_ENV === 'developement' ? 'debug' : 'info',
  },
  stream,
);
