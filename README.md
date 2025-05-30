# MiniNewsReader

A modern news reading application built with React Native that provides a seamless experience for reading news articles with features like offline support, dark mode, and beautiful UI.

## Features

- 📰 Latest news articles from various categories
- 🌙 Dark mode support with smooth theme switching
- 📱 Responsive and modern UI design
- 🔄 Pull-to-refresh functionality
- 📥 Offline mode support
- 🔍 Search functionality
- 📱 Cross-platform (iOS & Android)

## Screenshots

[Add screenshots here]

## Tech Stack

- React Native
- Redux Toolkit for state management
- React Navigation for routing
- AsyncStorage for offline data persistence
- Axios for API calls
- React Native Vector Icons
- React Native NetInfo for network status

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment setup
- iOS: XCode (for Mac users)
- Android: Android Studio

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/MiniNewsReader.git
cd MiniNewsReader
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (Mac only):

```bash
cd ios
pod install
cd ..
```

## Running the App

### iOS

```bash
npm run ios
# or
yarn ios
```

### Android

```bash
npm run android
# or
yarn android
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── navigation/     # Navigation configuration
├── store/         # Redux store and slices
├── services/      # API and other services
├── utils/         # Utility functions
└── assets/        # Images and other static assets
```

## Features in Detail

### News Feed

- Latest news articles with images
- Pull-to-refresh functionality
- Article details view
- Category-based filtering

### Dark Mode

- System theme detection
- Manual theme toggle
- Persistent theme preference
- Smooth theme transitions

### Offline Support

- Automatic article caching
- Offline article reading
- Network status detection
- Seamless online/offline transition

### Search

- Real-time search results
- Search history
- Category-based filtering
- Offline search support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- News API for providing the news data
- React Native community for the amazing tools and libraries
- All contributors who have helped in making this project better
