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

- **Debounced Search**: 500ms debounce for optimal performance
- **Favorites System**: Add/remove favorites with localStorage persistence
- **Responsive Design**: Fully optimized for mobile (1 col), tablet (2-3 cols), and desktop (4-5 cols)
- **Loading States**: Clear loading indicators for better UX
- **Error Handling**: Graceful error messages for failed requests
- **404 Page**: Custom Not Found page with navigation options
- **Mobile Navigation**: Hamburger menu for responsive navigation
- **Pagination**: Browse results across multiple pages

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
│   ├── Pagination.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   ├── MovieDetailsModal.tsx
│   └── Navigation.tsx
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts
│   └── useFavorites.ts
├── services/           # API service layer
│   └── omdbApi.ts
├── types/              # TypeScript type definitions
│   └── movie.ts
├── utils/              # Utility functions
│   └── filterSort.ts
├── pages/              # Page components
│   ├── SearchPage.tsx
│   ├── FavoritesPage.tsx
│   └── NotFoundPage.tsx
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

### Responsive Design

- **Mobile First Approach**: Starts with single column and scales up
- **Grid Breakpoints**:
  - Mobile: 1 column (< 640px)
  - Tablet: 2-3 columns (640px - 1024px)
  - Desktop: 4-5 columns (> 1024px)
- **Adaptive Typography**: Font sizes scale across devices
- **Adaptive Spacing**: Padding and margins adjust for screen size
- **Touch-Friendly**: Larger buttons and spacing for mobile devices
- **Hamburger Menu**: Mobile navigation menu that collapses on smaller screens

### 404 Page

- Custom not found page for invalid routes
- Quick navigation buttons (Go Home, My Favorites)
- Helpful suggestions for users
- Fully responsive design

### Navigation

- Fixed top navigation bar
- Logo with responsive sizing
- Responsive link layout
- Mobile hamburger menu
- Active route highlighting

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
- Dedicated favorites page to browse saved movies
- Favorites stored in localStorage
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
