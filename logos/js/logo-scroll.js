/**
 * Logo scroll animation for company items
 * Animates logos sliding up when they enter the viewport with staggered timing
 * Responsive layout:
 * - Desktop: 6 items per row
 * - Tablet: Handled by Webflow breakpoints
 * - Mobile: Handled by Webflow breakpoints
 */
function initLogoScroll() {
  if (typeof gsap === "undefined") return;

  // Target all company wrappers
  const companyWrappers = document.querySelectorAll(".company-wrapper");

  // Get items per row based on viewport
  // Note: Layout is controlled by Webflow's grid system
  // We just need to match the animation to the visual layout
  const ITEMS_PER_ROW = 6;

  // Group companies into virtual rows
  const rows = [];
  for (let i = 0; i < companyWrappers.length; i += ITEMS_PER_ROW) {
    rows.push(Array.from(companyWrappers).slice(i, i + ITEMS_PER_ROW));
  }

  // Set initial state for all companies
  gsap.set(companyWrappers, {
    y: 50,
    opacity: 0,
  });

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find which row this company belongs to
          const company = entry.target;
          const rowIndex = Math.floor(Array.from(companyWrappers).indexOf(company) / ITEMS_PER_ROW);
          const rowCompanies = rows[rowIndex];

          // Animate all companies in this virtual row
          gsap.to(rowCompanies, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: {
              amount: 0.6, // Increased slightly for more visible stagger with 6 items
              from: "start",
            },
          });

          // Unobserve all companies in this row
          rowCompanies.forEach((comp) => observer.unobserve(comp));
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "50px",
    }
  );

  // Observe all company wrappers
  companyWrappers.forEach((wrapper) => {
    observer.observe(wrapper);
  });
}

// Initialize when document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLogoScroll);
} else {
  initLogoScroll();
}
