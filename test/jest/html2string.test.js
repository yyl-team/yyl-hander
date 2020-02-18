const { Handler, log, vars } = require('../lib/const');

const yh = new Handler( { log, vars });

test('yh.html2string(iPath): string', () => {
  expect(yh.html2string(
    `
      <div class="abc"></div>
    `,
    '"'
  )).toEqual(`
    <div class=\\"abc\\"></div>
  `.trim())
  ;
});