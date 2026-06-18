# Kasyif Gallery

Kasyif Gallery is an online exhibition showcasing the creative works of MA Al Kasyif students. This platform is designed to give every student's artwork the elegant platform it deserves — a clean, digital gallery that puts the art first and the artist in the spotlight.

## Features

- **Artwork Gallery**: A beautiful grid showcasing various digital designs, traditional paintings, and photography by the students.
- **Articles section**: A space for reading articles related to art and creativity.
- **Dynamic Quotes**: A daily inspiration quote fetched from an external API.
- **Admin Panel**: An interface to manage the exhibition content.
- **Responsive & Accessible**: Optimized for any device, prioritizing aesthetics and usability.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: Custom CSS with smooth animations and scroll reveals

## Getting Started

First, install the dependencies (if you haven't already):

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Contains the main Next.js App Router pages (Home, Articles, Artworks, Admin).
- `/components`: Reusable React components like Nav, Footer, Modal, and Galleries.
- `/data`: Local CMS data (`cms.json`) that stores the content for the gallery and articles.
- `/lib`: Helper functions and utilities, including data fetching logic.
- `/public`: Static assets like SVG placeholders and icons.

## Contributing

This project is maintained by the MA Al Kasyif community. If you are a student or staff member and want to contribute to the codebase or submit your artwork, please contact the administrator.

## License

ISC License
