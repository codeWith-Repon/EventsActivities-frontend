# 🎨 Events & Activities – Frontend

The **Events & Activities Frontend** is a modern, responsive web application that allows users to discover, create, and join local events and activities. It works seamlessly with the Events & Activities Backend API to deliver a complete social event platform.

---

## 🔗 Live & Repository

- **Live Website:** https://events-activities-frontend-alpha.vercel.app/
- **Backend API:** [https://events-activities-backend-2s5c.onrender.com/](https://events-activities-backend-2s5c.onrender.com/)

---

## 🎯 Purpose

This frontend bridges users with real-world social experiences by providing an intuitive interface for:

- Discovering nearby events
- Connecting with like-minded people
- Creating and hosting activities
- Managing profiles, events, and payments

---

## 🧭 Pages & Functional Requirements

> **Note:** The pages listed below are examples to guide implementation. Additional pages and UI flows may be added as needed to build a complete, production-ready platform.

---

## 🧭 Navbar

### When Logged Out

- Logo (links to Home)
- Explore Events
- Become a Host
- Login
- Register

### When Logged In (User)

- Logo (Home)
- Explore Events
- My Events
- Profile
- Logout

### When Logged In (Host)

- Logo (Home)
- Explore Events
- My Events (Hosted)
- Create Event
- Profile
- Logout

### When Logged In (Admin)

- Logo (Home)
- Admin Dashboard
- Manage Users
- Manage Hosts
- Manage Events
- Profile
- Logout

> Navigation items may vary based on role and permissions.

---

## 🔐 Authentication Pages

- `/register` – User registration (default role: User)
- `/login` – Secure login with email & password

---

## 🏠 Home / Landing Page (`/`)

- Hero section explaining the platform concept
- Primary CTAs: **Find Activities** / **Create Event**
- Featured or upcoming events

**Minimum required sections (6+):**

- Hero Section
- How It Works
- Popular / Upcoming Events
- Event Categories
- Top-Rated Hosts
- Testimonials / Reviews
- Why Choose Us

---

## 👤 Profile Page (`/profile/[id]`)

- User details & profile image
- Interest tags & bio
- Rating summary (for hosts)
- List of:

  - Hosted events
  - Joined events

- Actions:

  - Edit Profile (own profile only)

---

## 📊 Dashboard (`/dashboard`)

### User Dashboard

- Upcoming joined events
- Past events
- Saved / bookmarked events

### Host Dashboard

- Hosted events (upcoming & past)
- Participant management
- Revenue & payment tracking

### Admin Dashboard

- User management
- Host management
- Event moderation & control

---

## ✏️ Create / Edit Event

- `/events/create`
- `/events/edit/[id]`

**Features:**

- Event details form
- Date & time picker
- Location input
- Image upload (event banner)
- Pricing / joining fee

---

## 🔍 Event Listing & Search (`/events`)

- Grid / List view of events
- Search by keyword
- Filters:

  - Category
  - Date
  - Location

---

## 📄 Event Details Page (`/events/[id]`)

- Full event description
- Date, time & location
- Joining fee (if applicable)
- Host profile summary
- List of participants

**Actions:**

- Join Event
- Leave Event

---

## ⭐ Optional / Advanced Features

| Feature          | Description                                    |
| ---------------- | ---------------------------------------------- |
| 📅 Calendar View | Visual calendar of upcoming joined events      |
| 📍 Map View      | Browse events using an interactive map         |
| 🤝 Friend System | Follow / add friends and view their activities |

---

## 🗂 Suggested Folder Structure

```
frontend/
 ├── app/
 │   ├── (auth)/login, register
 │   ├── (main)/events, profile, dashboard
 │   ├── components/
 │   ├── utils/
 │   └── styles/
backend/
 ├── src/
 │   ├── modules/
 │   │   ├── users/
 │   │   ├── events/
 │   └── ...
```

---

## 🔐 Security & UX Notes

- Role-based route protection (User / Host / Admin)
- Protected pages require authentication
- Graceful loading & error states
- Mobile-first & responsive design

---

## 🧠 Author

**Md Repon**
GitHub: [https://github.com/codeWith-Repon](https://github.com/codeWith-Repon)

---

## 📄 License

This project is licensed under the **ISC License**.

---

⭐ This frontend is designed to work seamlessly with the Events & Activities Backend API.
