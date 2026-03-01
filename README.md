# NFRA Compliance Tools

A 100% free, fast, and secure Audit Strategy Memorandum (ASM) preparation tool designed specifically for Indian Chartered Accountants working on NFRA-compliant audits.

## 📊 Admin Analytics Dashboard

Because Google Analytics dashboards are securely tied to personal Google Accounts, **you must create your own free tracking property** to view your live visitors. I have placed a placeholder tracking code in the `index.html` file right now. 

### How to set up your dashboard (Takes 2 minutes):
1. Go to **[Google Analytics](https://analytics.google.com/)** and sign in with your company Google Account.
2. Click **Start Measuring** (or go to Admin > Create > Property to make a new one).
3. Name your property (e.g., "NFRA Compliance Tools"), set your timezone to India, and enter your domain (`nfratools.in`).
4. Once you finish the setup wizard, Google will give you a **"Measurement ID"** (it looks like `G-XXXXXXXXXX`).
5. Open your `index.html` file in this repository.
6. Look at lines **9, 10, & 14** inside the `<head>` section. Simply swap out my placeholder `G-H1XZP8W4Y4` with your new Measurement ID!
7. Commit that code change.

Once you do that, your live visitor dashboard on analytics.google.com will immediately start populating with real-time data!

This project is a React SPA built with TypeScript, Vite, and React Router.

### Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Builds the app for production (`HashRouter` is used for static hosting compatibility like GitHub Pages).
- `npm run preview`: Previews the production build locally.

### Key Libraries used
- `lucide-react` / `react-icons` for scalable icons.
- `framer-motion` for complex animations.
- `jspdf` for document generation.

## License
MIT (or as privately determined by Heuristic Techsol LLP).
