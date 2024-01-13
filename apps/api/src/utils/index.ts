/* eslint-disable */
export const log = (message?: string, ...params: unknown[]): void => console.log(message, ...params);
export const logError = (message?: string, ...error: unknown[]): void => console.error(message, ...error);
/* eslint-enable */

export const parseJwt = (token: string) => JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
