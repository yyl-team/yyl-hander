const { Handler, log, vars } = require('../lib/const');
const yh = new Handler( { log, vars });

test('yh.sugarReplace(str, data): string', () => {
  const checkingArr = [{
    str: 'hello {$name}',
    data: { name: 'jackness' },
    result: 'hello jackness'
  }, {
    str: 'hello {$name} {$name}',
    data: { name: 'jackness' },
    result: 'hello jackness jackness'
  }, {
    str: ['hello {$name}', 'hello {$name}'].join('\r\n'),
    data: { name: 'jackness' },
    result: ['hello jackness', 'hello jackness'].join('\r\n')
  }, {
    str: 'hello {$name}',
    data: {},
    result: 'hello {$name}'
  }];

  checkingArr.forEach((item) => {
    expect(yh.sugarReplace(item.str, item.data)).toEqual(item.result);
  });
});