# Logo Hover Effect Implementation

This implementation recreates the Greenoaks-style logo hover effect with grayscale-to-color transition and subtle scaling using GSAP.

## Setup Instructions for Webflow

### 1. Structure Setup in Webflow Designer

1. Create a new Section element
2. Inside the section, add a new Div block
   - Add class: `company-logo-grid`
3. For each logo:
   - Add a Div block with class: `logo-wrapper`
   - Inside each wrapper, add an Image element with class: `company-logo`
   - Set image dimensions appropriately (recommended max-height: 60px)

### 2. Style Configuration

1. Copy the styles from `webflow-config.json` into your Webflow project:
   - Open the Style panel in Webflow
   - For each class (`company-logo-grid`, `logo-wrapper`, `company-logo`), create the class and copy the corresponding styles
   - You can directly copy-paste the values from the JSON file into the corresponding fields in Webflow

### 3. Adding Required Scripts

1. In your Webflow project settings, go to Custom Code
2. In the Head Code section, add:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
   ```

### 4. Adding the Custom Code

1. Host the `logo-hover.js` and `logo-hover.css` files on your preferred hosting service (e.g., your own server or a CDN)
2. In Webflow project settings > Custom Code:
   - Head section: Add the CSS link
   - Body section: Add the JavaScript script tag
   - Update the paths in the script and link tags to point to your hosted files

## Customization Options

### Adjusting the Animation

To modify the animation in `logo-hover.js`:

- `duration`: Change the 0.5 value to adjust animation speed
- `scale`: Modify 1.05 to adjust hover zoom level
- `filter`: Adjust grayscale, brightness, and contrast values
- `ease`: Change the easing function (see GSAP documentation for options)

### Adjusting the Grid Layout

In the `company-logo-grid` class:

- Modify `grid-template-columns` to change the number of logos per row
- Adjust `gap` to change spacing between logos
- Change `max-width` to adjust the overall grid width

## Troubleshooting

1. If logos appear stretched:

   - Check that images have proper dimensions
   - Verify the `object-fit: contain` property is applied

2. If animations aren't working:

   - Verify GSAP is properly loaded
   - Check browser console for errors
   - Ensure class names match exactly

3. If grid layout isn't responsive:
   - Check that all parent containers are properly sized
   - Verify media queries are working as expected

## Browser Support

- Works in all modern browsers
- Requires GSAP 3.x
- CSS Grid support required (all modern browsers)
