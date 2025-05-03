# Apollo247 General Physician Listing Clone

This project is a clone of the Apollo247 General Physician/Internal Medicine destination page, built as part of an internship assignment.

## Live Demo

**Live Application**: [https://physician-app-567a.vercel.app](https://physician-app-567a.vercel.app)

## Features

- **Doctor Listing**: Displays doctors with their details in two implementations:
  - Client-side filtering and pagination
  - Server-side API-based filtering and pagination
- **Filters**: Filter doctors by Mode of Consult, Experience, Fees, and City.
- **Pagination**: Browse doctors page by page.
- **Responsive UI**: Works on mobile and desktop.
- **SEO**: Implemented Offpage SEO for the destination page.
- **REST API**:
  - `POST /api/doctor` – Add a new doctor.
  - `GET /api/doctor` – Get all doctors.
  - `GET /api/doctor/filter` – Get filtered doctors with pagination.
  - `DELETE /api/doctor?id=123` – Delete a doctor by ID.

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/renukagour/physician-app.git
cd physician-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/app
  /api/doctor           # REST API routes for basic doctor operations
    /filter             # API route for filtered doctor results
    /[id]               # API route for doctor by ID
  /filtered             # Server-side filtered page
  /page.tsx             # Main destination page with client-side filtering
/components
  /DoctorFilters.tsx    # Filters sidebar
  /DoctorsList.tsx      # Client-side filtered doctor listings
  /FilteredDoctorsList.tsx # Server-side filtered doctor listings
  /Pagination.tsx       # Pagination controls
  /Navbar.tsx           # Header
  /RemoveDoctor.tsx     # Doctor removal component
/libs
  /db.ts                # MongoDB connection helper
/models
  /doctor.ts            # Doctor Mongoose model
/public                 # Static assets
```

## API Endpoints

All API endpoints are available at the base URL: `https://physician-app-567a.vercel.app`

### Get All Doctors

- **GET** `https://physician-app-567a.vercel.app/api/doctor`
- **Response**: List of all doctors

### Get Filtered Doctors with Pagination

- **GET** `https://physician-app-567a.vercel.app/api/doctor/filter?modeOfConsult=Online%20Consult&experience=6-10&fees=500-1000&city=Hyderabad&page=1&limit=5`
- **Query Parameters**:
  - `modeOfConsult`: "Online Consult" or "Hospital Visit"
  - `experience`: "0-5", "6-10", "11-16", "17+"
  - `fees`: "100-500", "500-1000", "1000+"
  - `city`: City name
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 5)
- **Response**:
  ```json
  {
    "doctors": [...],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 5,
      "totalPages": 5
    }
  }
  ```

### Add Doctor

- **POST** `https://physician-app-567a.vercel.app/api/doctor`
- **Body**: Doctor details
- **Response**: Confirmation of doctor creation

### Delete Doctor

- **DELETE** `https://physician-app-567a.vercel.app/api/doctor?id=doctor_id`
- **Response**: Confirmation of deletion

## Implementation Notes

The project includes two different implementations of doctor filtering:

1. **Client-side Filtering** (Home Page):
   - All doctors are loaded at once
   - Filtering and pagination are performed in the browser
   - Provides immediate feedback without server requests
   - Available at: [https://physician-app-567a.vercel.app](https://physician-app-567a.vercel.app)

2. **Server-side Filtering** (/filtered Page):
   - Doctors are filtered on the server using MongoDB queries
   - Only filtered results are sent to the client
   - Designed for better performance with large datasets
   - Includes server-side pagination
   - Available at: [https://physician-app-567a.vercel.app/filtered](https://physician-app-567a.vercel.app/filtered)

## Assignment Notes

- **Destination Page**: Implemented both client-side and server-side filtering
- **Filters**: All filters are functional on both implementations
- **SEO**: Offpage SEO tags implemented
- **Database**: MongoDB (NoSQL) with Mongoose
- **API**: RESTful endpoints for CRUD operations and filtering
- **Deployment**: Successfully deployed to Vercel with MongoDB Atlas integration


