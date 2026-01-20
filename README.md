# Portfolio Website

A modern, responsive portfolio website built with cutting-edge web technologies. This project showcases professional work, projects, and skills with an elegant, high-performance design.

## Overview

This portfolio website is a demonstration of full-stack web development capabilities, featuring:

- **Modern UI/UX**: Clean, minimalist design with smooth animations and transitions
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Performance Optimized**: Fast load times and optimized bundle sizes
- **Type-Safe**: Built with TypeScript for robust, maintainable code
- **Styling**: Tailwind CSS for utility-first, scalable styling with Shadcn UI components

## Tech Stack

- **Frontend Framework**: React with Vite for blazing-fast development
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Build Tool**: Vite
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js (v16 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or Bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd rafi
   ```

2. **Navigate to project directory**
   ```bash
   cd rafi
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

   The development server will start with hot module reloading (HMR) for instant feedback on changes.

## Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Project Structure

```
rafi/
├── src/              # Source files
│   ├── components/   # React components
│   ├── pages/        # Page components
│   └── App.tsx       # Main application component
├── public/           # Static assets
├── index.html        # HTML entry point
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Editing Code

There are several ways to modify and extend this project:

### Local Development with IDE

Clone the repository and use your preferred code editor:

```bash
git clone <YOUR_GIT_URL>
cd rafi
npm install
npm run dev
```

Make changes in your IDE and they will automatically reload in the browser thanks to Vite's HMR.

### GitHub Web Editor

1. Navigate to any file in the repository
2. Click the pencil (edit) icon
3. Make your changes
4. Commit directly to the main branch

### GitHub Codespaces

Develop directly in the browser:

1. Go to the main repository page
2. Click "Code" (green button)
3. Select "Codespaces" tab
4. Click "New codespace"
5. Edit files and commit changes

## Deployment

The project is deployed to GitHub Pages automatically on every commit to the main branch.

### Manual Deployment

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Custom Domain

To connect a custom domain:

1. Update your domain's DNS records to point to GitHub Pages
2. Add the domain in repository settings
3. Enable HTTPS in repository settings

See [GitHub Pages Documentation](https://docs.github.com/en/pages) for detailed instructions.

## Performance

Optimizations included:

- Tree-shaking for minimal bundle size
- Code splitting with Vite
- Lazy loading of components
- Optimized images and assets
- CSS purging with Tailwind

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## AI Tech Stacks

- **Antigravity**: Advanced deployment and infrastructure automation
- **Claude**: AI-powered development assistance and code generation
- **Lovable**: UI/UX design and rapid prototyping

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project as a template or reference.

## Live Demo

Visit the live portfolio: [https://rafipatel.github.io/rafi/](https://rafipatel.github.io/rafi/)

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ by Rafi Patel**
