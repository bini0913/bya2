import { getSiteUrl } from "./site-url";

export const SITE = {
  name: "Boriyad Youth Academy",
  shortName: "BYA",
  tagline: "Preparing the Future Generations for Success in a changing World!",
  description:
    "Premier KG–Grade 12 international school in Ethiopia. Shaping Ethiopia's next generation of leaders through rigorous academics, character, and global citizenship.",
  get url() {
    return getSiteUrl();
  },
  email: "info@boriyadacademy.edu.et",
  phone: "+251 11 000 0000",
  address: "Addis Ababa, Ethiopia",
  locale: "en_ET",
} as const;

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/student-life", label: "Student Life" },
  { href: "/results", label: "Results" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export const PORTAL_LINKS = [
  { href: "/portal/student", label: "Student Portal", role: "student" },
  { href: "/portal/parent", label: "Parent Portal", role: "parent" },
  { href: "/dashboard/teacher", label: "Teacher", role: "teacher" },
  { href: "/dashboard/admin", label: "Admin", role: "admin" },
] as const;

export const STATS = [
  { value: 98, suffix: "%", label: "University placement rate" },
  { value: 1200, suffix: "+", label: "Students KG–Grade 12" },
  { value: 85, suffix: "+", label: "Expert educators" },
  { value: 15, suffix: "+", label: "Years of excellence" },
] as const;

export const PROGRAMS = [
  {
    title: "Early Years (KG)",
    description: "Play-based inquiry nurturing curiosity, literacy foundations, and social confidence.",
    grades: "KG1–KG3",
  },
  {
    title: "Primary School",
    description: "Core competencies in literacy, numeracy, science, and Ethiopian heritage with global standards.",
    grades: "Grade 1–6",
  },
  {
    title: "Middle School",
    description: "Critical thinking, STEM labs, languages, and leadership through project-based learning.",
    grades: "Grade 7–8",
  },
  {
    title: "High School",
    description: "IGCSE-aligned pathways, university counseling, and competitive exam preparation.",
    grades: "Grade 9–12",
  },
] as const;

export const WHY_BORIYAD = [
  {
    title: "World-Class Faculty",
    description: "Educators trained in international pedagogy with deep commitment to every learner.",
    icon: "graduation-cap",
  },
  {
    title: "Holistic Development",
    description: "Academics balanced with arts, athletics, service, and character formation.",
    icon: "heart-handshake",
  },
  {
    title: "Global Perspective",
    description: "Multilingual environment preparing students for universities worldwide.",
    icon: "globe",
  },
  {
    title: "Proven Outcomes",
    description: "Consistent top national exam results and international university admissions.",
    icon: "trophy",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "BYA gave our daughter the confidence and academic rigor to earn a full scholarship abroad. The teachers truly see each child.",
    name: "Mrs. Almaz T.",
    role: "Parent, Grade 12",
  },
  {
    quote:
      "The science labs and debate program prepared me for university in ways no other school in Addis could match.",
    name: "Daniel M.",
    role: "Alumnus, Class of 2024",
  },
  {
    quote:
      "As an educator, the professional culture and resources here rival international schools I've worked in globally.",
    name: "Dr. Samuel K.",
    role: "Science Department",
  },
] as const;

export const NEWS_ITEMS = [
  {
    slug: "national-science-fair-2025",
    title: "BYA Students Sweep National Science Fair",
    excerpt: "Three gold medals and two special awards at the 2025 National Science Olympiad.",
    date: "2025-03-12",
    category: "Achievement",
  },
  {
    slug: "cambridge-partnership",
    title: "New Cambridge Assessment Partnership",
    excerpt: "Expanded IGCSE pathways and examiner training for our faculty.",
    date: "2025-02-28",
    category: "Academics",
  },
  {
    slug: "open-day-2025",
    title: "Spring Open Day — Register Now",
    excerpt: "Tour our campus, meet faculty, and experience a day at BYA.",
    date: "2025-04-05",
    category: "Admissions",
  },
] as const;

export const ADMISSION_STEPS = [
  { step: 1, title: "Inquiry", description: "Submit the online form or visit our admissions office." },
  { step: 2, title: "Campus Visit", description: "Tour facilities and meet with our academic team." },
  { step: 3, title: "Assessment", description: "Age-appropriate entrance evaluation and interview." },
  { step: 4, title: "Enrollment", description: "Receive offer, complete registration, and join BYA." },
] as const;
