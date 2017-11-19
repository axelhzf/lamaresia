const remark = require('remark');
const recommended = require('remark-preset-lint-recommended');
const html = require('remark-html');
const report = require('vfile-reporter');

const parser = remark()
  .use(recommended)
  .use(html);

export function processMarkdown(content) {
  return new Promise((resolve, reject) => {
    parser.process(content, (err, file) => {
      if (err) {
        console.error(report(err));
        return reject(err);
      }
      resolve(file.toString());
    })
  })
}

