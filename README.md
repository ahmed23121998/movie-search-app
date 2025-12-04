# Movie Search App

A modern, responsive movie and TV show search application built with React and TypeScript.

## Features

### Core Requirements

- **Search Functionality**: Search for movies and TV shows with real-time results
- **Results Display**: Grid view with posters, titles, years, and types
- **Hover Effects**: Smooth poster darkening with details overlay on hover
- **Details Modal**: Click any movie to see full details including plot, cast, ratings, and more
- **Filter by Type**: Filter results by Movies, Series, or All
- **Sort Options**: Sort by year (newest/oldest) or title (A-Z/Z-A)

### Bonus Features Implemented

- **Debounced Search**: 400ms debounce for optimal performance
- **Favorites System**: Add/remove favorites with localStorage persistence
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Loading States**: Clear loading indicators for better UX
- **Error Handling**: Graceful error messages for failed requests

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **OMDb API** for movie data

## API Used

This project uses the [OMDb API (Open Movie Database)](http://www.omdbapi.com/) to fetch movie and TV show data.

API Key: `1b65ae45`

## Installation & Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── SearchBar.tsx
│   ├── FilterSort.tsx
│   ├── Pagenation.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   └── MovieDetailsModal.tsx
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts
│   └── useFavorites.ts
├── services/           # API service layer
│   └── omdbApi.ts
├── types/              # TypeScript type definitions
│   └── movie.ts
├── utils/              # Utility functions
│   └── filterSort.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Features Breakdown

### Search

- Search input with button or Enter key submission
- Loading state during API calls
- Error handling with user-friendly messages
- Empty state for initial view

### Results List

- Responsive grid layout (2-5 columns based on screen size)
- Hover effect: darkens poster and shows overlay with details
- Favorite button on each card
- "No results found" message when appropriate

### Details Modal

- Full movie information including:
  - Poster, title, year, type
  - IMDb rating
  - Runtime and release date
  - Plot summary
  - Cast and crew
  - Awards and ratings
- Close button and click-outside-to-close
- Add/remove from favorites

### Filtering & Sorting

- Filter by type: All, Movies, or Series
- Sort by: Year (newest/oldest), Title (A-Z/Z-A), or no sorting
- Filters applied in real-time

### Favorites

- Click heart icon to add/remove favorites
- Favorites stored in localStorage
- Favorite count displayed in bottom-right corner
- Favorites persist across sessions

## Notes & Assumptions

- The OMDb API has a request limit, so excessive searching may temporarily hit rate limits
- Some movies may not have complete information (marked as "N/A")
- Posters are loaded directly from URLs provided by the API
- The app uses localStorage for favorites (no backend required)
- Search requires at least one character
- Debounce helps reduce unnecessary API calls during typing

## Browser Support

Works on all modern browsers that support:

- ES2020 JavaScript features
- CSS Grid and Flexbox
- localStorage API

## License

This project is created as a take-home assignment.
