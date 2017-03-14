# babel-plugin-jsx-code [![NPM version][npm-image]][npm-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/christophehurpeau/babel-plugin-jsx-code.svg)](https://greenkeeper.io/)

Replace `<Code>` content to render code side by side with source string

[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]

## Usage

```jsx
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
```

Render to:

```html
<div>
  <h2>A list:</h2>
  <div class="render-code">
    <pre>
      <code>
        &lt;ul&gt;
          &lt;li&gt;Green&lt;/li&gt;
          &lt;li&gt;Red&lt;/li&gt;
        &lt;/ul&gt;
      </code>
    </pre>
    <div class="render-result">
      <ul>
        <li>Green</li>
        <li>Red</li>
      </ul>
    </div>
  </div>
</div>
```

[npm-image]: https://img.shields.io/npm/v/babel-plugin-jsx-code.svg?style=flat-square
[npm-url]: https://npmjs.org/package/babel-plugin-jsx-code
[daviddm-image]: https://david-dm.org/christophehurpeau/babel-plugin-jsx-code.svg?style=flat-square
[daviddm-url]: https://david-dm.org/christophehurpeau/babel-plugin-jsx-code
[dependencyci-image]: https://dependencyci.com/github/christophehurpeau/babel-plugin-jsx-code/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/christophehurpeau/babel-plugin-jsx-code
