'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      JSXElement: function JSXElement(path, state) {
        var node = path.node;
        var openingElement = node.openingElement;

        if (!t.isJSXIdentifier(openingElement.name)) return;

        var binding = path.scope.getBinding(openingElement.name.name);
        if (!binding || !t.isImportDeclaration(binding.path.parent)) return;
        if (!t.isStringLiteral(binding.path.parent.source)) return;
        if (binding.path.parent.source.value !== 'babel-plugin-jsx-code/Component') return;

        if (!openingElement.attributes.length) {
          throw path.buildCodeFrameError('No attributes, required attribute `render`');
        }
        var renderAttribute = openingElement.attributes.find(function (attribute) {
          return t.isJSXIdentifier(attribute.name) && attribute.name.name === 'render';
        });
        if (!renderAttribute) {
          throw path.buildCodeFrameError('Missing attribute `render`');
        }
        if (!t.isJSXExpressionContainer(renderAttribute.value) || !t.isIdentifier(renderAttribute.value.expression)) {
          throw path.buildCodeFrameError('`render` should be a valid render component, like `render={RenderCode}`');
        }

        var renderIdentifier = renderAttribute.value.expression;

        var children = node.children.filter(function (node) {
          return !t.isJSXText(node) || node.value.trim();
        });
        if (children.length !== 1) {
          throw path.buildCodeFrameError('Only one child is expected');
        }

        var sourceValue = t.jSXExpressionContainer(t.stringLiteral(nodeToString(children[0])));
        var resultValue = t.jSXExpressionContainer(children[0]);

        path.replaceWith(t.jSXElement(t.jSXOpeningElement(t.JSXIdentifier(renderIdentifier.name), [t.jSXAttribute(t.jSXIdentifier('source'), sourceValue), t.jSXAttribute(t.jSXIdentifier('result'), resultValue)], true), null, [], true));
      }
    }
  };
};

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeToString = function nodeToString(id) {
  var code = (0, _babelGenerator2.default)(id, {
    concise: true,
    retainLines: true
  }).code;
  code = code.trim();
  if (!code.includes('\n')) return code;
  var ident = code.substr(code.lastIndexOf('\n') + 1).replace(/^(\s+)[^\s].*$/, '$1');
  code = code.replace(new RegExp('^' + ident, 'gm'), '');
  return code;
};
