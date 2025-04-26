// Sample data (would normally come from your news.json)
const newsData = {
    articles: [
        {
            id: 1,
            title: "Global Leaders Agree on New Climate Initiative",
            slug: "climate-summit-agreement",
            excerpt: "World leaders reach landmark agreement on carbon emissions",
            content: "...",
            category: "world",
            date: "2023-06-15",
            author: "Sarah Johnson",
            image: "https://source.unsplash.com/random/800x600/?climate",
            featured: true,
            readTime: "5 min read",
            views: 12543
        },
        {
            id: 2,
            title: "Senate Approves Controversial Infrastructure Bill",
            slug: "senate-infrastructure-bill",
            excerpt: "The bill passed with bipartisan support",
            content: "...",
            category: "politics",
            date: "2023-06-14",
            author: "Michael Chen",
            image: "https://source.unsplash.com/random/800x600/?senate",
            featured: false,
            readTime: "3 min read",
            views: 8432
        },
        // More articles...
    ]
};

// Category display names
const categoryNames = {
    world: "World News",
    politics: "Politics",
    business: "Business",
    technology: "Technology",
    science: "Science",
    health: "Health",
    sports: "Sports",
    entertainment: "Entertainment"
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

    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');

    if (category && categoryNames[category]) {
        // Update page title and heading
        const categoryName = categoryNames[category];
        document.getElementById('category-title').textContent = `${categoryName} | Global News Network`;
        document.getElementById('category-description').content = `Latest ${categoryName} news and updates`;
        document.getElementById('category-heading').textContent = categoryName;
        document.getElementById('category-subtitle').textContent = `Latest news in ${categoryName}`;
        document.getElementById('popular-category-name').textContent = categoryName;

        // Filter articles by category
        const categoryArticles = newsData.articles.filter(article => article.category === category);
        const popularArticles = [...categoryArticles]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 3);

        // Display category articles
        const articlesContainer = document.getElementById('category-articles');
        
        if (categoryArticles.length > 0) {
            categoryArticles.forEach(article => {
                const articleCard = document.createElement('article');
                articleCard.className = 'news-card';
                articleCard.innerHTML = `
                    <figure>
                        <img src="${article.image}" alt="${article.title}" class="card-img">
                    </figure>
                    <div class="card-content">
                        <h3><a href="article.html?slug=${article.slug}">${article.title}</a></h3>
                        <p class="excerpt">${article.excerpt}</p>
                        <div class="meta">
                            <span class="date">${formatDate(article.date)}</span>
                            <span class="read-time">${article.readTime}</span>
                        </div>
                    </div>
                `;
                articlesContainer.appendChild(articleCard);
            });

            // Add pagination if needed
            if (categoryArticles.length > 6) {
                const pagination = document.getElementById('pagination');
                const pageCount = Math.ceil(categoryArticles.length / 6);
                
                for (let i = 1; i <= pageCount; i++) {
                    const pageLink = document.createElement('a');
                    pageLink.href = `#page-${i}`;
                    pageLink.className = 'page-link';
                    pageLink.textContent = i;
                    if (i === 1) pageLink.classList.add('active');
                    pagination.appendChild(pageLink);
                }
            }
        } else {
            articlesContainer.innerHTML = `
                <div class="no-articles">
                    <p>No articles found in this category.</p>
                    <a href="index.html" class="read-more">Browse all news</a>
                </div>
            `;
        }

        // Display popular articles
        const popularContainer = document.getElementById('popular-articles');
        
        if (popularArticles.length > 0) {
            popularArticles.forEach(article => {
                const popularArticle = document.createElement('div');
                popularArticle.className = 'popular-article';
                popularArticle.innerHTML = `
                    <img src="${article.image}" alt="${article.title}">
                    <div>
                        <h3><a href="article.html?slug=${article.slug}">${article.title}</a></h3>
                        <div class="meta">
                            <span>${formatDate(article.date)}</span>
                            <span>${article.views.toLocaleString()} views</span>
                        </div>
                    </div>
                `;
                popularContainer.appendChild(popularArticle);
            });
        }

        // Category newsletter form
        const newsletterForm = document.getElementById('category-newsletter');
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // In a real app, you would send this to your server
            alert(`Thank you for subscribing to ${categoryName} updates with ${email}`);
            this.reset();
        });

    } else {
        // Invalid category
        document.getElementById('category-heading').textContent = 'Category Not Found';
        document.getElementById('category-articles').innerHTML = `
            <div class="no-articles">
                <p>The requested category does not exist.</p>
                <a href="index.html" class="read-more">Return to homepage</a>
            </div>
        `;
    }
});

// Format date as "Month Day, Year"
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}