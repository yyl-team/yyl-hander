const { Handler, log, vars } = require('../lib/const');

const yh = new Handler( { log, vars });

test('yh.html2string(...class="abc"...): string', () => {
  expect(yh.html2string(
    `
      <div class="abc"></div>
    `,
    '"'
  )).toEqual(`
    <div class=\\"abc\\"></div>
  `.trim())
  ;

  expect(yh.html2string(
    `
      <div class="abc"></div>
    `,
    '\''
  )).toEqual(`
    <div class="abc"></div>
  `.trim())
  ;
});

test('yh.html2string(...class=\'abc\'...): string', () => {
  expect(yh.html2string(
    `
      <div class='abc'></div>
    `,
    '\''
  )).toEqual(`
    <div class=\\'abc\\'></div>
  `.trim())
  ;

  expect(yh.html2string(
    `
      <div class='abc'></div>
    `,
    '"'
  )).toEqual(`
    <div class='abc'></div>
  `.trim())
  ;
});

test('yh.html2string(...title=\'1"2"3\'...): string', () => {
  expect(yh.html2string(
    `
      <div title='1"2"3'></div>
    `,
    '\''
  )).toEqual(`
      <div title=\\'1"2"3\\'></div>
  `.trim())
  ;

  expect(yh.html2string(
    `
      <div title='1"2"3'></div>
    `,
    '"'
  )).toEqual(`
      <div title='1\\"2\\"3'></div>
  `.trim())
  ;
});

test('yh.html2string(...title=\'1\\\'2\\\'3\'...): string', () => {
  expect(yh.html2string(
    `
      <div title='1\\'2\\'3'></div>
    `,
    '\''
  )).toEqual('<div title=\\\'1\\\\\'2\\\\\'3\\\'></div>'.trim());

  expect(yh.html2string(
    `
      <div title=\\'1'2'3\\'></div>
    `,
    '"'
  )).toEqual(`
      <div title=\\'1'2'3\\'></div>
  `.trim())
  ;
});

test('yh.html2string(...title="1\\"2\\"3"...): string', () => {
  expect(yh.html2string(
    `
      <div title="1\\"2\\"3"></div>
    `,
    '\''
  )).toEqual(`
      <div title="1\\"2\\"3"></div>
  `.trim())
  ;

  expect(yh.html2string(
    `
      <div title="1\\"2\\"3"></div>
    `,
    '"'
  )).toEqual('<div title=\\"1\\\\"2\\\\"3\\"></div>')
  ;
});