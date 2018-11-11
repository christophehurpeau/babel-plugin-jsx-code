<h3 align="center">
  babel-plugin-jsx-code
</h3>

<p align="center">
  Replace `<Code>` content to render code side by side with source string
</p>

<p align="center">
  <a href="https://npmjs.org/package/babel-plugin-jsx-code"><img src="https://img.shields.io/npm/v/babel-plugin-jsx-code.svg?style=flat-square"></a>
  <a href="https://circleci.com/gh/christophehurpeau/babel-plugin-jsx-code"><img src="https://img.shields.io/circleci/project/christophehurpeau/babel-plugin-jsx-code/master.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/babel-plugin-jsx-code"><img src="https://david-dm.org/christophehurpeau/babel-plugin-jsx-code.svg?style=flat-square"></a>
  <a href="https://dependencyci.com/github/christophehurpeau/babel-plugin-jsx-code"><img src="https://dependencyci.com/github/christophehurpeau/babel-plugin-jsx-code/badge?style=flat-square"></a>
  <a href="https://codecov.io/gh/christophehurpeau/babel-plugin-jsx-code"><img src="https://img.shields.io/codecov/c/github/christophehurpeau/babel-plugin-jsx-code/master.svg?style=flat-square"></a>
</p>

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
