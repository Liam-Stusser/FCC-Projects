import React from "react";
import ReactDOM from "react-dom/client";
class Markdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        text: `# Header (H1)
  ## Subheader (H2)
  
  [Google](https://www.google.com)
  
  Inline \`code\`
  
  \`\`\`
  Code block
  \`\`\`
  
  - List item 1
  - List item 2
  - List item 3
  
  > Blockquote
  
  ![Image](https://via.placeholder.com/150)
  
  **Bold text**
        ` 
      };
      this.handleInput = this.handleInput.bind(this);
    } 
  
    handleInput(event) {
      this.setState({ text: event.target.value });
    }
  
    render() {
      const markdownToHtml = marked.parse(this.state.text, { gfm: true });  
      return (
        <div>
          <textarea
            id="editor"
            placeholder="Enter text here..."
            value={this.state.text}
            onInput={this.handleInput}
          ></textarea>
          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: markdownToHtml }}
          ></div>
        </div>
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Markdown />);