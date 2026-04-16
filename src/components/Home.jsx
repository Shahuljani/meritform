import React, { useState, useEffect, useRef } from "react";
import Form from "./Form"; // adjust import path as needed

// ── IMAGE PLACEHOLDERS ──────────────────────────────────────────────────────
const HERO_BG = "/src/assets/banner.webp";
const CAMPUS_IMG = "/src/assets/uni2.webp";
const STUDENT_LEFT = "/src/assets/uni1.webp";
const STUDENT_RIGHT = "/src/assets/uni3.webp";
const SCHOOL_TECH = "/src/assets/tech.webp";
const SCHOOL_HEALTH = "/src/assets/0Health_Sciences.png";
const SCHOOL_MGMT = "/src/assets/0Management.png";
const SCHOOL_PHARMA = "/src/assets/0Pharmaceutical_Sciences.png";
const SCHOOL_SOCIAL = "/src/assets/0Social_Work.png";
const HOSTEL_IMG = "/src/assets/Hostel.png";
const SCHOLARSHIP_IMG = "/src/assets/scholar.webp";
const LEICESTER_IMG = "/images/leicester.jpg";
const LOGO_IMG = "/src/assets/logo.png";

const recruiters = [
  { name: "Datawise", img: "/src/assets/gh2.webp" },
  { name: "Accenture", img: "src/assets/gh3.webp" },
  { name: "NASSCOM", img: "src/assets/gh4.webp" },
  { name: "Salesforce", img: "src/assets/gh5.webp" },
  { name: "Google AI", img: "src/assets/gh6.webp" },
  { name: "ServiceNow", img: "src/assets/gh7.webp" },
];

const schools = [
  {
    key: "tech",
    label: "School of Technology",
    img: SCHOOL_TECH,
    courses: [
      "B.Tech. Computer Science and Engineering",
      "B.Tech. CSE – Artificial Intelligence and Data Science",
      "B.Tech. CSE – Artificial Intelligence and Machine Learning",
      "B.Tech. CSE (Cyber Security)",
      "B.Tech. CSE (Cloud Computing)",
      "M.Tech. VLSI Design and Embedded Systems",
    ],
  },
  {
    key: "health",
    label: "School of Health Sciences",
    img: SCHOOL_HEALTH,
    courses: [
      "B.Sc. Clinical Psychology",
      "B.Sc. Anaesthesiology & Operation Theatre Technology",
      "B.Sc. Renal Dialysis Technology",
      "B.Sc. Medical Laboratory Technology",
      "Bachelor in Optometry",
      "B.Sc. Imaging Technology",
    ],
  },
  {
    key: "mgmt",
    label: "School of Management",
    img: SCHOOL_MGMT,
    courses: ["MBA Hospital and Healthcare Management", "BBA"],
  },
  {
    key: "pharma",
    label: "Apollo Institute of Pharmaceutical Sciences",
    img: SCHOOL_PHARMA,
    courses: ["B.Pharmacy", "PharmD"],
  },
  {
    key: "social",
    label: "School of Social Work",
    img: SCHOOL_SOCIAL,
    courses: ["Bachelor of Social Work"],
  },
];

const facilities = [
  "Hostel Accommodation",
  "Library",
  "Transport Facility",
  "Research Laboratories",
  "Health Services",
  "ATM Centre",
  "Sports and Recreation",
  "Cafeterias",
];

const accreditations = [
  { label: "UGC Recognised", img: "src/assets/ugc.png" },
  { label: "AP Government Gazette Certified", img: "src/assets/gazette cer.png" },
  { label: "AP Government Registered", img: "src/assets/ap gov reg.png" },
  { label: "Government Approved B.Pharma", img: "src/assets/gov approved phar.png" },
  { label: "PCI Certified", img: "src/assets/pci.png" },
  { label: "ISO 21001: 2018 CERTIFIED", img: "src/assets/iso.png" },
];

const globalPartners = [
  { name: "The Harvard University", img: "src/assets/harvard.webp" },
  { name: "Monash University", img: "src/assets/monash.webp" },
  { name: "Brigham And Women's Hospital", img: "src/assets/brigham.webp" },
  { name: "Johns Hopkins University", img: "src/assets/hopkins.webp" },
  { name: "Esigelec University", img: "src/assets/esigelec.webp" },
  { name: "The University of New Castle", img: "src/assets/castle.webp" },
];

const testimonials = [
  {
    name: "A. Rohith Kumar",
    prog: "B.Tech-CSE [AI and D.S]",
    text: "I'm A. Rohith Kumar, currently pursuing my B.Tech-CSE [AI and D.S] at The Apollo University. I enjoyed being a student at TAU. The teachers here are quite hard-working and helpful. Here, I found the best faculty I have ever had in my life. I feel so lucky to have such amazing teachers. I'm thankful to them for guiding me and inspiring me to achieve my goals.",
  },
  {
    name: "Sree Swastika",
    prog: "MBA in Hospital and Healthcare Management",
    text: "I'm Sree Swastika, and I'm doing my MBA in Hospital and Healthcare Management at The Apollo University. Studying here has been such an amazing experience! The faculty is super knowledgeable and supportive, and the campus has everything you need. We've got weekly sports and club activities, which make things so much fun. The focus on practical skills and real-world insights really prepares us for the healthcare industry.",
  },
];

export default function Home() {
  const [activeSchool, setActiveSchool] = useState(0);
  const [activeFacility, setActiveFacility] = useState(0);

  // ── Form popup state ─────────────────────────────────────────────────────
  const [formOpen, setFormOpen] = useState(false);
  const [showEnquire, setShowEnquire] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimer = useRef(null);

  // Open form on mount for ALL screen sizes
  useEffect(() => {
    const timer = setTimeout(() => setFormOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Scroll behavior — hide FAB when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY === 0) {
        setShowEnquire(true);
      } else if (currentY < lastScrollY.current) {
        setShowEnquire(true);
      } else if (currentY > lastScrollY.current) {
        setShowEnquire(false);
      }

      lastScrollY.current = currentY;
      clearTimeout(scrollTimer.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer.current);
    };
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: "#222", overflowX: "hidden" }}>
      <style>{`
        :root {
          --teal: #0e7b9e;
          --teal-dark: #0a5f7a;
          --teal-light: #e8f4f8;
          --yellow: #f5a623;
          --dark: #1a1a1a;
          --white: #ffffff;
          --text-gray: #555;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        .section { padding: 60px 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .section-title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          color: var(--teal-dark);
          text-align: center;
          margin-bottom: 8px;
        }
        .section-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          text-align: center;
          color: #333;
          margin-bottom: 40px;
        }

        /* ── ENQUIRE FAB ── */
        .enquire-fab-wrap {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9000;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .enquire-fab-wrap.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-50%) translateX(100%);
        }
        .enquire-fab-wrap button {
          background: linear-gradient(180deg, #ff0000 0%, #ff0000 100%);
          color: #ffffff;
          font-weight: 900;
          font-size: 0.78rem;
          padding: 12px 18px;
          border: none;
          cursor: pointer;
          letter-spacing: 2px;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          border-radius: 6px 0 0 6px;
          box-shadow: -4px 0 16px rgb(255, 0, 0);
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
          font-family: 'Georgia', serif;
        }
        .enquire-fab-wrap button:hover {
          background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
          color: #ff0000;
        }

        /* ── LOGO OVERLAY (top-left, no header) ── */
        .logo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          padding: 18px 24px;
        }
        .logo-overlay img {
          height: 52px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* HERO — DESKTOP */
        .hero {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #0d0d0d 0%, #1a2a2a 60%, #1c3a3a 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background-image: url(${HERO_BG});
          background-size: cover;
          background-position: center right;
          opacity: 0.45;
        }

/* Mobile girl image — visible only on mobile */
.hero-girl-mobile {
  display: none;
}

/* Mobile view */
@media (max-width: 768px) {
  .hero-girl-mobile {
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 170px;
    width: 100%;
    height: 100%;

    /* KEY PART */
    object-position: 50% center;    /* fills entire area */
    object-position: right bottom; /* focus on girl */
    
    transform: scale(1.2); /* zoom effect */
  }

  .hero {
    position: relative;
    overflow: hidden;
    height: 60vh; /* adjust if needed */
  }
}

        .hero-content {
          position: relative; z-index: 2;
          padding: 120px 40px 60px;
          max-width: 700px;
        }
        .hero-content h1 {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900;
          line-height: 1.05;
          color: var(--white);
        }
        .hero-content h1 span { color: var(--yellow); }
        .hero-badge {
          display: inline-block;
          margin-top: 28px;
          border: 2px solid var(--white);
          padding: 14px 32px;
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-weight: 700;
          color: var(--white);
          background: rgba(255,255,255,0.08);
          
        }
          
        .hero-programs {
          background: var(--yellow);
          padding: 16px 40px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px 20px;
          align-items: center;
          position: relative; z-index: 2;
        }
        .hero-programs span {
          font-weight: 700;
          font-size: clamp(0.8rem, 1.5vw, 1rem);
          color: #111;
        }
        .hero-programs .sep { color: #333; font-size: 1.2rem; }
        .hero-stats {
          background: var(--white);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          text-align: center;
          border-top: 3px solid #e0e0e0;
          position: relative; z-index: 2;
        }
        .stat-item {
          padding: 24px 10px;
          border-right: 1px solid #ddd;
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          color: var(--teal);
        }
        .stat-label { font-size: 0.85rem; color: #666; margin-top: 4px; }

        /* ABOUT */
        .about-section {
          background: var(--teal-light);
          padding: 70px 20px;
        }
        .about-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid;
          grid-template-columns: 120px 1fr 120px;
          gap: 20px;
          align-items: center;
        }
        .about-side-img {
          width: 100%;
          border-radius: 8px;
          object-fit: cover;
          height: 220px;
        }
        .about-center { text-align: center; }
        .about-center h2 {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          color: var(--teal);
          margin-bottom: 8px;
        }
        .about-center h3 {
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-weight: 700;
          color: #222;
          margin-bottom: 14px;
        }
        .about-center p { color: var(--text-gray); line-height: 1.7; font-size: 0.95rem; margin-bottom: 24px; }
        .about-campus {
          width: 100%;
          max-width: 600px;
          border-radius: 10px;
          object-fit: cover;
          height: 280px;
        }

        /* EDGE */
        .edge-section {
          background: var(--teal-light);
          padding: 60px 20px;
          text-align: center;
        }
        .edge-grid {
          max-width: 900px;
          margin: 30px auto 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .edge-item {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 30px 20px;
        }
        .edge-icon {
          width: 48px;
          height: 48px;
          background: none;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .edge-icon img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }
        .edge-item p {
          font-size: 1rem;
          color: #222;
          line-height: 1.5;
          text-align: left;
        }
        .edge-item p strong {
          font-weight: 700;
          color: #111;
        }
        .edge-grid::before {
          content: "";
          grid-column: 1 / -1;
          height: 1px;
          background: #7aa5b0;
        }

        /* SCHOOLS */
        .schools-section { background: var(--teal-light); padding: 60px 20px; }
        .school-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
          margin-bottom: 30px;
        }
        .school-tab {
          padding: 12px 22px;
          background: var(--teal);
          color: white;
          font-weight: 600;
          font-size: clamp(0.75rem, 1.3vw, 0.95rem);
          cursor: pointer;
          border: none;
          transition: background 0.2s;
          text-align: center;
        }
        .school-tab.active { background: #0a4f66; }
        .school-tab:hover { background: #0a4f66; }
        .school-card {
          max-width: 1000px; margin: 0 auto;
          background: white;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .school-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          min-height: 260px;
        }
        .school-info { padding: 36px 32px; }
        .school-info h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--teal-dark);
          margin-bottom: 20px;
        }
        .school-info ul { list-style: disc; padding-left: 20px; }
        .school-info li {
          font-size: 0.95rem;
          color: #333;
          padding: 5px 0;
          line-height: 1.5;
        }

        /* APOLLO NETWORK */
        .network-section {
          background: var(--teal-light);
          padding: 60px 20px;
        }
        .network-inner {
          max-width: 900px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: center;
        }
        .network-left { padding: 20px 40px 20px 0; }
        .network-left p { font-size: 1rem; color: #333; line-height: 1.5; margin-bottom: 8px; }
        .network-left h2 {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 900;
          color: var(--teal);
        }
        .network-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-left: 2px solid #b0d4de;
        }
        .net-stat {
          padding: 28px 24px;
          border-bottom: 1px solid #b0d4de;
        }
        .net-stat:nth-child(odd) { border-right: 1px solid #b0d4de; }
        .net-stat .num {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          color: var(--teal);
        }
        .net-stat .lbl { font-size: 0.85rem; color: #555; margin-top: 4px; }

        /* SCHOLARSHIP */
        .scholarship-section {
          background: var(--teal);
          padding: 0;
        }
        .scholarship-inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 420px;
          align-items: center;
        }
        .scholarship-text {
          padding: 60px 40px;
        }
        .scholarship-text .pct {
          display: flex;
          align-items: baseline;
          gap: 10px;
          font-weight: 900;
        }
        .scholarship-text .pct .up {
          font-size: 2rem;
          color: rgba(255,255,255,0.8);
        }
        .scholarship-text .pct span:last-child {
          font-size: clamp(5rem, 10vw, 7rem);
          color: var(--yellow);
          line-height: 1;
        }
        .scholarship-text p {
          font-size: 1.6rem;
          font-weight: 600;
          color: white;
          margin: 20px 0 30px;
        }
        .btn-apply {
          display: inline-block;
          background: var(--yellow);
          color: #0b5c6b;
          font-weight: 800;
          font-size: 1.1rem;
          padding: 16px 42px;
          text-decoration: none;
          letter-spacing: 1px;
          border: none;
          cursor: pointer;
        }
        .scholarship-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* LEICESTER */
        .leicester-section {
          position: relative;
          min-height: 300px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .leicester-bg {
          position: absolute; inset: 0;
          background-image: url(${LEICESTER_IMG});
          background-size: cover; background-position: center;
          filter: brightness(0.5);
        }
        .leicester-box {
          position: relative; z-index: 2;
          background: var(--teal);
          padding: 36px 40px;
          margin: 40px;
          max-width: 480px;
        }
        .leicester-box h3 {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 800;
          color: white;
          margin-bottom: 12px;
        }
        .leicester-box p {
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          color: white;
          font-weight: 600;
        }

        /* FACILITIES */
        .facilities-section {
          background: var(--teal-light);
          padding: 60px 20px;
          text-align: center;
        }
        .facilities-layout {
          max-width: 1100px;
          margin: 40px auto 0;
          position: relative;
        }
        .facility-img img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 4px;
        }
        .facility-list {
          position: absolute;
          left: 40px;
          top: 50%;
          transform: translateY(-50%);
          background: #ffffff;
          width: 320px;
          padding: 20px 0;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          border-radius: 4px;
          text-align: left;
        }
        .facility-item {
          padding: 16px 24px;
          border-bottom: 1px solid #eee;
          font-size: 1rem;
          color: #333;
          cursor: pointer;
          transition: all 0.2s;
        }
        .facility-item.active {
          color: var(--teal);
          font-weight: 700;
          border-bottom: 2px solid var(--teal);
        }
        .facility-item:hover { color: var(--teal); }

        /* ACCREDITATIONS */
        .accred-section {
          background: var(--teal-light);
          padding: 60px 20px;
          text-align: center;
        }
        .accred-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--teal);
          margin-bottom: 50px;
        }
        .accred-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .accred-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .accred-img {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }
        .accred-item span {
          font-size: 0.95rem;
          color: #555;
          max-width: 140px;
        }
        .accred-line {
          margin-top: 40px;
          height: 2px;
          background: #2a7c90;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }

        /* GLOBAL PARTNERS */
        .partners-section { background: var(--teal-light); padding: 60px 20px; }
        .partners-title {
          text-align: center;
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          color: #333;
          margin-bottom: 6px;
        }
        .partners-title strong {
          display: block;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: var(--teal-dark);
        }
        .partners-grid {
          max-width: 1000px; margin: 30px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .partner-card {
          position: relative;
          overflow: hidden;
          height: 200px;
        }
        .partner-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.55);
          transition: filter 0.3s;
        }
        .partner-card:hover img { filter: brightness(0.75); }
        .partner-card span {
          position: absolute;
          bottom: 16px; left: 16px;
          color: white;
          font-weight: 800;
          font-size: clamp(0.85rem, 1.3vw, 1.05rem);
          text-shadow: 0 2px 6px rgba(0,0,0,0.6);
          line-height: 1.3;
        }

        /* RECRUITERS */
        .recruiters-section {
          background: var(--teal-light);
          padding: 80px 20px;
        }
        .recruiters-title {
          text-align: center;
          margin-bottom: 50px;
        }
        .recruiters-title h2 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 900;
          color: var(--teal);
        }
        .recruiters-title p {
          font-size: 1.4rem;
          color: #222;
          margin-top: 5px;
        }
        .recruiters-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px 80px;
          max-width: 900px;
          margin: 0 auto;
          align-items: center;
          justify-items: center;
        }
        .recruiter-logo img {
          max-width: 160px;
          max-height: 70px;
          object-fit: contain;
          transition: transform 0.2s ease;
        }
        .recruiter-logo img:hover { transform: scale(1.05); }

        /* TESTIMONIALS */
        .testimonials-section {
          background: var(--teal-light);
          padding: 60px 20px;
        }
        .testimonials-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--teal);
          text-align: center;
          margin-bottom: 50px;
        }
        .testimonials-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .testimonial-card {
          position: relative;
          background: #f3f3f3;
          padding: 40px 30px 30px;
          border-radius: 4px;
        }
        .t-icon {
          position: absolute;
          top: -25px;
          left: 30px;
          width: 60px;
          height: 60px;
          background: var(--teal);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .t-icon img {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }
        .testimonial-card p {
          font-size: 1rem;
          color: #555;
          line-height: 1.7;
          margin-bottom: 30px;
        }
        .t-name {
          font-size: 1.6rem;
          font-weight: 900;
          color: var(--teal);
          margin-top: 10px;
        }
        .t-prog {
          font-size: 1rem;
          color: var(--teal);
          font-weight: 600;
        }

        /* LIFE */
        .life-section {
          background: var(--teal-light);
          padding: 60px 20px;
          text-align: center;
        }
        .life-single {
          max-width: 700px;
          margin: 30px auto 0;
          border-radius: 6px;
          overflow: hidden;
        }
        .life-single img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        /* FOOTER */
        .footer {
          background: #f3f3f3;
          padding: 20px 0;
        }
        .footer-container {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
          color: #666;
          font-size: 0.9rem;
        }

        /* ── TABLET (≤ 900px) ── */
        @media (max-width: 900px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .about-inner { grid-template-columns: 1fr; }
          .about-side-img { display: none; }
          .edge-grid { grid-template-columns: 1fr; }
          .school-card { grid-template-columns: 1fr; }
          .network-inner { grid-template-columns: 1fr; }
          .network-left { padding: 0 0 20px 0; }
          .network-stats { border-left: none; border-top: 2px solid #b0d4de; }
          .scholarship-inner { grid-template-columns: 1fr; }
          .scholarship-img { display: none; }
          .partners-grid { grid-template-columns: 1fr 1fr; }
          .recruiters-grid { grid-template-columns: repeat(2, 1fr); }
          .testimonials-grid { grid-template-columns: 1fr; }
          .leicester-box { margin: 20px; padding: 24px; }
          .facility-list {
            position: static;
            transform: none;
            width: 100%;
            margin-bottom: 16px;
          }
          .accred-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── MOBILE (≤ 600px) ── */
        @media (max-width: 600px) {

          /* ── HERO MOBILE — split layout ── */
          .hero {
            min-height: auto;
            background: linear-gradient(160deg, #0b1e1e 0%, #0f2d2d 55%, #0d3838 100%);
            display: flex;
            flex-direction: column;
          }

          /* Hide the desktop background image on mobile */
          .hero-bg {
            display: none;
          }

          /* Top portion: text left + girl image right */
          .hero-top-mobile {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            position: relative;
            overflow: hidden;
            min-height: 380px;
          }

          /* Text block on the left */
          .hero-content {
            padding: 76px 16px 24px 16px;
            max-width: 55%;
            flex-shrink: 0;
            z-index: 2;
            position: relative;
          }
          .hero-content h1 {
            font-size: clamp(1.75rem, 7vw, 2.4rem);
            line-height: 1.1;
          }
          .hero-badge {
            padding: 8px 14px;
            font-size: 0.78rem;
            margin-top: 14px;
            letter-spacing: 0.5px;
          }

          /* Girl image — fills right side, full height */
          .hero-girl-mobile {
            display: block;
            position: absolute;
            right: 10px;
            bottom: 0;
            top: 0;
            width: 50%;
            object-fit: cover;
            object-position: top center;
            /* Fade left edge into dark background */
            -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 18%, black 45%);
            mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 18%, black 45%);
          }

          /* Teal diagonal accent strip at bottom of hero-top */
          .hero-top-mobile::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--teal);
          }

          /* Programs bar */
          .hero-programs {
            padding: 10px 14px;
            gap: 3px 8px;
          }
          .hero-programs span {
            font-size: 0.72rem;
          }

          /* Stats: 2 columns */
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-item {
            padding: 14px 8px;
          }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-num { font-size: 1.4rem; }
          .stat-label { font-size: 0.7rem; }

          /* Schools */
          .school-tabs { gap: 4px; }
          .school-tab { padding: 10px 14px; font-size: 0.75rem; }
          .school-info { padding: 24px 20px; }
          .school-info h3 { font-size: 1.1rem; }
          .school-info li { font-size: 0.88rem; }

          /* Partners */
          .partners-grid { grid-template-columns: 1fr 1fr; }

          /* Recruiters */
          .recruiters-grid { grid-template-columns: 1fr 1fr; gap: 20px 30px; }

          /* Section padding */
          .section { padding: 40px 16px; }
          .about-section { padding: 40px 16px; }
          .edge-section { padding: 40px 16px; }
          .schools-section { padding: 40px 16px; }
          .network-section { padding: 40px 16px; }
          .facilities-section { padding: 40px 16px; }
          .accred-section { padding: 40px 16px; }
          .partners-section { padding: 40px 16px; }
          .recruiters-section { padding: 40px 16px; }
          .testimonials-section { padding: 40px 16px; }
          .life-section { padding: 40px 16px; }

          /* Edge */
          .edge-grid { grid-template-columns: 1fr; }
          .edge-item { padding: 20px 16px; gap: 14px; }

          /* Accreditations */
          .accred-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .accred-title { font-size: 1.6rem; margin-bottom: 30px; }

          /* Scholarship */
          .scholarship-inner { grid-template-columns: 1fr; }
          .scholarship-text { padding: 40px 24px; }
          .scholarship-text p { font-size: 1.2rem; }

          /* Network */
          .network-stats { border-left: none; border-top: 2px solid #b0d4de; }
          .net-stat { padding: 20px 16px; }

          /* Testimonials */
          .testimonials-grid { grid-template-columns: 1fr; gap: 50px; }
          .testimonial-card { padding: 40px 20px 24px; }
          .t-name { font-size: 1.3rem; }

          /* Leicester */
          .leicester-box { margin: 16px; padding: 20px; }
          .leicester-section { min-height: 220px; }

          /* Facilities */
          .facility-img img { height: 260px; }

          /* About */
          .about-campus { height: 200px; }
          .about-center h3 { font-size: 1rem; }

          /* Partners */
          .partner-card { height: 140px; }

          /* Recruiters */
          .recruiters-title h2 { font-size: 2rem; }
          .recruiters-title p { font-size: 1.1rem; }
          .recruiter-logo img { max-width: 110px; max-height: 50px; }

          /* Footer */
          .footer { padding: 16px 0; }
          .footer-container { font-size: 0.8rem; }

          /* Enquire FAB on mobile — smaller */
          .enquire-fab-wrap button {
            font-size: 0.68rem;
            padding: 8px 12px;
            letter-spacing: 1.5px;
          }

          /* Logo overlay mobile */
          .logo-overlay {
            padding: 12px 16px;
          }
          .logo-overlay img {
            height: 38px;
          }
        }

        /* ── EXTRA SMALL (≤ 400px) ── */
        @media (max-width: 400px) {
          .hero-top-mobile {
            min-height: 320px;
          }
          .hero-content {
            max-width: 58%;
            padding-top: 68px;
          }
          .hero-content h1 {
            font-size: 1.6rem;
          }
          .hero-girl-mobile {
            width: 48%;
          }
        }
      `}</style>

      {/* ── Form Popup — works on ALL screen sizes ── */}
      <Form isOpen={formOpen} onClose={() => setFormOpen(false)} />

      {/* ── ENQUIRE FAB ── */}
      <div className={`enquire-fab-wrap${showEnquire ? "" : " hidden"}`}>
        <button onClick={() => setFormOpen(true)}>Enquire Now</button>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        {/* Desktop background — hidden on mobile via CSS */}
        <div className="hero-bg" />

        {/* Logo — top left, no header */}
        <div className="logo-overlay">
          <img src={LOGO_IMG} alt="The Apollo University" />
        </div>

        {/*
          Mobile layout wrapper:
          On mobile (≤600px) this becomes a flex row with
          text on the left and girl image on the right.
          On desktop it's transparent — just a wrapper div.
        */}
        <div className="hero-top-mobile">
          {/* Girl image — only visible on mobile */}
          <img
            src="src\assets\banner.webp"
            alt="Apollo University Student"
            className="hero-girl-mobile"
          />

          <div className="hero-content">
            <h1>
              Dream.<br />
              <span>Believe.</span><br />
              Achieve.
            </h1>
            <div className="hero-badge">Merit Based Admissions are Open 2026</div>
          </div>
        </div>

        <div className="hero-programs">
          {["B.TECH.", "M.TECH.", "MBA", "B.Sc.", "M.Sc.", "BPT", "MPT", "MPH", "PG Diploma"].map((p, i, arr) => (
            <span key={p}>{p}{i < arr.length - 1 && <span className="sep">  |  </span>}</span>
          ))}
        </div>
        <div className="hero-stats">
          {[["40+", "Years of Legacy"], ["100%", "Internship Rate"], ["1.4L+", "Stipend"], ["100%", "Placement Assistance"]].map(([num, lbl]) => (
            <div className="stat-item" key={lbl}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about-section">
        <div className="about-inner">
          <img src={STUDENT_LEFT} alt="student" className="about-side-img" />
          <div className="about-center">
            <h2>The Apollo University</h2>
            <h3>A Name You Trust; An Education You Deserve!</h3>
            <p>At The Apollo University, care, code and commerce converge. Powered by healthcare, technology and management, we shape future-ready leaders who innovate with purpose and drive meaningful global impact.</p>
            <img src={CAMPUS_IMG} alt="campus" className="about-campus" />
          </div>
          <img src={STUDENT_RIGHT} alt="lab student" className="about-side-img" />
        </div>
      </section>

      {/* ── APOLLO'S EDGE ── */}
      <section className="edge-section">
        <div className="container">
          <h2 className="section-title">The Apollo University's Edge</h2>
          <div className="edge-grid" style={{ maxWidth: 900, margin: "30px auto 0" }}>
            {[
              ["src/assets/ed1.webp", <><strong>Backed by Apollo Hospitals'</strong><br />40-year legacy</>],
              ["src/assets/ed2.webp", <><strong>Approved under the Andhra Pradesh</strong><br />Private Universities Act</>],
              ["src/assets/ed3.webp", <><strong>Real-world exposure</strong> with<br />The Apollo Group</>],
              ["src/assets/ed4.webp", <>Cross-disciplinary learning in{" "}<strong>Healthcare, Engineering, Management &amp; Pharma</strong></>],
            ].map(([icon, text], i) => (
              <div className="edge-item" key={i}>
                <div className="edge-icon">
                  <img src={icon} alt="icon" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                </div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHOOLS ── */}
      <section className="schools-section">
        <h2 className="section-title">Explore Your Future</h2>
        <p className="section-sub">42 Programmes. Countless Horizons.</p>
        <div className="school-tabs">
          {schools.map((s, i) => (
            <button key={s.key} className={`school-tab${activeSchool === i ? " active" : ""}`} onClick={() => setActiveSchool(i)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="school-card">
          <img src={schools[activeSchool].img} alt={schools[activeSchool].label} />
          <div className="school-info">
            <h3>{schools[activeSchool].label}</h3>
            <ul>
              {schools[activeSchool].courses.map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── APOLLO NETWORK ── */}
      <section className="network-section">
        <div className="network-inner" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="network-left">
            <p>Education Backed by the World's Most Trusted Healthcare Network:</p>
            <h2>Apollo Hospitals Group</h2>
          </div>
          <div className="network-stats">
            {[["72+", "Hospitals"], ["300+", "Clinics"], ["7K+", "Pharmacies"], ["120", "Countries touched\n120 million Lives"]].map(([n, l]) => (
              <div className="net-stat" key={l}>
                <div className="num">{n}</div>
                <div className="lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHOLARSHIP ── */}
      <section className="scholarship-section">
        <div className="scholarship-inner">
          <div className="scholarship-text">
            <div className="pct">
              <span className="up" style={{ fontSize: "1.4rem", color: "white" }}>Up to </span>
              <span>100%</span>
            </div>
            <p>Scholarships for Meritorious Students</p>
            <button className="btn-apply" onClick={() => setFormOpen(true)}>APPLY NOW</button>
          </div>
          <img src={SCHOLARSHIP_IMG} alt="scholarship student" className="scholarship-img" />
        </div>
      </section>

      {/* ── LEICESTER ── */}
      <section className="leicester-section">
        <div className="leicester-bg" />
        <div className="leicester-box">
          <h3>Your Route to a Global Degree at the University Of Leicester</h3>
          <p>2 Years in India + 1 Year in the UK</p>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section className="facilities-section">
        <h2 className="section-title">Infrastructure &amp; Facilities</h2>
        <p className="section-sub">for Next-Gen Breakthroughs</p>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 30, fontSize: "0.9rem" }}>
          A future-ready campus with advanced infrastructure, high-tech labs and rich resources to fuel innovation and research.
        </p>
        <div className="facilities-layout">
          <div className="facility-list">
            {facilities.map((f, i) => (
              <div key={f} className={`facility-item${activeFacility === i ? " active" : ""}`} onClick={() => setActiveFacility(i)}>
                {f}
              </div>
            ))}
          </div>
          <div className="facility-img">
            <img src={HOSTEL_IMG} alt={facilities[activeFacility]} />
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section className="accred-section">
        <div className="container">
          <h2 className="accred-title">Our Accreditations</h2>
          <div className="accred-grid">
            {accreditations.map((a) => (
              <div className="accred-item" key={a.label}>
                <img src={a.img} alt={a.label} className="accred-img" />
                <span>{a.label}</span>
              </div>
            ))}
          </div>
          <div className="accred-line"></div>
        </div>
      </section>

      {/* ── GLOBAL PARTNERS ── */}
      <section className="partners-section">
        <div className="container">
          <p className="partners-title">
            Academic Partnerships That Give You the
            <strong>Global Edge</strong>
          </p>
          <div className="partners-grid">
            {globalPartners.map(p => (
              <div className="partner-card" key={p.name}>
                <img src={p.img} alt={p.name} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECRUITERS ── */}
      <section className="recruiters-section">
        <div className="container">
          <div className="recruiters-title">
            <h2>Get Hired</h2>
            <p>You Aspire to Be</p>
          </div>
          <div className="recruiters-grid">
            {recruiters.map((r) => (
              <div key={r.name} className="recruiter-logo">
                <img src={r.img} alt={r.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="testimonials-title">Voices From Campus</h2>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.name}>
                <div className="t-icon">
                  <img src="src/assets/speaker-icon.webp" alt="icon" />
                </div>
                <p>{t.text}</p>
                <div className="t-name">{t.name}</div>
                <div className="t-prog">{t.prog}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFE BEYOND CAMPUS ── */}
      <section className="life-section">
        <div className="container">
          <h2 className="section-title">Life Beyond Campus</h2>
          <div className="life-single">
            <img src="src/assets/cam.webp" alt="Life Beyond Campus" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-container">
          © 2026 Apollo University. All rights reserved.
        </div>
      </footer>
    </div>
  );
}