const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const addNodeBtn = document.getElementById('addNodeBtn');
const clearBtn = document.getElementById('clearBtn');

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Node class
class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.color = this.getRandomColor();
        this.dragging = false;
        this.label = `Node ${nodes.length + 1}`;
    }

    getRandomColor() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        // Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;

        // Circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.shadowColor = 'transparent';

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.label, this.x, this.y);
    }

    isPointInside(x, y) {
        const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return distance < this.radius;
    }
}

// Variables
let nodes = [];
let connections = [];
let selectedNode = null;
let secondSelectedNode = null;

// Add node
addNodeBtn.addEventListener('click', () => {
    const randomX = Math.random() * (canvas.width - 100) + 50;
    const randomY = Math.random() * (canvas.height - 100) + 50;
    nodes.push(new Node(randomX, randomY));
    draw();
});

// Clear all
clearBtn.addEventListener('click', () => {
    nodes = [];
    connections = [];
    selectedNode = null;
    secondSelectedNode = null;
    draw();
});

// Mouse events
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let node of nodes) {
        if (node.isPointInside(x, y)) {
            node.dragging = true;
            break;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let node of nodes) {
        if (node.dragging) {
            node.x = x;
            node.y = y;
        }
    }

    draw();
});

canvas.addEventListener('mouseup', () => {
    for (let node of nodes) {
        node.dragging = false;
    }
});

canvas.addEventListener('dblclick', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let node of nodes) {
        if (node.isPointInside(x, y)) {
            if (!selectedNode) {
                selectedNode = node;
                selectedNode.color = '#ffd700';
            } else if (selectedNode !== node) {
                secondSelectedNode = node;
                // Create connection
                if (!connections.find(conn => 
                    (conn.from === selectedNode && conn.to === secondSelectedNode) ||
                    (conn.from === secondSelectedNode && conn.to === selectedNode)
                )) {
                    connections.push({ from: selectedNode, to: secondSelectedNode });
                }
                selectedNode.color = selectedNode.getRandomColor();
                selectedNode = null;
                secondSelectedNode = null;
            }
            draw();
            return;
        }
    }
});

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    for (let connection of connections) {
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.stroke();

        // Draw arrow
        drawArrow(connection.from.x, connection.from.y, connection.to.x, connection.to.y);
    }

    // Draw nodes
    for (let node of nodes) {
        node.draw();
    }
}

function drawArrow(fromX, fromY, toX, toY) {
    const headlen = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.strokeStyle = '#667eea';
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.moveTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.fill();
}

draw();