# Personal Portfolio Website

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://main.d4q1r6pqxwpp4.amplifyapp.com/) 

This is the source code for my personal portfolio website. I built this to showcase my projects, achievements (certificates), and a bit of my technical background.

The design approach is modern and minimalist with a Slick UI, utilizing liquid glass effects and buttery smooth transitions.

<img width="1917" height="964" alt="Screenshot From 2026-08-06 09-20-51" src="https://github.com/user-attachments/assets/9135941e-5536-4ddf-9a0f-5ed38b4a14ca" />


## Tech Stack
 - **Front End Framework:** React.js
 - **Styling:** Tailwind CSS
 - **Animation:** GSAP & GSAP ScrollTrigger
 - **Scrolling:** Lenis
 - **PDF Renderer:** react-pdf

## Key Features
 - **Smooth Scrolling:** Deep Lenis integration for a fluid, jank-free scrolling experience.
 - **Scroll-Triggered Animations:** Elements reveal and cascade smoothly as they enter the viewport.
 - **Interactive Certificate View:** Dynamically renders the first page of PDF certificates with hover sibling-push interactions.
 - **Fully Responsive:** Scales perfectly from large desktop monitors down to mobile screens.

## Project Structure

```text
src/
├── assets/          # Static assets (images, icons, etc.)
├── components/      # Reusable React components (Navbar, Card, Glass, etc.)
├── data/            # Static data arrays for Projects and Certificates
├── App.jsx          # Main application component & layout structure
├── index.css        # Global CSS and Tailwind directives
└── main.jsx         # React entry point
