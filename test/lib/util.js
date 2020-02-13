const fs = require('fs');
const extFs = require('yyl-fs');
const frag = {
  async build(FRAG_PATH) {
    if (fs.existsSync(FRAG_PATH)) {
      await frag.destroy();
    }
    await extFs.mkdirSync(FRAG_PATH);
  },
  async destroy(FRAG_PATH) {
    await extFs.removeFiles(FRAG_PATH, true);
  }
};

module.exports = {
  frag
};