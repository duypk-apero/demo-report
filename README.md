# Markdown Viewer

A simple web application to view and browse markdown files with a clean, modern UI.

## Features

- List all markdown (.md) files in the parent directory
- View individual markdown files with syntax highlighting
- Responsive design for mobile and desktop
- Dark/light mode support
- Modern UI with smooth transitions and hover effects

## Getting Started

### Prerequisites

- Node.js (14.x or later)
- npm or yarn

### Installation

1. Clone this repository or download the files
2. Navigate to the project directory

```bash
cd md-viewer
```

3. Install dependencies

```bash
npm install
# or
yarn install
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Usage

- The home page displays all available markdown files as cards
- Click on any card to view its content
- When viewing a file, a sidebar shows all available files for quick navigation
- Click "Back to All Files" to return to the main page

## Project Structure

```
md-viewer/
├── public/               # Static files
├── src/                  # Source code
│   ├── components/       # React components
│   ├── pages/            # Next.js pages
│   ├── styles/           # CSS styles
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown component for React 