// Tooltip animation with GSAP
const initTooltips = () => {
  // Get all tooltip triggers
  const tooltipTriggers = document.querySelectorAll(".custom-tooltip-trigger");

  // Check if we're on mobile/tablet
  const isMobileOrTablet = () => window.innerWidth <= 991;

  tooltipTriggers.forEach((trigger) => {
    // Find the associated tooltip as a next sibling
    const tooltip = trigger.nextElementSibling;

    if (!tooltip || !tooltip.classList.contains("custom-tooltip")) {
      console.warn("No tooltip found for trigger:", trigger);
      return;
    }

    const setInitialState = () => {
      if (isMobileOrTablet()) {
        gsap.set(tooltip, {
          opacity: 0,
          display: "none",
          scale: 0.95,
          xPercent: -50,
          transformOrigin: "top center",
        });
      } else {
        gsap.set(tooltip, {
          opacity: 0,
          display: "none",
          scale: 0.95,
          transformOrigin: "top right",
        });
      }
    };

    // Set initial state
    setInitialState();

    // Create hover animation timeline
    const createTimeline = () => {
      const tl = gsap.timeline({ paused: true });

      tl.to(tooltip, {
        duration: 0.3,
        display: "block",
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        onStart: () => tooltip.classList.add("is-visible"),
        onReverseComplete: () => tooltip.classList.remove("is-visible"),
      });

      return tl;
    };

    let tl = createTimeline();

    // Handle window resize
    window.addEventListener("resize", () => {
      tl.kill();
      setInitialState();
      tl = createTimeline();
    });

    // Add hover event listeners for desktop
    if (!isMobileOrTablet()) {
      trigger.addEventListener("mouseenter", () => {
        tl.play();
      });

      trigger.addEventListener("mouseleave", () => {
        tl.reverse();
      });
    }

    // Add click handler for mobile/touch devices
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!tooltip.classList.contains("is-visible")) {
        tl.play();
      } else {
        tl.reverse();
      }
    });

    // Close tooltip when clicking outside
    document.addEventListener("click", (e) => {
      if (!trigger.contains(e.target) && !tooltip.contains(e.target)) {
        tl.reverse();
      }
    });
  });
};

// Initialize tooltips when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTooltips);
} else {
  initTooltips();
}

// Debug log to confirm script is running
console.log("Tooltip script loaded");
