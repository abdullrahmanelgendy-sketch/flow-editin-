# After Effects Flow Graph UI

A powerful interactive tool for managing and visualizing flow graphs in Adobe After Effects. Control your animations with an intuitive node-based interface.

## Features ✨

- **Interactive Nodes**: Create and drag nodes on the canvas
- **Connection Management**: Double-click nodes to create connections between them
- **Visual Feedback**: Color-coded nodes for easy identification
- **Easy Controls**: Simple buttons to add nodes or clear the entire graph
- **CEP Integration**: Ready for Adobe After Effects integration

## Getting Started 🚀

### Installation

1. Clone this repository:
```bash
git clone https://github.com/abdullrahmanelgendy-sketch/flow-editin-.git
```

2. For After Effects Integration:
   - Copy the manifest.xml to your CEP extensions folder
   - Place all files in the appropriate CEP directory

### Usage

1. Open `index.html` in a browser to test the UI standalone
2. Use the **Add Node** button to create new nodes
3. Click and drag nodes to reposition them
4. Double-click two nodes to create a connection between them
5. Use **Clear** button to reset the graph

## File Structure 📁

```
flow-editin-/
├── index.html      # Main HTML interface
├── style.css       # Styling and layout
├── script.js       # Flow graph logic
├── manifest.xml    # Adobe CEP manifest
└── README.md       # This file
```

## Technologies Used 🛠️

- HTML5 Canvas for rendering
- Vanilla JavaScript
- CSS3 for styling
- Adobe CEP for After Effects integration

## Features Roadmap 🗺️

- [ ] Save/Load graph configurations
- [ ] Export connections as JSON
- [ ] Keyboard shortcuts
- [ ] Node properties panel
- [ ] Undo/Redo functionality
- [ ] Connection animations
- [ ] Multi-select support

## License 📄

MIT License - Feel free to use and modify!