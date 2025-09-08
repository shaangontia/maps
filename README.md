# MapLibre Markdown Integration

A React TypeScript application that integrates MapLibre GL JS with markdown rendering capabilities. Click on map markers to view rich markdown content in interactive popups.

## Features

- 🗺️ **MapLibre GL JS Integration**: Interactive maps with custom styling
- 📝 **Markdown Support**: Rich text rendering with GitHub Flavored Markdown
- 🎨 **Syntax Highlighting**: Code blocks with highlight.js
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Vite Build System**: Fast development and optimized production builds
- 🔧 **TypeScript**: Full type safety and IntelliSense support

## Tech Stack

- **React 18.3** with TypeScript
- **MapLibre GL JS 4.7** for mapping
- **react-map-gl 7.1** for React integration
- **react-markdown 9.0** for markdown rendering
- **Vite 5.4** for build tooling
- **highlight.js** for syntax highlighting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd map-libre-markdown
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── MapLibreMap.tsx    # Main map component
│   └── MarkdownPopup.tsx  # Markdown popup component
├── hooks/                 # Custom React hooks
├── types/
│   └── index.ts          # TypeScript type definitions
├── utils/                # Utility functions
├── App.tsx              # Root component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Usage

### Adding New Markers

Edit the `SAMPLE_MARKERS` array in `src/components/MapLibreMap.tsx`:

```typescript
const SAMPLE_MARKERS: MapMarker[] = [
  {
    id: 'unique-id',
    longitude: -74.006,
    latitude: 40.7128,
    title: 'Location Title',
    content: `# Your Markdown Content
    
    Support for **bold**, *italic*, \`code\`, and more!
    
    ## Features:
    - Lists
    - Code blocks
    - Links
    - Images
    `
  }
];
```

### Customizing Map Style

Change the map style in `MapLibreMap.tsx`:

```typescript
<Map
  mapStyle="https://your-custom-style.json"
  // ... other props
/>
```

### Markdown Features

The markdown renderer supports:

- **GitHub Flavored Markdown** (tables, strikethrough, task lists)
- **Syntax highlighting** for code blocks
- **Custom styling** for headings, paragraphs, and quotes
- **Raw HTML** support (when safe)

## Configuration

### TypeScript Configuration

The project uses strict TypeScript settings with path mapping:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/hooks/*` → `src/hooks/*`
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`

### Vite Configuration

- **Dev server**: Port 3000 with auto-open
- **Build output**: `dist/` directory with source maps
- **Path aliases**: Configured for clean imports

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
