import generate from 'babel-generator';

const nodeToString = (id) => {
  let code = generate(id, {
    concise: true,
    retainLines: true,
  }).code;
  code = code.trim();
  if (!code.includes('\n')) return code;
  const ident = code.substr(code.lastIndexOf('\n') + 1).replace(/^(\s+)[^\s].*$/, '$1');
  code = code.replace(new RegExp(`^${ident}`, 'gm'), '');
  return code;
};

export default function ({ types: t }) {
  return {
    visitor: {
      JSXElement(path, state) {
        const node = path.node;
        const openingElement = node.openingElement;

        if (!t.isJSXIdentifier(openingElement.name)) return;

        const binding = path.scope.getBinding(openingElement.name.name);
        if (!binding || !t.isImportDeclaration(binding.path.parent)) return;
        if (!t.isStringLiteral(binding.path.parent.source)) return;
        if (binding.path.parent.source.value !== 'babel-plugin-jsx-code/Component') return;

        if (!openingElement.attributes.length) {
          throw path.buildCodeFrameError('No attributes, required attribute `render`');
        }
        const renderAttribute = openingElement.attributes.find(attribute => (
          t.isJSXIdentifier(attribute.name) && attribute.name.name === 'render'
        ));
        if (!renderAttribute) {
          throw path.buildCodeFrameError('Missing attribute `render`');
        }
        if (!t.isJSXExpressionContainer(renderAttribute.value)
            || !t.isIdentifier(renderAttribute.value.expression)) {
          throw path.buildCodeFrameError(
            '`render` should be a valid render component, like `render={RenderCode}`'
          );
        }

        const renderIdentifier = renderAttribute.value.expression;

        const children = node.children.filter(node => !t.isJSXText(node) || node.value.trim());
        if (children.length !== 1) {
          throw path.buildCodeFrameError('Only one child is expected');
        }

        const sourceValue = t.jSXExpressionContainer(
          t.stringLiteral(nodeToString(children[0]))
        );
        const resultValue = t.jSXExpressionContainer(children[0]);

        path.replaceWith(
          t.jSXElement(
            t.jSXOpeningElement(
              t.JSXIdentifier(renderIdentifier.name),
              [
                t.jSXAttribute(t.jSXIdentifier('source'), sourceValue),
                t.jSXAttribute(t.jSXIdentifier('result'), resultValue),
              ],
              true
            ),
            null,
            [],
            true,
          )
        );
      },
    },
  };
}
