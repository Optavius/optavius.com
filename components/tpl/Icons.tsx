/** Line icons in the site's 24px, 2px-stroke style. */
const P: Record<string, string> = {
  phone: "M5 4h3.5l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2 4.5 1.5V19a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z",
  calendar: "M4 8h16M8 3v3m8-3v3M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm3 8h2m3 0h2m-7 4h2m3 0h2",
  shield: "M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6L12 3Zm-3 9 2 2 4-4",
  eye: "M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Zm9.5 2.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z",
  checklist: "M11.5 16.5H20.5M11.5 7.5H20.5M3.5 8L5.5 9.5L8.5 5M3.5 17L5.5 18.5L8.5 14",
  reverse: "M19.5 4V8H15.5M5 20.5V16.5H9M4 12.25C4 7.7 7.7 4 12.25 4c2.8 0 5.3 1.4 6.8 3.5M20.5 12.25c0 4.55-3.7 8.25-8.25 8.25-2.75 0-5.25-1.35-6.75-3.4",
  chat: "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-7Z",
  sms: "M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V6a1 1 0 0 1 1-1Zm3 4h8m-8 3h5",
  user: "M15.75 6.66a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.4c.4-3.9 3.2-7 7.5-7s7.1 3.1 7.5 7h-15Z",
  lock: "M7 10V8a5 5 0 0 1 10 0v2M6 10h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm6 4v3",
  sun: "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M5.6 18.4 7 17m10-10 1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  inbox: "M4 13h4l1.5 3h5L16 13h4M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  status: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v4l3 2",
  chart: "M4 19h16M7 16v-5m5 5V8m5 8v-3",
  pause: "M8 5v14m8-14v14",
  search: "M20 20l-3.95-3.95M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  undo: "M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3",
  plug: "M9 3v5m6-5v5M7 8h10v3a5 5 0 0 1-10 0V8Zm5 8v5",
  doc: "M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h5m-5 4h5",
  trend: "M16 7h5v5m-.5-4.5L13 15l-4-4-6 6",
  sparkles: "M13 7c0 4.6 2.4 7 7 8-4.6 1-7 3.4-7 8 0-4.6-2.4-7-7-8 4.6-1 7-3.4 7-8ZM5.5 5c0 1.9.6 2.5 2.5 2.5-1.9 0-2.5.6-2.5 2.5 0-1.9-.6-2.5-2.5-2.5 1.9 0 2.5-.6 2.5-2.5Z",
  flag: "M6 21V4m0 0h11l-2.5 4L17 12H6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  clock: "M12 7v5l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  bolt: "M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z",
  marker: "M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  heart: "M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 2.5c0 5.1-7 9.5-7 9.5Z",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 9c.5-3.5 2.8-5.5 6-5.5s5.5 2 6 5.5M15 5.5a3 3 0 0 1 0 5.5m2.5 3.5c1.8.6 2.9 2.1 3.2 4.5",
  star: "M12 3l2.6 5.5 6 .7-4.4 4.1 1.2 6L12 16.4 6.6 19.3l1.2-6L3.4 9.2l6-.7L12 3Z",
  growth: "M12 12V11C12 7.13 8.87 4 5 4H4V5C4 8.87 7.13 12 11 12H12ZM12 12V14M12 15H13C16.87 15 20 11.87 20 8V7H19C15.13 7 12 10.13 12 14M12 15V14M12 15V20",
  ghost: "M20.4 12a8.4 8.4 0 1 0-16.8 0c0 3.2-.3 5.4-.5 6.8l1.9-1c1.3-.6 2.8-.6 4.1.1l.6.3c1.3.7 2.8.7 4.1 0 1.5-.8 3.3-.7 4.7.4l.6.5c.3-1 1.3-4.2 1.3-7.1ZM9.6 12.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4.8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const d = P[name] || P.sparkles;
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon-name={name} className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const Chevron = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chevron" className={className}>
    <path d="M20 9L12 17L4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);
export const ArrowUp = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon-name="arrow-right-up" className={className}>
    <path d="M6 10L12 4L18 10M12 5V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);
