# Contract UI - React TypeScript Implementation

A clean, professional React TypeScript application that renders contract documents from structured JSON data, featuring dynamic clause numbering and variable mentions with colored backgrounds.

## Features

- **Dynamic Contract Rendering**: Parses and renders complex contract structures from JSON
- **Automatic Clause Numbering**: Maintains sequential numbering throughout the document
- **Variable Mentions**: Colored background highlights for replaceable contract variables
- **Text Formatting**: Support for bold, italic, and underlined text
- **Hierarchical Structure**: Proper rendering of headings, paragraphs, lists, and nested content
- **Clean Architecture**: Well-organized component structure with TypeScript type safety

## Project Structure

```
src/
├── components/
│   ├── BlockRenderer.tsx       # Renders block-level elements (h1-h6, p, ul, ol, etc.)
│   ├── ClauseRenderer.tsx      # Handles numbered clause sections
│   ├── ContractRenderer.tsx    # Main contract document renderer
│   ├── MentionRenderer.tsx     # Renders variable mentions with colored backgrounds
│   ├── NodeRenderer.tsx        # Router component for node type determination
│   └── TextRenderer.tsx        # Renders text with formatting marks
├── context/
│   └── ContractContext.tsx     # Global state for clause numbering and mention values
├── types/
│   └── ContractTypes.ts        # TypeScript type definitions
├── data/
│   └── input.json              # Contract data source
└── App.tsx                     # Main application component
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

The application automatically loads and renders the contract data from `src/data/input.json`. The contract will display with:

- Numbered clauses (1., 2., 3., etc.)
- Sub-items with letters (a), (b), (c)
- Colored mention variables (highlighted text boxes)
- Proper text formatting (bold, italic, underline)

## Key Implementation Details

### 1. Type System
- Comprehensive TypeScript interfaces for all node types
- Type guards for runtime type checking
- Support for text nodes, mention nodes, and various block types

### 2. Component Architecture
- **Single Responsibility**: Each component handles one specific rendering task
- **Composition Pattern**: Components compose to build complex structures
- **Context API**: Manages global state for clause numbering
- **Inherited Marks**: Text formatting cascades through nested elements

### 3. Clause Numbering
- Automatic sequential numbering maintained across the entire document
- Uses React Context with useRef to persist counter across re-renders
- Numbers continue even when clauses are not adjacent

### 4. Mention Variables
- Colored background highlights using inline styles
- Dynamic color assignment from JSON data
- Tooltip support showing variable names
- Centralized value management through Context API

## Data Format

The application expects JSON data following this structure:

```json
[
  {
    "title": "Title",
    "type": "block",
    "children": [
      {
        "type": "h1",
        "children": [
          {
            "text": "Service Agreement"
          }
        ]
      },
      {
        "type": "clause",
        "children": [
          {
            "type": "h4",
            "children": [
              {
                "bold": true,
                "underline": true,
                "text": "Section Title"
              }
            ]
          }
        ]
      }
    ]
  }
]
```

### Supported Elements

- **Text Nodes**: With optional `bold`, `italic`, `underline` marks
- **Block Elements**: `h1`-`h6`, `p`, `ul`, `ol`, `li`, `block`
- **Clauses**: Numbered sections with `type: "clause"`
- **Mentions**: Variable text with colored backgrounds

## Technologies Used

- React 18
- TypeScript
- Vite (build tool)
- CSS-in-JS (inline styles for component encapsulation)

## License

This project is for demonstration purposes.