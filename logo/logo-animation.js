/**
 * Brightwing Capital - Logo Animation
 * Inspired by Greenoaks animations
 */

// Initialize when document is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  // Initialize various logo animations
  initLogoEntrance();
  initLogoHover();
  initLogoScrollTransition();
});

/**
 * Logo entrance animation on page load
 */
function initLogoEntrance() {
  if (typeof gsap === "undefined") {
    console.error("GSAP is required for logo animations");
    return;
  }

  // Target logo elements
  const logoContainer = document.querySelector(".logo-container");
  if (!logoContainer) return;

  const logoSVG = logoContainer.querySelector("svg");
  if (!logoSVG) return;

  // Get all diamond paths
  const diamonds = logoSVG.querySelectorAll('path[id^="diamond"]');

  // Create timeline for entrance animation
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.8,
    },
  });

  // Initial state - all diamonds invisible and scaled down slightly
  gsap.set(diamonds, {
    opacity: 0,
    scale: 0.8,
    transformOrigin: "center center",
  });

  // Animate each diamond in sequence
  tl.to(diamonds, {
    opacity: 1,
    scale: 1,
    stagger: 0.15,
    duration: 0.8,
  });

  // Optional ending flourish - subtle bounce
  tl.to(
    diamonds,
    {
      y: -5,
      stagger: 0.05,
      duration: 0.3,
    },
    "-=0.2"
  ).to(
    diamonds,
    {
      y: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out",
    },
    "-=0.1"
  );
}

/**
 * Logo hover animation
 */
function initLogoHover() {
  if (typeof gsap === "undefined") return;

  // Target logo container
  const logoContainer = document.querySelector(".logo-container");
  if (!logoContainer) return;

  const logoSVG = logoContainer.querySelector("svg");
  if (!logoSVG) return;

  // Get all diamond paths
  const diamonds = logoSVG.querySelectorAll('path[id^="diamond"]');

  // Create hover timeline (paused initially)
  const hoverTl = gsap.timeline({ paused: true });

  // Subtle rotation and scale effect
  hoverTl
    .to(diamonds, {
      rotation: 10,
      scale: 1.05,
      stagger: 0.03,
      transformOrigin: "center center",
      duration: 0.4,
      ease: "power2.out",
    })
    .to(
      diamonds,
      {
        rotation: 0,
        scale: 1,
        stagger: 0.03,
        duration: 0.4,
        ease: "power2.inOut",
      },
      "+=0.1"
    );

  // Add hover event listeners
  logoContainer.addEventListener("mouseenter", () => {
    hoverTl.restart();
  });
}

/**
 * Logo color transition on scroll
 * Similar to Greenoaks.com behavior
 */
function initLogoScrollTransition() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP and/or ScrollTrigger not loaded. Scroll transition disabled.");
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Target logo containers (one for header, one for fixed navigation if exists)
  const logoContainers = document.querySelectorAll(".logo-container, .fixed-nav-logo");

  logoContainers.forEach((container) => {
    // Get primary logo (single tone)
    const primaryLogo = container.querySelector(".logo-single");
    // Get accent logo (color version)
    const accentLogo = container.querySelector(".logo-color");

    if (!primaryLogo || !accentLogo) return;

    // Initial state - primary logo visible, accent logo invisible
    gsap.set(primaryLogo, { opacity: 1 });
    gsap.set(accentLogo, { opacity: 0 });

    // Create scroll trigger for logo transition
    ScrollTrigger.create({
      trigger: ".hero-section", // Adjust based on your site structure
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        // Crossfade between logos based on scroll position
        gsap.to(primaryLogo, {
          opacity: 1 - self.progress,
          duration: 0.3,
        });
        gsap.to(accentLogo, {
          opacity: self.progress,
          duration: 0.3,
        });

        // Optional: Add subtle rotation based on scroll
        const rotationAmount = 5 * self.progress;
        gsap.to(
          [primaryLogo, accentLogo].map((logo) => logo.querySelectorAll("path")),
          {
            rotation: rotationAmount,
            transformOrigin: "center center",
            duration: 0.3,
          }
        );
      },
    });
  });
}

/**
 * Advanced path tracing animation (optional)
 * Uncomment and use if you want a drawing effect
 */
/*
function initPathTraceAnimation() {
  if (typeof gsap === 'undefined') return;
  
  const logoSVG = document.querySelector('.logo-container svg');
  if (!logoSVG) return;
  
  // Get all paths
  const paths = logoSVG.querySelectorAll('path');
  
  // Set up each path for drawing animation
  paths.forEach(path => {
    // Get path length
    const length = path.getTotalLength();
    
    // Set up initial state - path invisible
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0,
      fill: 'transparent',
      stroke: path.getAttribute('fill'),
      strokeWidth: 2
    });
  });
  
  // Create animation timeline
  const tl = gsap.timeline();
  
  // Draw each path
  tl.to(paths, {
    strokeDashoffset: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 1,
    ease: "power2.inOut"
  })
  // Fill paths
  .to(paths, {
    fill: paths.map(path => path.getAttribute('stroke')),
    strokeWidth: 0,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.inOut"
  }, "-=0.3");
}
*/
