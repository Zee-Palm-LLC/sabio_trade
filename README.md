# Sabio Trade

A trading education platform that helps users discover their trading style through an interactive quiz and provides personalized trading profiles.

## Features

- **Trading Style Quiz**: Interactive questionnaire to determine user's trading preferences
- **Trading Profiles**: Personalized trader profiles based on quiz answers
- **Answer Analysis**: Analyzes user responses to provide insights
- **DNA Icons System**: Visual representation of trading preferences
- **Lead Capture**: Collects user information for follow-up
- **Scratch Card**: Interactive reward/engagement feature

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Firebase** for backend services
- **Tailwind CSS** for styling
- **Swiper** for carousels/sliders

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

```bash
npm install
# or
bun install
```

### Development

```bash
npm run dev
# or
bun dev
```

### Build

```bash
# Standard build
npm run build

# Build for master branch
npm run build:master

# Build for main branch
npm run build:main
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # Business logic services (answers, DNA icons, email)
├── data/          # Quiz data and questions
├── config/        # Configuration files (Firebase)
└── utils/         # Utility functions
```

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `build:master` - Build with dist output directory
- `build:main` - Build with dist-main output directory
- `lint` - Run ESLint
- `preview` - Preview production build
