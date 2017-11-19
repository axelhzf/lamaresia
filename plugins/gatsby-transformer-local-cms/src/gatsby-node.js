const _ = require(`lodash`)
const crypto = require(`crypto`)
const path = require(`path`)
const { processMarkdown } = require('./markdown');

async function onCreateNode({ node, boundActionCreators, loadNodeContent }) {
  async function transformObject(obj, id, type) {
    const objStr = JSON.stringify(obj)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(objStr)
      .digest(`hex`)

    console.log(obj);

    if (obj.body) {
      obj.bodyHtml = await processMarkdown(obj.body);
    }

    console.log(obj);

    const jsonNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest,
        type,
      },
    }
    createNode(jsonNode)
    createParentChildLink({ parent: node, child: jsonNode })
  }

  const { createNode, createParentChildLink } = boundActionCreators

  // We only care about JSON content.
  if (node.internal.mediaType !== `application/json`) {
    return
  }

  const content = await loadNodeContent(node)
  const parsedContent = JSON.parse(content)

  if (_.isArray(parsedContent)) {
    parsedContent.forEach((obj, i) => {
      transformObject(
        obj,
        obj.id ? obj.id : `${node.id} [${i}] >>> JSON`,
        _.upperFirst(_.camelCase(`${node.name} Json`))
      )
    })
  } else if (_.isPlainObject(parsedContent)) {
    transformObject(
      parsedContent,
      parsedContent.id ? parsedContent.id : `${node.id} >>> JSON`,
      _.upperFirst(_.camelCase(`${path.basename(node.dir)} Json`))
    )
  }
}

exports.onCreateNode = onCreateNode