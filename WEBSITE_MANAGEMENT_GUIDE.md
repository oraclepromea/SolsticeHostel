# Solstice Hostel Website Management Guide

## Overview
This guide provides complete instructions for managing your Solstice Hostel website, including GitHub repository management and Netlify deployment.

**Website URL:** [Your Netlify URL]
**GitHub Repository:** [Your GitHub Repository URL]

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [GitHub Repository Management](#github-repository-management)
3. [Making Content Changes](#making-content-changes)
4. [Netlify Website Management](#netlify-website-management)
5. [Common Tasks](#common-tasks)
6. [Troubleshooting](#troubleshooting)
7. [Contact Information](#contact-information)

---

## Getting Started

### What You Need
- GitHub account (free)
- Basic text editing skills
- Web browser (Chrome, Firefox, Safari, or Edge)

### Your Website Components
- **GitHub Repository**: Stores all your website files
- **Netlify**: Automatically deploys your website from GitHub
- **Custom Domain** (if applicable): Your personalized web address

---

## GitHub Repository Management

### Accessing Your Repository
1. Go to [GitHub.com](https://github.com)
2. Sign in to your account
3. Navigate to your repository: `[username]/SolsticeHostel`

### Repository Structure
```
├── index.html          # Main website file
├── styles.css          # Website styling
├── script.js           # Website functionality
├── images/             # All website images
└── README.md           # This documentation
```

### Making Changes via GitHub Web Interface

#### Method 1: Direct File Editing
1. Click on the file you want to edit (e.g., `index.html`)
2. Click the pencil icon (✏️) to edit
3. Make your changes
4. Scroll down to "Commit changes"
5. Add a descriptive message (e.g., "Update contact phone number")
6. Click "Commit changes"

#### Method 2: Upload New Files
1. Click "Add file" → "Upload files"
2. Drag and drop your files
3. Add commit message
4. Click "Commit changes"

---

## Making Content Changes

### Updating Text Content

#### Changing Prices
**File:** `index.html`
**Location:** Look for `<span class="price">BOB XX.XX</span>`

```html
<!-- Example: Change room price -->
<span class="price">BOB 85.00</span>
```

#### Updating Contact Information
**File:** `index.html`
**Section:** Contact section

```html
<!-- Phone number -->
<p>+591 77520065</p>

<!-- Email -->
<p>info@solsticehostel.bo</p>

<!-- Address -->
<p>Copacabana, Bolivia<br>Near Lake Titicaca</p>
```

#### Modifying Room Descriptions
**File:** `index.html`
**Section:** Accommodations section

```html
<!-- Room title (English/Spanish) -->
<h3 data-en="Standard Single Private Ensuite" data-es="Habitación Individual Privada con Baño">
```

### Language Management
Your website supports English and Spanish. All text uses this format:
```html
<element data-en="English text" data-es="Spanish text">English text</element>
```

**To update bilingual content:**
1. Find the element you want to change
2. Update both `data-en` (English) and `data-es` (Spanish) attributes
3. Update the display text (usually matches English)

### Adding New Images

#### Step 1: Prepare Images
- **Recommended sizes:**
  - Room photos: 800x600px
  - Gallery images: 1200x800px
  - Maximum file size: 500KB each
- **Formats:** JPG, PNG, WebP
- **Naming:** Use descriptive names (e.g., `new-room-2025.jpg`)

#### Step 2: Upload to GitHub
1. Go to the `images/` folder in your repository
2. Click "Add file" → "Upload files"
3. Drag your images into the upload area
4. Commit with message like "Add new room photos"

#### Step 3: Update HTML
Add your image to the appropriate section in `index.html`:
```html
<!-- For room cards -->
<img src="images/your-new-image.jpg" alt="Description of image">

<!-- For galleries -->
<img src="images/your-new-image.jpg" alt="Description" class="gallery-slide">
```

---

## Netlify Website Management

### Accessing Netlify Dashboard
1. Go to [Netlify.com](https://netlify.com)
2. Sign in to your account
3. Find your "Solstice Hostel" site

### Understanding Automatic Deployment
- **Automatic**: Every time you make changes to GitHub, Netlify automatically updates your website
- **Deploy time**: Usually 2-5 minutes
- **Status**: Check the "Deploys" tab to see if updates are successful

### Custom Domain Management
If you have a custom domain (e.g., www.solsticehostel.com):

1. Go to "Domain settings" in Netlify
2. View your current domain configuration
3. To change domains, contact your web developer

### SSL Certificate
Your website automatically has HTTPS security. If you see SSL warnings:
1. Check "Domain settings" → "HTTPS"
2. Ensure "Force HTTPS" is enabled

---

## Common Tasks

### 1. Update Room Prices
**Frequency:** As needed
**Files to edit:** `index.html`

1. Find the room section
2. Locate `<span class="price">BOB XX.XX</span>`
3. Update the price
4. Commit changes
5. Wait 2-5 minutes for website to update

### 2. Change Contact Information
**Files to edit:** `index.html`

1. Find the contact section (Ctrl+F "contact")
2. Update phone, email, or address
3. Remember to update both English and Spanish versions
4. Commit changes

### 3. Add Seasonal Promotions
**Location:** Hero section or contact section

1. Find a suitable location in `index.html`
2. Add your promotional text
3. Use the bilingual format for Spanish translation
4. Commit changes

### 4. Update Breakfast Menu
**Location:** Breakfast section in `index.html`

1. Find the breakfast list items (`<li>` tags)
2. Modify existing items or add new ones
3. Ensure both languages are updated
4. Commit changes

### 5. Modify Amenities
**Location:** Amenities section

1. Find the amenity items
2. Update descriptions or add new amenities
3. Use Font Awesome icons (fontawesome.com) for new items
4. Update both languages

---

## Troubleshooting

### Website Not Updating After Changes
1. Check Netlify deploy status (should show "Published")
2. Wait 5-10 minutes for changes to propagate
3. Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
4. Try viewing in incognito/private browsing mode

### Images Not Displaying
1. Verify image was uploaded to `images/` folder
2. Check file name spelling in HTML exactly matches uploaded file
3. Ensure image file size is under 1MB
4. Try a different image format (JPG instead of PNG)

### Language Switching Not Working
1. Verify both `data-en` and `data-es` attributes are present
2. Check that text is properly formatted
3. Clear browser cache and try again

### Broken Links
1. Check that all internal links start with `#` (e.g., `#contact`)
2. Verify external links include `http://` or `https://`
3. Test all links after making changes

---

## Content Update Schedule Recommendations

### Monthly Updates
- [ ] Review and update room prices
- [ ] Check all contact information
- [ ] Verify booking links work
- [ ] Test language switching

### Seasonal Updates
- [ ] Update breakfast menu items
- [ ] Add seasonal activities or attractions
- [ ] Update transportation information
- [ ] Refresh gallery images

### As Needed
- [ ] Add new room photos
- [ ] Update amenities list
- [ ] Modify promotional content
- [ ] Update social media links

---

## Best Practices

### Making Changes
1. **Always test locally first** if possible
2. **Make small changes** one at a time
3. **Use descriptive commit messages**
4. **Keep backup of important content**
5. **Update both languages** for any text changes

### Content Guidelines
1. **Keep descriptions concise** and appealing
2. **Use high-quality images** under 500KB
3. **Maintain consistent pricing** format
4. **Update contact info** immediately when changed
5. **Test booking links** regularly

### Security
1. **Never share** GitHub login credentials
2. **Use strong passwords** for all accounts
3. **Enable two-factor authentication** when possible
4. **Only make necessary changes**

---

## Emergency Contacts

### Technical Issues
- **Web Developer:** [Your contact information]
- **Response time:** 24-48 hours
- **Emergency contact:** [Emergency contact if needed]

### Quick Fixes You Can Do
- Update text content
- Change prices
- Upload new images
- Update contact information

### Issues Requiring Developer Help
- Website completely down
- Major layout problems
- Adding new sections
- Custom functionality changes
- Domain/SSL issues

---

## File Reference Guide

### Key Files and Their Purpose

#### `index.html`
- **Purpose:** Main website content
- **Contains:** All text, structure, and content
- **Safe to edit:** Text content, prices, contact info
- **Be careful with:** HTML tags, structure

#### `styles.css`
- **Purpose:** Website appearance and design
- **Contains:** Colors, fonts, layouts
- **Recommendation:** Contact developer for changes

#### `script.js`
- **Purpose:** Website functionality
- **Contains:** Interactive features, language switching
- **Recommendation:** Contact developer for changes

#### `images/`
- **Purpose:** All website images
- **Safe to edit:** Add new images, replace existing ones
- **File types:** JPG, PNG, WebP

---

## Useful Resources

### Learning Resources
- [GitHub Basics](https://docs.github.com/en/get-started)
- [HTML Basics](https://www.w3schools.com/html/)
- [Netlify Documentation](https://docs.netlify.com/)

### Tools
- [Font Awesome Icons](https://fontawesome.com/icons) - For amenity icons
- [TinyPNG](https://tinypng.com/) - Image compression
- [Google Fonts](https://fonts.google.com/) - Typography options

---

## Backup and Recovery

### Regular Backups
GitHub automatically maintains version history, but for extra safety:

1. **Download repository occasionally:**
   - Go to your repository
   - Click "Code" → "Download ZIP"
   - Store safely on your computer

2. **Keep content copies:**
   - Maintain a document with key information
   - Save copies of important images
   - Note any custom changes made

### Recovery Process
If something goes wrong:
1. Contact your web developer immediately
2. Provide details of what was changed
3. GitHub maintains full history for recovery

---

## Success Tips

1. **Start small** - Make minor changes first to get comfortable
2. **Test everything** - Check the website after each change
3. **Keep it simple** - Stick to content updates initially
4. **Document changes** - Keep notes of what you've modified
5. **Ask for help** - Contact developer for complex changes

---

**Last Updated:** January 2025
**Version:** 1.0

For technical support or questions about this guide, contact your web developer.