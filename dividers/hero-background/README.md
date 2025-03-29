# Brightwing Hero Background Pattern

A simple CSS-based implementation of the Brightwing hero background pattern with angular edge divider. This implementation uses CSS with encoded SVGs for maximum compatibility with Webflow and other platforms.

## How to Use

### In Webflow

1. **Add CSS to Your Project**

   - Go to Project Settings → Custom Code
   - Add the contents of `hero-background.css` to the Head Code section

2. **Create HTML Structure**

   ```html
   <div class="hero-section">
     <div class="hero-bg"></div>
     <div class="hero-content">
       <!-- Your content goes here -->
     </div>
   </div>
   ```

3. **Style Your Section**
   - The hero-section should have a minimum height (500px recommended)
   - The background and edge will automatically scale to fill the section
   - All content inside hero-content will appear above the pattern

### HTML Structure Explained

- `hero-section`: Container for the entire hero area
- `hero-bg`: Container for the background pattern and edge divider
- `hero-content`: Container for your actual content

## Customization

### Theme Options

Add these classes to the `hero-bg` element to change themes:

- **Default** (No additional class): Muted orange background with white pattern
- **Light Theme**: `class="hero-bg light-theme"` - Light background with muted orange pattern
- **Dark Theme**: `class="hero-bg dark-theme"` - Dark background with muted orange pattern

### Custom Colors

To customize colors further, you can override these CSS properties:

```css
/* Example: Customize the default theme */
.hero-bg {
  background-color: #yourColor; /* Change background color */
}

/* Create your own theme */
.hero-bg.custom-theme {
  background-color: #yourBackgroundColor;
}

.hero-bg.custom-theme::before {
  /* Create a custom pattern color by replacing all instances of the color in the SVG */
}

.hero-bg.custom-theme::after {
  /* Create a custom edge color by replacing all instances of the color in the SVG */
}
```

## Features

- Animated background pattern with subtle pulsing lines
- Angular edge divider at the bottom
- Three built-in theme options
- Mobile-friendly (automatically scales)
- Respects user preferences for reduced motion
- Pure CSS implementation with no JavaScript dependencies
- Compatible with all modern browsers

## Notes

- The animation speed and pattern size can be adjusted in the CSS
- For taller sections, you may want to increase the pattern size
- The edge divider height is fixed at 48px
