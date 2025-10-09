# Copilot Instructions

## My Preferences for AI Assistant Behavior

### Code Style & Formatting
- [ ] Use TypeScript interfaces vs types
- [ ] Prefer arrow functions vs function declarations
- [ ] Indentation: tabs vs spaces (size: )
- [ ] Semicolons: always vs optional
- [ ] Quote style: single vs double quotes
- [ ] Component naming: PascalCase, camelCase, etc.

### React Patterns I Prefer
- [ ] Functional components only
- [ ] useState vs useReducer for complex state
- [ ] Custom hooks for reusable logic
- [ ] Props destructuring in parameters vs in body
- [ ] Inline styles vs CSS classes vs styled-components

### File Organization
- [ ] Where to put utility functions
- [ ] How to name files (kebab-case, PascalCase, etc.)
- [ ] Folder structure preferences
- [ ] Import organization (absolute vs relative paths)

### Communication Style
- [ ] Explain changes vs just implement
- [ ] Ask before major refactoring
- [ ] Provide multiple options vs single solution
- [ ] Include code comments vs clean code only

### Development Workflow
- [ ] Always run tests after changes
- [ ] Check for linting errors
- [ ] Prefer terminal commands vs VS Code UI
- [x] Auto-format code on save

### What I DON'T Want
- [ ] Overly verbose explanations
- [x] Changes without asking
- [ ] Outdated patterns or libraries
- [ ] Breaking existing functionality

### Project-Specific Notes
- This is a React Nonogram puzzle game
- Focus on performance (avoid unnecessary re-renders)
- Mouse event handling is critical
- Grid-based layout with square components

### Examples of Good/Bad Responses
**Good:**
```
Here's how you could do it: [shows code block without implementing]
You could add conditional styling like this:
border: color === "white" ? "2px solid #000" : "1px solid #666"
Would you like me to implement this change?
```

**Bad:**
```
I'll update the border styling with a conditional approach...
[makes targeted edit without asking]
This will make white squares have thicker borders while keeping colored squares subtle.
```

---
*Feel free to edit this file to customize how I work for you!*