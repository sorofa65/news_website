// Sample page data (would normally come from a JSON file or API)
const pageData = {
    pages: [
        {
            id: 1,
            slug: "about-us",
            title: "About Global News Network",
            description: "Learn about our mission, team, and journalistic standards",
            content: `
                <h2>Our Mission</h2>
                <p>Global News Network is committed to delivering accurate, unbiased news from around the world. We believe in the power of information to create positive change.</p>
                
                <h2>Our Team</h2>
                <p>With over 200 journalists in 50 countries, our team brings you stories that matter from every corner of the globe.</p>
                
                <h2>Journalistic Standards</h2>
                <p>We adhere to the highest standards of journalism, with rigorous fact-checking and editorial independence.</p>
            `,
            relatedPages: [
                { title: "Contact Us", slug: "contact" },
                { title: "Careers", slug: "careers" },
                { title: "Editorial Policy", slug: "editorial-policy" }
            ]
        },
        {
            id: 2,
            slug: "contact",
            title: "Contact Global News Network",
            description: "How to reach our editorial and business teams",
            content: `
                <h2>Editorial Inquiries</h2>
                <p>Email: <a href="mailto:editorial@globalnews.com">editorial@globalnews.com</a></p>
                <p>Phone: +1 (555) 123-4567</p>
                
                <h2>Business Inquiries</h2>
                <p>Email: <a href="mailto:business@globalnews.com">business@globalnews.com</a></p>
                
                <h2>Headquarters</h2>
                <p>123 News Avenue<br>Media City, NY 10001<br>United States</p>
            `,
            relatedPages: [
                { title: "About Us", slug: "about-us" },
                { title: "Advertise", slug: "advertise" }
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    // Search toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('.search-box');
    
    searchToggle.addEventListener('click', function() {
        searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
    });

    // Get page slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const pageSlug = urlParams.get('slug') || window.location.pathname.split('/').pop().replace('.html', '');

    // Find the page
    const page = pageData.pages.find(p => p.slug === pageSlug);

    if (page) {
        // Update page title and meta description
        document.getElementById('page-title').textContent = `${page.title} | Global News Network`;
        document.getElementById('page-description').content = page.description;
        
        // Display page content
        document.getElementById('dynamic-page-title').textContent = page.title;
        document.getElementById('dynamic-page-body').innerHTML = page.content;

        // Display related pages if they exist
        if (page.relatedPages && page.relatedPages.length > 0) {
            const relatedContainer = document.getElementById('related-pages-grid');
            
            page.relatedPages.forEach(related => {
                const relatedPage = document.createElement('article');
                relatedPage.className = 'news-card';
                relatedPage.innerHTML = `
                    <div class="card-content">
                        <h3><a href="page.html?slug=${related.slug}">${related.title}</a></h3>
                        <a href="page.html?slug=${related.slug}" class="read-more">Read More</a>
                    </div>
                `;
                relatedContainer.appendChild(relatedPage);
            });
        } else {
            document.getElementById('related-pages').style.display = 'none';
        }
    } else {
        // Page not found
        document.getElementById('dynamic-page-title').textContent = 'Page Not Found';
        document.getElementById('dynamic-page-body').innerHTML = `
            <p>The page you requested could not be found.</p>
            <a href="index.html" class="read-more">Return to Homepage</a>
        `;
        document.getElementById('related-pages').style.display = 'none';
    }
});