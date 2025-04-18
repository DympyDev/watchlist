# Marvel MCU Watch Tracker

A modern web application to track your progress through the Marvel Cinematic Universe in chronological order, presented in a unique comic book style layout.

## Features

- **Google Authentication**: Secure login with your Google account
- **Progress Syncing**: Your watch progress is automatically saved and synced using Firebase
- **Comic Book Style UI**: Movies and series are presented as comic book pages with different layouts
- **Chronological Order**: Content is arranged in the MCU's in-universe chronological order
- **Chapter Organization**: Content is organized into distinct MCU phases/chapters
- **Responsive Design**: Various comic panel sizes (full-width, 1/3, 2/3, and 1/2) for optimal viewing
- **Single Page Application**: Smooth, seamless user experience

## Technical Stack

- **Frontend**: SvelteKit
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Styling**: Tailwind
- **Type Safety**: TypeScript for enhanced development experience

## Development

1. Install dependencies:
```bash
npm install
```

2. Set up Firebase:
   - Create a Firebase project
   - Enable Google Authentication
   - Set up Firestore database
   - Add your Firebase configuration

3. Start the development server:
```bash
npm run dev
```

Or open it in a new browser tab:
```bash
npm run dev -- --open
```

## Building

Create a production version of the app:

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

- `src/lib/constants`: MCU content data and type definitions
- `src/lib/components`: Reusable UI components
- `src/lib/firebase`: Firebase configuration and utilities
- `src/lib/stores`: State management for authentication and watch progress
- `src/routes`: Page components and layouts

## Contributing

Feel free to submit issues and enhancement requests!
