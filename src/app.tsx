import { Helmet } from 'react-helmet';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import CodeBlock from './assets/scripts/components/code-block/code-block.component';

import './app.scss';

export default function App() {
  const [isDarkMode, setDarkMode] = React.useState(true);
  const [markdown, setMarkdown] = React.useState<string>(
    '# Type Some Markdown To See It Converted',
  );

  function toggleDarkMode() {
    setDarkMode((darkMode) => !darkMode);
  }

  function updateCodeBlock(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.currentTarget;
    const newMarkdown = markdown + value;
    setMarkdown(newMarkdown);
    e.currentTarget.options[0].selected = true;
  }

  function updateMarkdown(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.currentTarget;
    setMarkdown((_) => value);
  }

  return (
    <div className={`app ${isDarkMode ? '' : 'light'}`}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A simple web app for converting Markdown"
        />
        <title>Markdown Previewer</title>
      </Helmet>
      <section className="wrapper">
        <header className="header">
          <h1>Markdown Previewer</h1>
          <div className="theme-toggle">
            <button className={`theme-toggle__button`} onClick={toggleDarkMode}>
              {isDarkMode ? 'light' : 'dark'}
            </button>
          </div>
        </header>
        <section className="previewer">
          <div className="previewer__input">
            <header className="previewer__input-header">
              <select
                className="previewer__input-dropdown"
                name="code-block-selector"
                onChange={updateCodeBlock}
              >
                <option className="previewer__input-dropdown-option" value="">
                  New Code Block
                </option>
                <option
                  className="previewer__input-dropdown-option"
                  value={'\n\n```css\n/* Add CSS here */\n```'}
                >
                  CSS
                </option>
                <option
                  className="previewer__input-dropdown-option"
                  value={'\n\n```html\n<!-- Add HTML here -->\n```'}
                >
                  HTML
                </option>
                <option
                  className="previewer__input-dropdown-option"
                  value={'\n\n```javascript\n// Add JS here\n```'}
                >
                  JavaScript
                </option>
                <option
                  className="previewer__input-dropdown-option"
                  value={'\n\n```jsx\n{/* Add JSX here */}\n```'}
                >
                  JSX
                </option>
              </select>
            </header>
            <div className="previewer__input-area">
              <textarea
                className="previewer__input-area"
                data-role={'none'}
                onChange={updateMarkdown}
                value={markdown}
              />
            </div>
          </div>
          <div className="previewer__output">
            <ReactMarkdown renderers={{ code: CodeBlock }} source={markdown} />
          </div>
        </section>
      </section>
    </div>
  );
}
