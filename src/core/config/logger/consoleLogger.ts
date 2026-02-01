import type { Logger } from './logger.types';

export const canLog = (): boolean => {
  return Boolean(process.env.ENABLE_LOGGER) || true;
};

export const consoleLogger: Logger = {
  log(log) {
    if (!canLog()) return;
    console.log(log);
  },
  debug(message, meta) {
    if (!canLog()) return;
    console.debug(`[DEBUG] ${message}`, meta);
  },

  info(message, meta) {
    if (!canLog()) return;
    console.info(`[INFO] ${message}`, meta);
  },

  warn(message, meta) {
    if (!canLog()) return;
    console.warn(`[WARN] ${message}`, meta);
  },

  error(message, meta) {
    if (!canLog()) return;
    console.error(`[ERROR] ${message}`, meta);
  },
};
