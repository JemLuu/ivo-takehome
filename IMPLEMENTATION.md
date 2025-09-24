# Implementation Details

## Architecture Overview

This React TypeScript application uses a **recursive component rendering** pattern to transform JSON contract data into a formatted document with automatic numbering and styled elements.

## File Structure

```
src/
├── components/
│   ├── NodeRenderer.tsx          # Router component - determines node type and delegates rendering
│   ├── TextRenderer.tsx          # Renders leaf text nodes with formatting marks
│   ├── MentionRenderer.tsx       # Renders colored mention variables
│   ├── BlockRenderer.tsx         # Renders HTML block elements (h1-h6, p, ul, ol, li, etc.)
│   ├── ClauseRenderer.tsx        # Renders numbered clauses with sub-item lettering
│   ├── ContractRenderer.tsx      # Top-level document renderer
│   └── ContractSelector.tsx      # Dropdown menu for contract selection
├── context/
│   ├── contractContext.ts        # Context definition and types
│   ├── ContractContext.tsx       # Provider component with state management
│   └── useContractContext.ts     # Custom hook for accessing context
├── types/
│   └── ContractTypes.ts          # Complete type system with type guards
├── styles/
│   └── contractTheme.ts          # Centralized theme system
├── inputs/
│   └── input.json ... input15.json  # Contract test data files
└── App.tsx                       # Main app with contract loading logic
```

## Key Implementation Decisions

* Single-responsibility components for each element.
* Inheritance to format marks down through component tree like HTML/CSS.
* Context for global state to maintain sequential clause numbering.
* Theme System for consistency
