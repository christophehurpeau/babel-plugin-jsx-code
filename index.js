'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  var sourceJSXIdentifier = t.jSXIdentifier('source');
  var resultJSXIdentifier = t.jSXIdentifier('result');

  return {
    visitor: {
      JSXElement: function JSXElement(path, state) {
        var node = path.node;
        var openingElement = node.openingElement;
        // console.log(node);

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

        path.replaceWith(t.jSXElement(t.jSXOpeningElement(t.JSXIdentifier(renderIdentifier.name), [t.jSXAttribute(sourceJSXIdentifier, t.stringLiteral(nodeToString(node))), t.jSXAttribute(resultJSXIdentifier, t.jSXExpressionContainer(children[0]))], true), null, [], true));
      }
    }
  };
};

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeToString = function nodeToString(id) {
  return (0, _babelGenerator2.default)(id, { concise: true }).code;
};
