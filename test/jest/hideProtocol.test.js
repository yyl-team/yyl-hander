const { Handler, log, vars } = require('../lib/const');

const yh = new Handler( { log, vars });

test('yh.hideProtocol(iPath): string', () => {
  const checkingMap = {
    'http://www.yy.com/991': '//www.yy.com/991',
    'https://www.yy.com/991': '//www.yy.com/991',
    'http://www.yy.com/991?from=https:': '//www.yy.com/991?from=https:'
  };
  Object.keys(checkingMap).forEach((key) => {
    expect(yh.hideProtocol(key)).toEqual(checkingMap[key]);
  });
});