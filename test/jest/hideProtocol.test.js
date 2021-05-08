const { hideProtocol } = require('../../')

test('yh.hideProtocol(iPath): string', () => {
  const checkingMap = {
    'http://www.testhost.com/991': '//www.testhost.com/991',
    'https://www.testhost.com/991': '//www.testhost.com/991',
    'http://www.testhost.com/991?from=https:': '//www.testhost.com/991?from=https:'
  }
  Object.keys(checkingMap).forEach((key) => {
    expect(hideProtocol(key)).toEqual(checkingMap[key])
  })
})
