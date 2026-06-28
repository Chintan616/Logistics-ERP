# LogiFlow UI Design & Layout Specification

This document outlines the current UI layout and specifications for the LogiFlow Logistics & Warehouse Management System. You can provide this to Lovable to generate updated React components and CSS, which we can then integrate into the project.

## 1. Global Layout Structure
All authenticated pages are wrapped in a standard Dashboard Layout.
- **Sidebar (Left):** 
  - Width: `250px` (fixed)
  - Background: Slate Dark (`#0f172a`)
  - Text: White / Slate Light (`#cbd5e1`)
  - Items: Dashboard, Orders, Shipments, Transactions, Category, Product, Supplier, Profile, Logout.
  - Hover states: Indigo accent (`#4f46e5`) with a subtle `translateX(4px)` animation.
- **Main Content Area (Right):**
  - Background: Off-white/Gray (`#f8fafc`)
  - Padding: `2rem`
  - Takes up the remaining `calc(100vw - 250px)` width.

## 2. Dashboard Page
- **Header:** "Logistics Dashboard" (H1, bold, slate-800).
- **Metrics Grid:**
  - Layout: CSS Grid, typically 3 or 4 columns (`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`).
  - Cards: White background, soft border, small shadow (`box-shadow: 0 1px 3px rgba(0,0,0,0.1)`), rounded corners (`border-radius: 8px`).
  - Card Content: Metric Title (uppercase, small, gray text), Metric Value (large, bold, dark text).
  - Metrics shown: Total Products, Low Stock Alerts, Total Orders, Pending Orders, Packed Orders, Active Shipments, Delivered Shipments.
  - Left Border Accent: Each card has a colorful 4px left border (e.g., Blue for Orders, Red for Low Stock, Green for Delivered).

## 3. Data Table Pages (Orders, Shipments, Products, Categories, Suppliers, Transactions)
Most entity pages follow a standard "Data Grid" pattern.
- **Page Header:**
  - Left: Title (e.g., "Manage Orders").
  - Right: Action Button (e.g., "Add New Order") - Indigo background, white text, rounded.
- **Table Container:**
  - White background, rounded corners, soft shadow.
  - Overflow-x: auto (for responsive scrolling).
- **Table Structure:**
  - `<thead>`: Light gray background (`#f1f5f9`), uppercase headers, bold text.
  - `<tbody>`: Zebra striping (optional) or solid white with bottom borders on rows.
  - Hover effect on rows: slightly darker gray (`#f8fafc`).
- **Status Badges:**
  - Pill-shaped spans for statuses (`PENDING`, `SHIPPED`, `DELIVERED`).
  - Padding: `4px 8px`, rounded full (`9999px`), bold uppercase font.
  - Colors: Orange (Pending), Blue (Shipped), Green (Delivered/Completed).
- **Action Buttons:**
  - Usually an "Edit" (Blue/Indigo) and "Delete" (Red/Danger) button per row.
  - Small size, flexbox alignment.

## 4. Forms & Modals (Add/Edit Entities)
- **Container:** Usually a centralized card or a modal overlay.
- **Form Groups:**
  - Flex column layout.
  - Label: dark gray, bold, small font, margin-bottom.
  - Inputs (Text, Select, Number): `100%` width, `padding: 10px`, rounded corners (`4px` or `8px`), light gray border.
  - Focus state: Border turns Indigo, slight box-shadow ring.
- **Form Actions:**
  - Submit Button: Full width or right-aligned, Indigo background.

## 5. Typography & Colors
- **Font Family:** Inter or Outfit (sans-serif).
- **Primary Brand Color:** Indigo (`#4f46e5`) - used for active states and primary buttons.
- **Backgrounds:** Slate-50 (`#f8fafc`) for pages, White (`#ffffff`) for cards/tables.
- **Text Colors:** Slate-800 (`#1e293b`) for headings, Slate-500 (`#64748b`) for secondary text.

## Instructions for Lovable
Please redesign these layouts to be highly modern, premium, and visually striking. Feel free to use glassmorphism, dynamic micro-animations, tailored HSL color palettes, and completely revamp the Table and Dashboard Card structures to look like a state-of-the-art SaaS application. Output the React components and vanilla CSS (no Tailwind unless specified) required to achieve the new design.
