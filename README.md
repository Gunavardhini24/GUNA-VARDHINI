# VectorShift Frontend Technical Assessment

This project is a modern visual pipeline builder developed using **React**, **ReactFlow**, and **FastAPI**. The application allows users to create workflows visually by connecting different types of nodes inside an interactive drag-and-drop canvas.

The main objective of this implementation was to build a scalable and maintainable workflow editor with reusable frontend architecture, dynamic node behavior, modern UI styling, and backend graph validation.


# Project Overview

The application simulates a lightweight AI workflow builder where users can visually create pipelines using interconnected nodes. Each node represents a specific operation such as input handling, text processing, AI generation, routing, database interaction, or webhook integration.

The frontend allows users to:
- Drag and connect nodes
- Dynamically generate node handles
- Analyze workflow structure
- Detect cycles in workflows
- View pipeline statistics

The backend validates whether the created workflow forms a valid Directed Acyclic Graph (DAG).


# Features Implemented

# Part 1 — Reusable Node Abstraction

One of the main goals of this assessment was reducing duplicated node code and building a scalable architecture for future node creation.

To solve this, a reusable `BaseNode` component was created.

The `BaseNode` handles:
- Shared node layout
- Node header design
- Icon rendering
- Handle positioning
- Consistent styling
- Selection states
- Shared structure between all nodes

Using this abstraction, new nodes can now be created quickly with minimal repeated code.

# Rebuilt Core Nodes

The following existing nodes were rebuilt using the reusable `BaseNode` system:

- Input Node
- Output Node
- LLM Node
- Text Node

Each node now shares a consistent UI and structure while maintaining its own custom functionality.

# Additional Custom Nodes

To demonstrate scalability and flexibility of the abstraction system, five additional nodes were implemented:

## File Upload Node
Allows simulation of document or file-based inputs.

## Router Node
Represents conditional workflow routing and branching.

## Webhook Node
Simulates external API or webhook integrations.

## Database Node
Represents database querying or storage operations.

## Timer Node
Represents delayed execution or scheduled workflows.

These nodes demonstrate how easily new node types can be added using the reusable architecture.


# Part 2 — Modern UI & Styling

The application was designed with a modern SaaS-inspired interface focused on usability and visual consistency.

Instead of using default ReactFlow styling, the UI was redesigned with:
- Dark theme workflow canvas
- Rounded node cards
- Soft shadows
- Subtle hover animations
- Modern typography
- Styled handles
- Smooth selection states
- Clean spacing and layout hierarchy

The design approach was inspired by modern workflow and productivity platforms.

# Part 3 — Dynamic Text Node Logic

The Text Node was enhanced with advanced dynamic functionality.

## Auto-Resizing Text Area

The text area automatically grows in size as the user types more content. This improves readability and prevents content overflow.

The node height dynamically adjusts without breaking the workflow layout.

## Dynamic Variable Detection

The Text Node supports dynamic variable parsing using double curly brace syntax.

Example:

```txt
Hello {{name}}
Welcome to {{company}}
```

The system automatically detects:
- `name`
- `company`

using regular expressions.

For every detected variable:
- a new input handle is dynamically generated
- handles are rendered on the left side of the node
- duplicate handles are avoided
- handle updates occur in real-time

This creates a flexible and dynamic workflow configuration system.

# Part 4 — Backend Integration & DAG Validation

The frontend is fully integrated with a FastAPI backend.

When the user clicks the **Analyze Pipeline** button:
1. All workflow nodes are collected
2. All workflow edges are collected
3. The frontend sends pipeline data to the backend API
4. The backend validates the graph structure
5. Results are displayed inside a custom notification component

# DAG Validation

The backend validates whether the workflow forms a valid Directed Acyclic Graph (DAG).

The implementation uses **Kahn’s Algorithm** for cycle detection.

The backend:
- counts total nodes
- counts total edges
- detects workflow cycles
- returns DAG validation status

Example response:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

This ensures workflows remain structurally valid.

# Frontend Technologies

- React
- ReactFlow
- JavaScript
- CSS

# Backend Technologies

- Python
- FastAPI

---

# Folder Structure

```bash
frontend/
│
├── src/
│   ├── components/
│   ├── nodes/
│   ├── App.js
│   ├── submit.js
│   ├── ui.js
│   └── ...
│
backend/
│
├── main.py
└── ...
```

---

# Setup Instructions

# Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend server:

```bash
npm start
```

Frontend runs at:

```bash
http://localhost:3000
```

# Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Start FastAPI server:

```bash
Python -m uvicorn main:app --reload
```

Backend runs at:

```bash
http://localhost:8000
```

---

# Workflow Usage

1. Drag nodes into the workflow canvas
2. Connect nodes using handles
3. Create custom text variables
4. Build workflow structures
5. Click **Analyze Pipeline**
6. View DAG validation results

---

# Key Engineering Decisions
## Reusable Architecture

The reusable node system reduces duplication and makes future node development significantly easier.

## Dynamic Rendering

Dynamic handle generation was implemented carefully to avoid unstable rendering and maintain ReactFlow consistency.

## Scalable Design

Frontend logic was separated into:
- reusable components
- node modules
- backend utilities
- workflow rendering logic

This improves maintainability and scalability.

## Lightweight Graph Validation

Instead of relying on external graph-processing libraries, the DAG validation logic was implemented manually for better transparency and maintainability.

# Future Improvements

Potential future enhancements include:
- Workflow persistence
- Authentication system
- Workflow export/import
- Real-time collaboration
- Workflow execution engine
- Node configuration panels
- Multi-user workspaces

# Final Notes

This implementation focuses on:
- scalable frontend architecture
- reusable component systems
- clean UI/UX
- maintainable code structure
- robust backend integration
- production-oriented engineering practices

The goal was to build a polished, extensible, and professional workflow editor rather than only completing the minimum assessment requirements.