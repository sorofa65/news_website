// Add this at the top
const BASE_URL = window.location.origin;

// Update all fetch calls to use absolute paths
fetch(`${BASE_URL}/data/news.json`)
  .then(response => response.json())
  .then(data => {
    // Your existing code
  });

// Handle client-side routing
document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.endsWith('.html') && window.location.pathname !== '/') {
    window.history.replaceState({}, '', '/index.html');
  }
});

// News data (would typically be fetched from an API)
const newsData = {
    breakingNews: [
        "Major earthquake hits Indonesia, magnitude 7.5",
        "Stock markets reach all-time high amid economic recovery",
        "New climate agreement signed by 50 countries",
        "Tech giant unveils revolutionary AI assistant"
    ],
    articles: [
        {
            id: 1,
            title: "Global Leaders Agree on New Climate Initiative at Emergency Summit",
            slug: "climate-summit-agreement",
            excerpt: "World leaders have reached a landmark agreement to accelerate carbon emission reductions following a three-day emergency climate summit in Geneva.",
            content: `<p>The new initiative commits participating nations to reduce carbon emissions by 50% by 2030, with complete carbon neutrality targeted for 2050. Over 100 countries signed the agreement during the summit.</p>
            <h2>Key Provisions</h2>
            <p>The agreement includes several groundbreaking measures:</p>
            <ul>
                <li>Mandatory emissions reporting for all signatories</li>
                <li>Phasing out coal power by 2040</li>
                <li>$100 billion annual climate fund for developing nations</li>
            </ul>
            <p>Environmental activists have praised the agreement but emphasize that implementation will be crucial.</p>`,
            category: "world",
            date: "2023-06-15",
            author: "Sarah Johnson",
            image: "https://source.unsplash.com/random/1200x600/?climate",
            featured: true,
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Senate Approves Controversial Infrastructure Bill After Marathon Session",
            slug: "senate-infrastructure-bill",
            excerpt: "The bill passed with bipartisan support but faces challenges in the House as progressive lawmakers demand changes to the spending provisions.",
            content: `<p>After 18 hours of debate, the Senate passed the $1.2 trillion infrastructure package with a 69-30 vote. The legislation includes funding for roads, bridges, broadband expansion, and clean energy initiatives.</p>
            <h2>Key Components</h2>
            <p>The bill allocates:</p>
            <ul>
                <li>$110 billion for roads and bridges</li>
                <li>$65 billion for broadband infrastructure</li>
                <li>$73 billion for power grid upgrades</li>
            </ul>
            <p>The House is expected to take up the bill next month, where progressive Democrats are pushing for additional social spending provisions.</p>`,
            category: "politics",
            date: "2023-06-14",
            author: "Michael Chen",
            image: "https://source.unsplash.com/random/800x600/?senate",
            featured: false,
            readTime: "3 min read"
        },
        // More articles...
    ]
};

// DOM Content Loaded
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

    // Load breaking news ticker
    const ticker = document.getElementById('ticker');
    newsData.breakingNews.forEach(item => {
        const tickerItem = document.createElement('div');
        tickerItem.className = 'ticker-item';
        tickerItem.textContent = item;
        ticker.appendChild(tickerItem);
    });

    // Load featured article
    const featuredArticle = newsData.articles.find(article => article.featured);
    if (featuredArticle) {
        const featuredContainer = document.getElementById('featured-article');
        featuredContainer.innerHTML = `
            <figure>
                <img src="${featuredArticle.image}" alt="${featuredArticle.title}" class="featured-img">
                <figcaption>${featuredArticle.title}</figcaption>
            </figure>
            <div class="featured-content">
                <span class="category-label ${featuredArticle.category}">${featuredArticle.category.charAt(0).toUpperCase() + featuredArticle.category.slice(1)}</span>
                <h1><a href="article.html?slug=${featuredArticle.slug}">${featuredArticle.title}</a></h1>
                <p class="excerpt">${featuredArticle.excerpt}</p>
                <div class="meta">
                    <span class="author">By ${featuredArticle.author}</span>
                    <span class="date">Published: ${formatDate(featuredArticle.date)}</span>
                    <span class="read-time">${featuredArticle.readTime}</span>
                </div>
                <a href="article.html?slug=${featuredArticle.slug}" class="read-more">Read Full Story</a>
            </div>
        `;
    }

    // Load news grid
    const newsGrid = document.getElementById('news-grid');
    newsData.articles.slice(0, 6).forEach(article => {
        const articleCard = document.createElement('article');
        articleCard.className = 'news-card';
        articleCard.innerHTML = `
            <figure>
                <img src="${article.image}" alt="${article.title}" class="card-img">
                <figcaption>${article.title}</figcaption>
            </figure>
            <div class="card-content">
                <span class="category-label ${article.category}">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                <h3><a href="article.html?slug=${article.slug}">${article.title}</a></h3>
                <p class="excerpt">${article.excerpt}</p>
                <div class="meta">
                    <span class="date">${formatDate(article.date)}</span>
                    <span class="read-time">${article.readTime}</span>
                </div>
            </div>
        `;
        newsGrid.appendChild(articleCard);
    });

    // Load trending news
    const trendingContainer = document.getElementById('trending-news');
    newsData.articles.slice(0, 5).forEach((article, index) => {
        const trendingCard = document.createElement('article');
        trendingCard.className = 'trending-card';
        trendingCard.innerHTML = `
            <div class="trending-number">${index + 1}</div>
            <div class="trending-content">
                <span class="category-label ${article.category}">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                <h3><a href="article.html?slug=${article.slug}">${article.title}</a></h3>
                <div class="meta">
                    <span class="date">${formatDate(article.date)}</span>
                    <span class="read-time">${article.readTime}</span>
                </div>
            </div>
        `;
        trendingContainer.appendChild(trendingCard);
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // In a real app, you would send this to your server
            alert(`Thank you for subscribing with ${email}`);
            this.reset();
        });
    }
});

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
