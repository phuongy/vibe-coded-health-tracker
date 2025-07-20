# Health Tracker

A modern health tracking application built with Remix, React, TypeScript, and Tailwind CSS. Track your weight, heart rate, sleep, and steps with a beautiful, responsive interface.

## Features

- 📊 **Health Metrics Tracking**: Monitor weight, heart rate, sleep, and steps
- 🌙 **Dark/Light Mode**: Toggle between themes for comfortable viewing
- 🌍 **Internationalization**: Support for English, Spanish, and French
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Remix and Vite for optimal speed
- 🎨 **Modern UI**: Beautiful interface using shadcn/ui components

## Tech Stack

- **Framework**: Remix with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui
- **Icons**: Lucide React
- **Theme**: Dark/light mode with next-themes
- **Internationalization**: react-i18next
- **Forms**: react-hook-form with zod validation
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd health-tracker
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm typecheck` - Run TypeScript compiler
- `pnpm lint` - Run ESLint
- `pnpm lint --fix` - Auto-fix linting issues

### Project Structure

```
health-tracker/
├── app/                    # Remix app directory
│   ├── components/         # App-level components
│   ├── routes/            # Page components
│   └── ...
├── components/            # Widgets and page sections
├── features/              # Business logic and features
├── shared/                # Shared utilities and UI components
│   ├── lib/              # Utilities and API functions
│   ├── provider/         # Theme provider
│   └── ui/               # UI components (atoms, molecules)
└── ...
```

## Deployment

### Deploy to Netlify

This app is configured for easy deployment on Netlify.

#### Option 1: Deploy via Git (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`
4. Deploy!

#### Option 2: Manual Deploy

1. Build the project:
```bash
pnpm build
```

2. Upload the `build/client` directory to Netlify

#### Netlify Configuration

The app includes a `netlify.toml` file with the following configuration:

- **Build Command**: `pnpm build`
- **Publish Directory**: `build/client`
- **Node Version**: 20
- **SPA Redirects**: Configured for client-side routing
- **Security Headers**: Added for better security
- **Asset Caching**: Optimized for performance

### Environment Variables

No environment variables are required for basic functionality. The app uses mock data for demonstration purposes.

## Architecture

### Feature-Sliced Design (FSD)

The project follows FSD architecture principles:

- **app**: Application configuration and routing
- **pages**: Page components and route handlers
- **widgets**: Self-contained page sections
- **features**: Business logic and user interactions
- **entities**: Business entities and data models
- **shared**: Reusable utilities and components

### Atomic Design

UI components are organized using Atomic Design principles:

- **Atoms**: Basic building blocks (Button, Card, Input, etc.)
- **Molecules**: Simple combinations (ThemeToggle, LanguageSwitcher)
- **Organisms**: Complex UI sections

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
