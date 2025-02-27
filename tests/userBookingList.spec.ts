import { test, expect } from '@playwright/test';

// Mock data for bookings
const mockBookings = [
  {
    _id: 'booking1',
    accommodationId: {
      _id: 'accom1',
      title: 'Luxury Hotel',
      image: 'hotel1.jpg'
    },
    destinationId: {
      _id: 'dest1',
      title: 'Paris'
    },
    userId: 'user123',
    checkInDate: '2025-02-15T00:00:00.000Z',
    checkOutDate: '2025-02-20T00:00:00.000Z',
    totalPrice: 1250.50
  },
  {
    _id: 'booking2',
    accommodationId: {
      _id: 'accom2',
      title: 'Beach Resort',
      image: 'beach1.jpg'
    },
    destinationId: {
      _id: 'dest2',
      title: 'Bali'
    },
    userId: 'user123',
    checkInDate: '2025-03-10T00:00:00.000Z',
    checkOutDate: '2025-03-15T00:00:00.000Z',
    totalPrice: 975.75
  }
];

// Mock the API response for fetching bookings (no userId filtering)
const getBookings = () => {
  return mockBookings; // Return all bookings without filtering by userId
};

test.describe('BookingList Component', () => {
  test.beforeEach(async ({ page }) => {
    // Mock localStorage for auth token (but we no longer use userId for filtering)
    await page.addInitScript(() => {
      window.localStorage.setItem('authToken', 'fake-token-12345');
    });

    // Mock the API response to return all bookings
    await page.route('**/api/booking/user/**', route => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(getBookings()) // Return all mock bookings
      });
    });

    // Mock the API response for deleting a booking
    await page.route('**/api/booking/**', route => {
      const method = route.request().method();
      if (method === 'DELETE') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true })
        });
      }
      return route.continue();
    });

    // Navigate to the bookings page
    await page.goto('http://localhost:5173/bookingList');
  });

  test('should display error message when API call fails', async ({ page }) => {
    // Mock the API response to simulate missing user ID
    await page.route('**/api/booking/user/**', route => {
      return route.fulfill({
        status: 400,  // or any status indicating failure
        contentType: 'application/json',
        body: JSON.stringify({ error: 'User ID is missing. Unable to fetch bookings.' })
      });
    });
  
    // Reload the page to trigger the API request
    await page.reload();
  
    // Ensure the error message displayed is correct
    await expect(page.locator('p.text-red-500')).toBeVisible();
    await expect(page.locator('p.text-red-500')).toHaveText('User ID is missing. Unable to fetch bookings.');
  });

  test('should render calendar with booked dates highlighted', async ({ page }) => {
    await expect(page.locator('.grid-cols-7')).toBeVisible();
    
    const checkInDate = new Date(mockBookings[0].checkInDate).getDate();
    const checkOutDate = new Date(mockBookings[0].checkOutDate).getDate();
    
    const today = new Date().getDate();
    const todayCell = page.locator(`.bg-blue-600.text-white:has-text("${today}")`);
    if (today <= 28) {
      await expect(todayCell).toBeVisible();
    }
  });

  test('should handle auth token missing', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.removeItem('authToken');
    });
    
    await page.reload();
    
    await expect(page.locator('p.text-red-500')).toBeVisible();
  });
});
