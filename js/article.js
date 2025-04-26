// Sample data (would normally come from your news.json)
const newsData = {
    articles: [
        {
            id: 1,
            title: "Global Leaders Agree on New Climate Initiative",
            slug: "climate-summit-agreement",
            excerpt: "World leaders reach landmark agreement on carbon emissions",
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
            authorBio: "Senior Environmental Correspondent with 15 years of experience covering climate policy.",
            authorAvatar: "https://randomuser.me/api/portraits/women/43.jpg",
            image: "https://source.unsplash.com/random/1200x600/?climate",
            featured: true,
            readTime: "5 min read",
            comments: [
                {
                    id: 1,
                    name: "John Smith",
                    email: "john@example.com",
                    date: "2023-06-16T09:30:00",
                    text: "This is a significant step forward, but I worry about enforcement mechanisms. How will compliance be monitored?"
                },
                {
                    id: 2,
                    name: "Emma Davis",
                    email: "emma@example.com",
                    date: "2023-06-16T14:45:00",
                    text: "Finally some concrete action! Though 2050 seems too far away - we need faster results."
                }
            ]
        }
        // More articles...
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

    // Get article slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleSlug = urlParams.get('slug');

    // Find the article
    const article = newsData.articles.find(a => a.slug === articleSlug);

    if (article) {
        // Update page title and meta description
        document.getElementById('article-title').textContent = `${article.title} | Global News Network`;
        document.getElementById('article-description').content = article.excerpt;

        // Display article content
        const articleContent = document.getElementById('article-content');
        articleContent.innerHTML = `
            <span class="category-label ${article.category}">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
            <h1>${article.title}</h1>
            <div class="meta">
                <span class="author">By ${article.author}</span>
                <span class="date">Published: ${formatDate(article.date)}</span>
                <span class="read-time">${article.readTime}</span>
            </div>
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-body">${article.content}</div>
        `;

        // Display author bio if available
        if (article.authorBio) {
            const authorBio = document.getElementById('author-bio');
            authorBio.innerHTML = `
                <img src="${article.authorAvatar || 'https://via.placeholder.com/80'}" alt="${article.author}" class="author-avatar">
                <div class="author-info">
                    <h3>${article.author}</h3>
                    ${article.authorTitle ? `<p class="author-title">${article.authorTitle}</p>` : ''}
                    <p class="author-bio-text">${article.authorBio}</p>
                </div>
            `;
        }

        // Load comments
        if (article.comments && article.comments.length > 0) {
            const commentsList = document.getElementById('comments-list');
            article.comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.innerHTML = `
                    <div class="comment-avatar">${comment.name.charAt(0)}</div>
                    <div class="comment-content">
                        <div class="comment-meta">
                            <span class="comment-author">${comment.name}</span>
                            <span class="comment-date">${formatDateTime(comment.date)}</span>
                        </div>
                        <p class="comment-text">${comment.text}</p>
                    </div>
                `;
                commentsList.appendChild(commentElement);
            });
        }

        // Comment form submission
        const commentForm = document.getElementById('comment-form');
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('comment-name').value;
            const email = document.getElementById('comment-email').value;
            const text = document.getElementById('comment-text').value;
            
            // In a real app, you would send this to your server
            const newComment = {
                id: Date.now(),
                name,
                email,
                date: new Date().toISOString(),
                text
            };
            
            // Add to UI immediately
            const commentsList = document.getElementById('comments-list');
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <div class="comment-avatar">${name.charAt(0)}</div>
                <div class="comment-content">
                    <div class="comment-meta">
                        <span class="comment-author">${name}</span>
                        <span class="comment-date">Just now</span>
                    </div>
                    <p class="comment-text">${text}</p>
                </div>
            `;
            commentsList.prepend(commentElement);
            
            // Clear form
            commentForm.reset();
            
            // Show success message
            alert('Thank you for your comment!');
        });

        // Load related articles
        const relatedContainer = document.getElementById('related-articles');
        const relatedArticles = newsData.articles.filter(a => 
            a.category === article.category && a.id !== article.id
        ).slice(0, 3);

        if (relatedArticles.length > 0) {
            relatedArticles.forEach(related => {
                const articleCard = document.createElement('article');
                articleCard.className = 'news-card';
                articleCard.innerHTML = `
                    <figure>
                        <img src="${related.image}" alt="${related.title}" class="card-img">
                    </figure>
                    <div class="card-content">
                        <span class="category-label ${related.category}">${related.category.charAt(0).toUpperCase() + related.category.slice(1)}</span>
                        <h3><a href="article.html?slug=${related.slug}">${related.title}</a></h3>
                        <p class="excerpt">${related.excerpt}</p>
                        <div class="meta">
                            <span class="date">${formatDate(related.date)}</span>
                            <span class="read-time">${related.readTime}</span>
                        </div>
                    </div>
                `;
                relatedContainer.appendChild(articleCard);
            });
        } else {
            document.querySelector('.related-articles').style.display = 'none';
        }
    } else {
        // Article not found
        const articleContent = document.getElementById('article-content');
        articleContent.innerHTML = `
            <h1>Article Not Found</h1>
            <p>The article you requested could not be found.</p>
            <a href="index.html" class="read-more">Return to Homepage</a>
        `;
        document.querySelector('.related-articles').style.display = 'none';
    }

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

// Format date as "Month Day, Year"
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format date/time for comments
function formatDateTime(dateTimeString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
}

// Get article slug safely
function getArticleSlug() {
  const url = new URL(window.location.href);
  return url.searchParams.get('slug') || url.pathname.split('/').pop();
}

// Update fetch calls
fetch(`${window.location.origin}/data/news.json`)
  .then(response => response.json())
  .then(data => {
    const slug = getArticleSlug();
    const article = data.articles.find(a => a.slug === slug);
    // Rest of your code
  });
