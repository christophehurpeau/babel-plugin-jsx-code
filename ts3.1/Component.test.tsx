import * as React from 'react';
import Code, { RenderCodeProps } from 'babel-plugin-jsx-code/Component';

const RenderCode = ({ source, result }: RenderCodeProps) => (
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

    <Code render={RenderCode}>
      <span/>
    </Code>

  </div>
)
