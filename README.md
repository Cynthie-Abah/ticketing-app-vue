# ticketing-app-vue

## T

## **Vue `README.md`**

````markdown
# TicketFlow - Vue 3 Frontend

This is the **Vue 3 implementation** of TicketFlow, a multi-framework ticket management web application.

## Features

- **Landing Page**

  - Hero section with wavy SVG background.
  - Call-to-action buttons: Login, Get Started.
  - Decorative circles and card-like feature sections.
  - Responsive design; max-width 1440px, centered layout.
  - Consistent footer across pages.

- **Authentication**

  - Login & Signup pages with form validation.
  - Inline error messages & toast notifications.
  - Simulated with `localStorage` (`ticketapp_session` key).
  - Logout clears session.

- **Dashboard**

  - Summary statistics:
    - Total tickets
    - Open tickets
    - In-progress tickets
    - Resolved tickets
  - Navigation links to Ticket Management page.
  - Visible logout button.
  - Max-width 1440px, centered layout.

- **Ticket Management (CRUD)**
  - Create, Read, Update, Delete tickets.
  - Real-time validation.
  - Inline or toast feedback on actions.
  - Status colors: `open` → green, `in_progress` → amber, `closed` → gray.

## Dependencies

````json
{
  "@supabase/supabase-js": "^2.76.1",
  "@tailwindcss/vite": "^4.1.16",
  "lucide-vue-next": "^0.548.0",
  "pinia": "^3.0.3",
  "tailwindcss": "^4.1.16",
  "vee-validate": "^4.15.1",
  "vue": "^3.5.22",
  "vue-router": "^4.6.3",
  "vue-toastification": "^2.0.0-rc.5",
  "yup": "^1.7.1"
}

Visit https://ticketing-app-vue.netlify.app/
to view the app.

UI & State Structure

State Management: Pinia

Forms: Vee-Validate + Yup

Routing: Vue Router v4

Notifications: Vue Toastification

Icons: Lucide Vue Next

Styling: TailwindCSS

## Project Setup

```sh
npm install
````
````

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
