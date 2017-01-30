exports.actual = `
import Code from 'babel-plugin-jsx-code/Component';

const RenderCode = ({ source, result }) => (
  <div className="render-code">
    <pre><code>{source}</code></pre>
    <div className="render-result">
      {result}
    </div>
  </div>
);

export default () => (
  <div>
    <h2>A list:</h2>
    <Code render={RenderCode}>
      <ul>
        <li>Green</li>
        <li>Red</li>
      </ul>
    </Code>
  </div>
)
`;

exports.expected = `
import Code from 'babel-plugin-jsx-code/Component';

const RenderCode = ({ source, result }) => React.createElement(
  "div",
  { className: "render-code" },
  React.createElement(
    "pre",
    null,
    React.createElement(
      "code",
      null,
      source
    )
  ),
  React.createElement(
    "div",
    { className: "render-result" },
    result
  )
);

export default (() => React.createElement(
  "div",
  null,
  React.createElement(
    "h2",
    null,
    "A list:"
  ),
  React.createElement(RenderCode, {
    source: "<Code render={RenderCode}> <ul>              <li>Green</li> <li>Red</li> </ul> </Code>",
    result: React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        "Green"
      ),
      React.createElement(
        "li",
        null,
        "Red"
      )
    )
  })
));
`;
