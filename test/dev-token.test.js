'use strict';

const mock = require('egg-mock');

describe('test/dev-token.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/dev-token-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, devToken')
      .expect(200);
  });
});
