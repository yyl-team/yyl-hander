const { Handler, log, vars } = require('../lib/const');

const yh = new Handler( { log, vars });

test('yh.setVars(vars): IVars', () => {
  const r = yh.setVars({ PROJECT_PATH: __dirname});
  expect(r.PROJECT_PATH).toEqual(__dirname);
  expect(yh.vars.PROJECT_PATH).toEqual(__dirname);
});