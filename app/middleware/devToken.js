'use strict';

// controller 级别中间

const speakeasy = require('speakeasy');

module.exports = opts => {

  return function* (next) {
    const { logger, ips, request } = this;
    const dev_token = request.headers['dev-token'] ||
      this.request.body.dev_token ||
      this.request.query.dev_token;

    if (!speakeasy.totp.verify({
      secret: this.app.config.devToken.secretKey,
      encoding: 'base32',
      token: dev_token,
    })) {
      logger.info(`IP:${ips} 的 dev_token 不正确 ${dev_token}`);
      this.formatFailResp(RESP_CODES.F403);
      return;
    }

    yield next;
  };
};
