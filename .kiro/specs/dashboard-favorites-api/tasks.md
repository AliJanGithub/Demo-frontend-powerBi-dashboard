# Implementation Plan: Dashboard Favorites API

## Overview

This plan implements the dashboard favorites API integration, replacing localStorage-based favorites with server-side persistence. The implementation follows an incremental approach, starting with API functions, then updating the DataContext, and finally modifying the UI components.

## Tasks

- [ ] 1. Add favorites API functions to api.js
  - Add `getFavorites()` function to fetch user's favorite dashboards
  - Add `addFavorite(dashboardId)` function to POST a new favorite
  - Add `removeFavorite(dashboardId)` function to DELETE a favorite
  - _Requirements: 1.1, 2.1, 3.1_

- [ ] 2. Update DataContext with favorites API integration
  - [ ] 2.1 Add favorites state management
    - Add `favoritesLoading`, `togglingId`, and `favoritesError` state
    - Add `fetchFavorites()` async function that calls GET `/favorites`
    - Add `toggleFavoriteAsync(dashboardId)` function with optimistic updates
    - _Requirements: 3.1, 4.3, 5.1_

  - [ ] 2.2 Implement optimistic update logic
    - Update favorites array immediately on toggle
    - Revert state if API call fails
    - Set `togglingId` during API call to track loading state
    - _Requirements: 5.1, 5.2, 1.4, 2.4_

- [ ] 3. Checkpoint - Verify DataContext changes
  - Ensure DataContext compiles without errors
  - Verify state management logic is correct

- [ ] 4. Update DashboardBrowser component
  - [ ] 4.1 Integrate with new favorites API
    - Replace `toggleFavorite` with `toggleFavoriteAsync` from DataContext
    - Add loading state to heart icon button using `togglingId`
    - Disable button while toggle is in progress
    - _Requirements: 1.1, 2.1, 5.3_

  - [ ] 4.2 Update toast notifications
    - Show success toast on successful add/remove
    - Show error toast on API failure
    - _Requirements: 1.3, 2.3, 1.4, 2.4_

- [ ] 5. Update FavoritesDashboard component
  - [ ] 5.1 Fetch favorites on component mount
    - Call `fetchFavorites()` when component mounts
    - Display loading spinner while fetching
    - _Requirements: 3.1, 3.2_

  - [ ] 5.2 Handle fetch results and errors
    - Display fetched favorites from DataContext
    - Show empty state when no favorites exist
    - Show error message if fetch fails with retry option
    - _Requirements: 3.3, 3.4, 3.5_

- [ ] 6. Checkpoint - Test full flow manually
  - Ensure all components work together
  - Verify favorites persist across page refreshes
  - Ask user if questions arise

- [ ]* 7. Write property tests for favorites functionality
  - [ ]* 7.1 Property test for toggle API calls
    - **Property 1: Toggle Favorite API Call**
    - **Validates: Requirements 1.1, 2.1**

  - [ ]* 7.2 Property test for UI state consistency
    - **Property 2: UI State Reflects Favorite Status**
    - **Validates: Requirements 1.2, 2.2**

  - [ ]* 7.3 Property test for rollback on failure
    - **Property 3: Rollback on API Failure**
    - **Validates: Requirements 1.4, 2.4, 5.2**

  - [ ]* 7.4 Property test for favorites list rendering
    - **Property 4: Favorites List Rendering**
    - **Validates: Requirements 3.3**

- [ ] 8. Final checkpoint
  - Ensure all tests pass
  - Verify no console errors
  - Ask user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The backend API endpoints are assumed to already exist
- Authentication token is automatically attached by the api.js interceptor
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
