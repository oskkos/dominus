import log4js from 'log4js';

import caller = require('caller');

export function getLogger(loggerName?: string, level = 'trace'): log4js.Logger {
  const category = loggerName || caller().split('\\src\\')[1];
  if (!category) {
    throw new Error("Logger name couldn't be resolved");
  }
  const l = log4js.getLogger(category);
  l.level = level;
  return l;
}
