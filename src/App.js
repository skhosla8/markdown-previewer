import React from 'react';
import './Css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandArrowsAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import marked from 'marked';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.placeholder = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!\  
Or _italic_.\  
Or... wait for it...**_both!_**\    
\And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

[React Logo w/ Text]
`;

    this.state = {
      markdown: this.placeholder,
      maximizedEditor: false,
      maximizedPreviewer: false
    }

    this.updateMarkdown = this.updateMarkdown.bind(this);
    this.handleMaximizedEditor = this.handleMaximizedEditor.bind(this);
    this.handleMaximizedPreviewer = this.handleMaximizedPreviewer.bind(this);
  }

  updateMarkdown(event) {
    this.setState({ markdown: event.target.value });
  }

  handleMaximizedEditor() {
    this.setState({ maximizedEditor: !this.state.maximizedEditor });
  }

  handleMaximizedPreviewer() {
    this.setState({ maximizedPreviewer: !this.state.maximizedPreviewer });
  }

  render() {
    const expandArrow = <FontAwesomeIcon icon={faExpandArrowsAlt} size='1x' />

    const compressArrow = <FontAwesomeIcon icon={faCompressAlt} size='lg' />

    const freeCodeCamp = <FontAwesomeIcon icon={faFreeCodeCamp} size='lg' />

    const classes =
      this.state.maximizedEditor ? ['container-1 container maximized', 'container-1 hide', compressArrow, freeCodeCamp, 'textarea maximized'] :
        this.state.maximizedPreviewer ? ['container-2 hide', 'container-2 container maximized', compressArrow, freeCodeCamp, 'textarea maximized'] :
          ['container-1 container', 'container-2 container', expandArrow, freeCodeCamp, 'textarea'];

    return (
      <div className='wrapper'>
        <div className={classes[0]}>
          <div className='header'>
            <span className='header-title'>{classes[3]}
              <span className='header-text'>Editor</span>
            </span>
            <span className='arrow-icon' onClick={this.handleMaximizedEditor}>{classes[2]}</span>
          </div>
          <textarea id='editor' className={classes[4]} type='text' value={this.state.markdown} onChange={this.updateMarkdown}></textarea>
        </div>
        <div className={classes[1]}>
          <div className='header'>
            <span className='header-title'>{classes[3]}
              <span className='header-text'>Previewer</span>
            </span>
            <span className='arrow-icon' onClick={this.handleMaximizedPreviewer}>{classes[2]}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }} className={classes[4]} id='preview'></div>
        </div>
      </div>
    )
  }
}

export default App;