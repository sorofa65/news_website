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

    // Sample data - in a real app, this would come from your API or JSON
    const popularArticles = [
        {
            title: "Global Climate Summit Reaches Historic Agreement",
            slug: "climate-summit-agreement",
            category: "world",
            date: "2023-06-15",
            image: "https://source.unsplash.com/random/400x300/?climate"
        },
        {
            title: "New Tech Breakthrough Promises Faster Internet",
            slug: "tech-breakthrough-internet",
            category: "technology",
            date: "2023-06-14",
            image: "https://source.unsplash.com/random/400x300/?technology"
        },
        {
            title: "Stock Markets Reach All-Time High",
            slug: "stock-market-record",
            category: "business",
            date: "2023-06-13",
            image: "https://source.unsplash.com/random/400x300/?stockmarket"
        }
    ];

    // Load popular articles
    const popularContainer = document.getElementById('popular-articles');
    
    popularArticles.forEach(article => {
        const articleCard = document.createElement('article');
        articleCard.className = 'news-card';
        articleCard.innerHTML = `
            <figure>
                <img src="${article.image}" alt="${article.title}" class="card-img">
            </figure>
            <div class="card-content">
                <span class="category-label ${article.category}">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                <h3><a href="article.html?slug=${article.slug}">${article.title}</a></h3>
                <div class="meta">
                    <span class="date">${formatDate(article.date)}</span>
                </div>
            </div>
        `;
        popularContainer.appendChild(articleCard);
    });

    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});