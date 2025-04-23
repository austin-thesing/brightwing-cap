// Tooltip animation with GSAP
const initTooltips = () => {
  // Get all tooltip triggers
  const tooltipTriggers = document.querySelectorAll(".custom-tooltip-trigger");

  // Check screen size categories
  const isTablet = () => window.innerWidth <= 991 && window.innerWidth >= 768;
  const isMobile = () => window.innerWidth <= 767;
  const isDesktop = () => window.innerWidth > 991; // Added for clarity

  tooltipTriggers.forEach((trigger) => {
    // Find the associated tooltip as a next sibling
    const tooltip = trigger.nextElementSibling;

    if (!tooltip || !tooltip.classList.contains("custom-tooltip")) {
      console.warn("No tooltip found for trigger:", trigger);
      return;
    }

    // Variable to hold the close timer
    let closeTimeout;

    const clearCloseTimeout = () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
    };

    const startCloseTimeout = () => {
      clearCloseTimeout(); // Clear any existing timer first
      closeTimeout = setTimeout(() => {
        // Only reverse if the tooltip is actually visible
        if (tooltip.classList.contains("is-visible")) {
          tl.reverse();
        }
      }, 200); // Delay in milliseconds (adjust as needed)
    };

    const setInitialState = () => {
      // Clear any active animations/timeouts before resetting state
      clearCloseTimeout();
      if (tl) tl.kill(); // Kill existing timeline if resizing

      if (isTablet()) {
        // Check specifically for tablet
        gsap.set(tooltip, {
          opacity: 0,
          display: "none",
          scale: 0.95,
          // NO xPercent needed, using right alignment
          transformOrigin: "top right", // Use top-right origin like desktop
        });
      } else if (isMobile()) {
        // Check specifically for mobile
        gsap.set(tooltip, {
          opacity: 0,
          display: "none",
          scale: 0.95,
          // NO xPercent on mobile, CSS handles positioning
          transformOrigin: "top center", // Mobile uses top center
        });
      } else {
        // Desktop
        gsap.set(tooltip, {
          opacity: 0,
          display: "none",
          scale: 0.95,
          // No xPercent needed here either
          transformOrigin: "top right", // Desktop uses top right
        });
      }
    };

    // Create hover animation timeline function (remains the same)
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

    // --- Initial Setup ---
    let tl; // Declare timeline variable
    setInitialState(); // Set initial state based on current size
    tl = createTimeline(); // Create the initial timeline

    // --- Event Listeners ---

    // Handle window resize
    window.addEventListener("resize", () => {
      // Debounce resize slightly if needed, but for now direct call
      setInitialState(); // Reset state according to new size
      tl = createTimeline(); // Recreate timeline for new state
      // Re-attach listeners based on new size? No, structure handles it.
    });

    // Add hover event listeners for desktop
    if (isDesktop()) {
      // Use the specific check
      [trigger, tooltip].forEach((element) => {
        element.addEventListener("mouseenter", () => {
          clearCloseTimeout(); // Clear timer if mouse enters trigger or tooltip
          // Only play if it's not already playing or visible
          if (!tl.isActive() && !tooltip.classList.contains("is-visible")) {
            tl.play();
          }
        });

        element.addEventListener("mouseleave", () => {
          startCloseTimeout(); // Start timer when mouse leaves trigger or tooltip
        });
      });
    } else {
      // Mobile OR Tablet uses click
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        clearCloseTimeout(); // Clear any stray timeouts on click

        const isVisible = tooltip.classList.contains("is-visible");
        console.log(`Trigger clicked. Tooltip isVisible: ${isVisible}, Timeline active: ${tl.isActive()}, Progress: ${tl.progress()}`); // Debug log

        if (!isVisible) {
          console.log("Attempting to play timeline..."); // Debug log
          // Ensure timeline is reset and ready to play forward
          tl.progress(0).invalidate(); // Reset progress and clear recorded values
          tl.play();
        } else {
          console.log("Attempting to reverse timeline..."); // Debug log
          // If closing, ensure it reverses smoothly
          tl.reverse();
        }
      });
    }

    // Close tooltip when clicking outside (applies to all modes)
    document.addEventListener("click", (e) => {
      // Check if the click is outside both trigger and tooltip
      if (!trigger.contains(e.target) && !tooltip.contains(e.target)) {
        // Only reverse if it's visible
        if (tooltip.classList.contains("is-visible")) {
          clearCloseTimeout(); // Clear any pending hover-based close
          tl.reverse();
        }
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
console.log("Tooltip script loaded and updated");
