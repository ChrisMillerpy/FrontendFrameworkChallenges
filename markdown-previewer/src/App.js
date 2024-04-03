import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { marked } from 'marked';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='form-floating h- col-6'>
        <textarea onChange={this.props.handleChange} value={this.props.markdown} className='form-control' id='editor'></textarea>
        <label for='editor'>Markdown</label>
      </div>
    );
  }
};

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.innerHTML}} id='preview' class="h-100 col-6 border">
      </div>
    );
  }
  
};

const newtext = "# This is a h1 \n## This is a h2 \nHere is my Github: [ChrisMillerpy](https://github.com/ChrisMillerpy) \n`Here we have some code` ";
const text = `
  # This is a h1

  ## This is a h2

  Here is my Github: [ChrisMillerpy](https://github.com/ChrisMillerpy)

  Here is some \`<inlinecode />\`

  \`\`\`
  Here we have some code
  This is more code
  \`\`\`

  - This
  - Is
  - An
  - Unordered
  - List

  > My favourite quote is here

  ![image-didnt-load](https://www.munchkin.co.uk/media/catalog/product/cache/6ebc13d0c0e34f391e9e75dc0e2b175c/s/m/small_72_dpi_jpg-31001_047f.jpg)

  **This is bold text**
`;

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: text,
      innerHTML: marked.parse(text)
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const markdown = event.target.value;
    this.setState({
      markdown: markdown,
      innerHTML: marked.parse(markdown)
    });
  }

  render() {
    return (
      <main id="markdown-previewer" className='d-flex flex-column'>
        <h1 className='mb-auto text-center'>Markdown Previewer</h1>
        <div className='d-flex' id='app-container'>
          <Editor markdown={this.state.markdown} handleChange={this.handleChange} />
          <Preview innerHTML={this.state.innerHTML}/>
        </div>
        <footer className='mt-auto'>coded by Chris Miller</footer>
      </main>
    );
  }
}

export default MarkdownPreviewer;
