// Global Variables
let currentImageIndex = 0;
let galleryImages = [];
let isWelcomeShown = false;

// Sample Gallery Data
const sampleImages = [
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'منظر طبيعي خلاب',
        description: 'جبال وسحب في منظر طبيعي رائع مع إضاءة ذهبية جميلة',
        category: 'nature',
        type: 'photo',
        brand: 'canon',
        tags: ['جبال', 'طبيعة', 'سحب']
    },
    {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        title: 'غابة كثيفة',
        description: 'أشجار خضراء في غابة طبيعية مع أشعة الشمس المتسللة',
        category: 'nature',
        type: 'photo',
        brand: 'nikon',
        tags: ['غابة', 'أشجار', 'ضوء']
    },
    {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        title: 'بحيرة هادئة',
        description: 'مياه صافية تعكس السماء الزرقاء في هدوء تام',
        category: 'landscape',
        type: 'photo',
        brand: 'sony',
        tags: ['بحيرة', 'انعكاس', 'هدوء']
    },
    {
        src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
        title: 'شروق الشمس',
        description: 'شروق جميل فوق الجبال مع ألوان دافئة رائعة',
        category: 'landscape',
        type: 'photo',
        brand: 'fuji',
        tags: ['شروق', 'جبال', 'ألوان']
    },
    {
        src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
        title: 'بحر هادئ',
        description: 'أمواج هادئة على الشاطئ مع رمال ذهبية ناعمة',
        category: 'nature',
        type: 'photo',
        brand: 'olympus',
        tags: ['بحر', 'شاطئ', 'أمواج']
    },
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'قمة جبلية',
        description: 'منظر من أعلى قمة جبلية يطل على الوديان',
        category: 'landscape',
        type: 'photo',
        brand: 'canon',
        tags: ['قمة', 'وديان', 'ارتفاع']
    },
    {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
        title: 'نجوم الليل',
        description: 'سماء مليئة بالنجوم اللامعة في ليلة صافية',
        category: 'nature',
        type: 'photo',
        brand: 'nikon',
        tags: ['نجوم', 'ليل', 'سماء']
    },
    {
        src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop',
        title: 'حقل أخضر',
        description: 'حقل واسع من العشب الأخضر تحت سماء زرقاء',
        category: 'landscape',
        type: 'photo',
        brand: 'sony',
        tags: ['حقل', 'أخضر', 'واسع']
    },
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'شلال طبيعي',
        description: 'مياه متدفقة من شلال عالي وسط الصخور',
        category: 'nature',
        type: 'photo',
        brand: 'fuji',
        tags: ['شلال', 'مياه', 'صخور']
    },
    {
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        title: 'مدينة حديثة',
        description: 'ناطحات سحاب في مدينة حديثة مع إضاءة ليلية',
        category: 'urban',
        type: 'photo',
        brand: 'canon',
        tags: ['مدينة', 'ناطحات', 'ليل']
    },
    {
        src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
        title: 'حيوان بري',
        description: 'حيوان في بيئته الطبيعية البرية',
        category: 'wildlife',
        type: 'photo',
        brand: 'nikon',
        tags: ['حيوان', 'بري', 'طبيعة']
    },
    {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        title: 'لوحة رقمية',
        description: 'عمل فني رقمي بألوان زاهية ومتدرجة',
        category: 'nature',
        type: 'digital',
        brand: 'digital',
        tags: ['رقمي', 'فن', 'ألوان']
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeGallery();
    initializeNavigation();
    initializeModals();
    initializeUpload();
    showWelcomeMessage();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Particle Background System
function initializeParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = Math.random() * 4 + 4;
    particle.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 2;
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (duration + delay) * 1000);
}

// Gallery System
function initializeGallery() {
    galleryImages = [...sampleImages];
    renderGallery();
    
    // View mode buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const viewMode = this.dataset.view;
            handleViewModeChange(viewMode);
        });
    });
    
    // Filter select
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterGallery(this.value);
        });
    }
}

function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
    });
    
    // Add stagger animation
    const items = galleryGrid.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        item.style.animationDelay = (index * 0.1) + 's';
    });
}

function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.category = image.category;
    item.onclick = () => openImageViewer(index);
    
    item.innerHTML = `
        <img src="${image.src}" alt="${image.title}" loading="lazy">
        <div class="gallery-overlay">
            <div class="gallery-info">
                <h4>${image.title}</h4>
                <p>${image.description}</p>
            </div>
        </div>
    `;
    
    return item;
}

function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
}

function handleViewModeChange(mode) {
    const galleryGrid = document.getElementById('gallery-grid');
    
    switch(mode) {
        case 'masonry':
            galleryGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            break;
        case 'grid':
            galleryGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
            break;
        case 'slideshow':
            startSlideshow();
            break;
    }
}

// Image Viewer
function openImageViewer(index) {
    currentImageIndex = index;
    const modal = document.getElementById('image-viewer');
    const image = document.getElementById('viewer-image');
    const title = document.getElementById('image-title');
    const description = document.getElementById('image-description');
    
    const currentImage = galleryImages[index];
    
    image.src = currentImage.src;
    image.alt = currentImage.title;
    title.textContent = currentImage.title;
    description.textContent = currentImage.description;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageViewer() {
    const modal = document.getElementById('image-viewer');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateViewerImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateViewerImage();
}

function updateViewerImage() {
    const image = document.getElementById('viewer-image');
    const title = document.getElementById('image-title');
    const description = document.getElementById('image-description');
    
    const currentImage = galleryImages[currentImageIndex];
    
    // Add fade effect
    image.style.opacity = '0';
    setTimeout(() => {
        image.src = currentImage.src;
        image.alt = currentImage.title;
        title.textContent = currentImage.title;
        description.textContent = currentImage.description;
        image.style.opacity = '1';
    }, 150);
}

// Slideshow
function startSlideshow() {
    if (galleryImages.length === 0) return;
    
    openImageViewer(0);
    
    const slideshowInterval = setInterval(() => {
        nextImage();
    }, 3000);
    
    // Stop slideshow when viewer is closed
    const modal = document.getElementById('image-viewer');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (!modal.classList.contains('active')) {
                clearInterval(slideshowInterval);
                observer.disconnect();
            }
        });
    });
    
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
}

// Navigation
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Modal System
function initializeModals() {
    // Close modals when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Welcome Message
function showWelcomeMessage() {
    if (!isWelcomeShown) {
        setTimeout(() => {
            const welcomeModal = document.getElementById('welcome-modal');
            if (welcomeModal) {
                welcomeModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }, 1000);
        isWelcomeShown = true;
    }
}

// Welcome modal controls
document.addEventListener('DOMContentLoaded', function() {
    const closeWelcome = document.getElementById('close-welcome');
    const startExploring = document.getElementById('start-exploring');
    
    if (closeWelcome) {
        closeWelcome.addEventListener('click', function() {
            const welcomeModal = document.getElementById('welcome-modal');
            welcomeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (startExploring) {
        startExploring.addEventListener('click', function() {
            const welcomeModal = document.getElementById('welcome-modal');
            welcomeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            scrollToGallery();
        });
    }
});

// Upload System
function initializeUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadProgress = document.getElementById('upload-progress');
    
    if (!uploadArea || !fileInput) return;
    
    // Drag and drop events
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    });
    
    // File input change
    fileInput.addEventListener('change', function() {
        handleFileUpload(this.files);
    });
}

function handleFileUpload(files) {
    if (files.length === 0) return;
    
    const uploadProgress = document.getElementById('upload-progress');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    uploadProgress.style.display = 'block';
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Add uploaded images to gallery
            Array.from(files).forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const newImage = {
                            src: e.target.result,
                            title: file.name.split('.')[0],
                            description: 'صورة تم رفعها حديثاً',
                            category: 'uploaded'
                        };
                        galleryImages.unshift(newImage);
                        renderGallery();
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            setTimeout(() => {
                uploadProgress.style.display = 'none';
                closeUploadModal();
                showNotification('تم رفع الصور بنجاح!');
            }, 500);
        }
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
    }, 100);
}

// Utility Functions
function scrollToGallery() {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        gallerySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openUploadModal() {
    const modal = document.getElementById('upload-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeUploadModal() {
    const modal = document.getElementById('upload-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-accent);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideInRight 0.5s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    const activeModal = document.querySelector('.modal-overlay.active');
    
    if (activeModal && activeModal.id === 'image-viewer') {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                nextImage(); // Note: reversed for RTL
                break;
            case 'ArrowRight':
                e.preventDefault();
                previousImage(); // Note: reversed for RTL
                break;
            case ' ':
                e.preventDefault();
                // Could add play/pause functionality here
                break;
        }
    }
});

// Contact Form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<div class="loading"></div> جاري الإرسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                this.reset();
                showNotification('تم إرسال رسالتك بنجاح!');
            }, 2000);
        });
    }
});

// Smooth reveal animations on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .contact-item, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);


// Developer Functions
let developerSettings = {
    socialLinks: {
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: ''
    },
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb'
    },
    background: {
        type: 'gradient',
        gradientStart: '#667eea',
        gradientEnd: '#764ba2',
        gradientDirection: '135deg',
        image: null,
        pattern: 'dots'
    }
};

// Load saved settings
function loadDeveloperSettings() {
    const saved = localStorage.getItem('developerSettings');
    if (saved) {
        developerSettings = { ...developerSettings, ...JSON.parse(saved) };
        applySettings();
    }
}

// Save settings
function saveDeveloperSettings() {
    localStorage.setItem('developerSettings', JSON.stringify(developerSettings));
}

// Apply settings to the page
function applySettings() {
    // Apply colors
    document.documentElement.style.setProperty('--primary-color', developerSettings.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', developerSettings.colors.secondary);
    document.documentElement.style.setProperty('--accent-color', developerSettings.colors.accent);
    
    // Apply background
    applyBackgroundSettings();
    
    // Apply social links
    applySocialLinks();
}

function applyBackgroundSettings() {
    const body = document.body;
    
    switch (developerSettings.background.type) {
        case 'gradient':
            body.style.background = `linear-gradient(${developerSettings.background.gradientDirection}, ${developerSettings.background.gradientStart}, ${developerSettings.background.gradientEnd})`;
            break;
        case 'image':
            if (developerSettings.background.image) {
                body.style.background = `url(${developerSettings.background.image}) center/cover fixed`;
            }
            break;
        case 'pattern':
            applyPatternBackground();
            break;
    }
}

function applyPatternBackground() {
    const body = document.body;
    const patterns = {
        dots: 'radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)',
        lines: 'linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        grid: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)'
    };
    
    const sizes = {
        dots: '20px 20px',
        lines: '15px 15px',
        grid: '30px 30px'
    };
    
    body.style.background = `${developerSettings.colors.primary}, ${patterns[developerSettings.background.pattern]}`;
    body.style.backgroundSize = `100%, ${sizes[developerSettings.background.pattern]}`;
}

function applySocialLinks() {
    // Update footer social links
    const socialLinks = document.querySelectorAll('.social-links a');
    const linkMap = {
        0: 'facebook',
        1: 'twitter', 
        2: 'instagram',
        3: 'youtube'
    };
    
    socialLinks.forEach((link, index) => {
        const platform = linkMap[index];
        if (platform && developerSettings.socialLinks[platform]) {
            link.href = developerSettings.socialLinks[platform];
        }
    });
}

// Developer Modal Functions
function openDeveloperModal() {
    document.getElementById('developer-password-modal').style.display = 'flex';
    document.getElementById('developer-password').focus();
}

function closeDeveloperPasswordModal() {
    document.getElementById('developer-password-modal').style.display = 'none';
    document.getElementById('developer-password').value = '';
    document.getElementById('password-error').style.display = 'none';
}

function checkDeveloperPassword() {
    const password = document.getElementById('developer-password').value;
    const errorDiv = document.getElementById('password-error');
    
    if (password === 'zero') {
        closeDeveloperPasswordModal();
        openDeveloperPanel();
    } else {
        errorDiv.style.display = 'flex';
        document.getElementById('developer-password').value = '';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

function openDeveloperPanel() {
    document.getElementById('developer-panel-modal').style.display = 'flex';
    loadCurrentSettings();
}

function closeDeveloperPanel() {
    document.getElementById('developer-panel-modal').style.display = 'none';
}

function loadCurrentSettings() {
    // Load social links
    document.getElementById('facebook-link').value = developerSettings.socialLinks.facebook;
    document.getElementById('twitter-link').value = developerSettings.socialLinks.twitter;
    document.getElementById('instagram-link').value = developerSettings.socialLinks.instagram;
    document.getElementById('youtube-link').value = developerSettings.socialLinks.youtube;
    
    // Load colors
    document.getElementById('primary-color').value = developerSettings.colors.primary;
    document.getElementById('secondary-color').value = developerSettings.colors.secondary;
    document.getElementById('accent-color').value = developerSettings.colors.accent;
    
    // Load background settings
    document.getElementById('gradient-start').value = developerSettings.background.gradientStart;
    document.getElementById('gradient-end').value = developerSettings.background.gradientEnd;
    document.getElementById('gradient-direction').value = developerSettings.background.gradientDirection;
    
    // Set background type
    document.querySelector(`input[value="${developerSettings.background.type}"]`).checked = true;
    showBackgroundControls(developerSettings.background.type);
}

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Social Links Functions
function saveSocialLinks() {
    developerSettings.socialLinks.facebook = document.getElementById('facebook-link').value;
    developerSettings.socialLinks.twitter = document.getElementById('twitter-link').value;
    developerSettings.socialLinks.instagram = document.getElementById('instagram-link').value;
    developerSettings.socialLinks.youtube = document.getElementById('youtube-link').value;
    
    saveDeveloperSettings();
    applySocialLinks();
    showToast('تم حفظ روابط التواصل الاجتماعي بنجاح!', 'success');
}

// Color Functions
function saveColors() {
    developerSettings.colors.primary = document.getElementById('primary-color').value;
    developerSettings.colors.secondary = document.getElementById('secondary-color').value;
    developerSettings.colors.accent = document.getElementById('accent-color').value;
    
    saveDeveloperSettings();
    applySettings();
    showToast('تم تطبيق الألوان الجديدة بنجاح!', 'success');
}

function applyColorPreset(preset) {
    const presets = {
        blue: {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#f093fb'
        },
        purple: {
            primary: '#a855f7',
            secondary: '#ec4899',
            accent: '#8b5cf6'
        },
        green: {
            primary: '#10b981',
            secondary: '#059669',
            accent: '#34d399'
        }
    };
    
    if (presets[preset]) {
        document.getElementById('primary-color').value = presets[preset].primary;
        document.getElementById('secondary-color').value = presets[preset].secondary;
        document.getElementById('accent-color').value = presets[preset].accent;
        
        developerSettings.colors = presets[preset];
        saveDeveloperSettings();
        applySettings();
        showToast(`تم تطبيق مجموعة الألوان ${preset === 'blue' ? 'الأزرق الكلاسيكي' : preset === 'purple' ? 'البنفسجي الوردي' : 'الأخضر الطبيعي'}!`, 'success');
    }
}

// Background Functions
function saveBackground() {
    const bgType = document.querySelector('input[name="bg-type"]:checked').value;
    
    developerSettings.background.type = bgType;
    
    if (bgType === 'gradient') {
        developerSettings.background.gradientStart = document.getElementById('gradient-start').value;
        developerSettings.background.gradientEnd = document.getElementById('gradient-end').value;
        developerSettings.background.gradientDirection = document.getElementById('gradient-direction').value;
    }
    
    saveDeveloperSettings();
    applyBackgroundSettings();
    showToast('تم تطبيق الخلفية الجديدة بنجاح!', 'success');
}

function selectPattern(pattern) {
    developerSettings.background.pattern = pattern;
    document.querySelectorAll('.pattern-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.pattern-item').classList.add('selected');
}

// Background type change handler
document.addEventListener('change', function(e) {
    if (e.target.name === 'bg-type') {
        showBackgroundControls(e.target.value);
    }
});

function showBackgroundControls(type) {
    document.querySelectorAll('.bg-controls').forEach(control => {
        control.style.display = 'none';
    });
    
    document.getElementById(type + '-controls').style.display = 'block';
}

// Background image upload
document.addEventListener('change', function(e) {
    if (e.target.id === 'bg-image-input') {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                developerSettings.background.image = e.target.result;
                saveDeveloperSettings();
                applyBackgroundSettings();
                showToast('تم رفع صورة الخلفية بنجاح!', 'success');
            };
            reader.readAsDataURL(file);
        }
    }
});

// Search and Filter Functions
let filteredImages = [...sampleImages];

function searchImages() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const clearBtn = document.querySelector('.clear-search');
    
    if (searchTerm.length > 0) {
        clearBtn.style.display = 'block';
        filteredImages = sampleImages.filter(image => 
            image.title.toLowerCase().includes(searchTerm) ||
            image.description.toLowerCase().includes(searchTerm) ||
            image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    } else {
        clearBtn.style.display = 'none';
        filteredImages = [...sampleImages];
    }
    
    applyFilters();
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.querySelector('.clear-search').style.display = 'none';
    filteredImages = [...sampleImages];
    applyFilters();
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    const brandFilter = document.getElementById('brand-filter').value;
    
    let filtered = [...filteredImages];
    
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(image => image.category === categoryFilter);
    }
    
    if (typeFilter !== 'all') {
        filtered = filtered.filter(image => image.type === typeFilter);
    }
    
    if (brandFilter !== 'all') {
        filtered = filtered.filter(image => image.brand === brandFilter);
    }
    
    displayFilteredImages(filtered);
}

function displayFilteredImages(images) {
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (images.length === 0) {
        galleryGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لا توجد نتائج</h3>
                <p>لم يتم العثور على صور تطابق معايير البحث</p>
            </div>
        `;
        return;
    }
    
    galleryGrid.innerHTML = '';
    
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.onclick = () => openImageViewer(index, images);
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="image-tags">
                ${image.tags.map(tag => `<span class="image-tag">${tag}</span>`).join('')}
            </div>
            <div class="gallery-info">
                <h4>${image.title}</h4>
                <p>${image.description}</p>
                <div class="image-meta">
                    <span class="category">${getCategoryName(image.category)}</span>
                    <span class="brand">${getBrandName(image.brand)}</span>
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
    
    // Update current gallery for viewer
    galleryImages = images;
}

function getCategoryName(category) {
    const categories = {
        'nature': 'طبيعة',
        'landscape': 'مناظر طبيعية',
        'architecture': 'عمارة',
        'portrait': 'بورتريه',
        'urban': 'حضري',
        'wildlife': 'حياة برية'
    };
    return categories[category] || category;
}

function getBrandName(brand) {
    const brands = {
        'canon': 'كانون',
        'nikon': 'نيكون',
        'sony': 'سوني',
        'fuji': 'فوجي',
        'olympus': 'أوليمبوس',
        'digital': 'رقمي'
    };
    return brands[brand] || brand;
}

// Filter change handlers
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('filter-select')) {
        applyFilters();
    }
});

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `message-toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

// Enhanced image viewer for filtered results
function openImageViewer(index, images = galleryImages) {
    currentImageIndex = index;
    galleryImages = images;
    
    const modal = document.getElementById('image-viewer');
    const viewer = modal.querySelector('.image-viewer');
    const image = images[index];
    
    viewer.innerHTML = `
        <div class="viewer-header">
            <div class="viewer-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
                <div class="viewer-meta">
                    <span class="meta-item">
                        <i class="fas fa-tag"></i>
                        ${getCategoryName(image.category)}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-camera"></i>
                        ${getBrandName(image.brand)}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-image"></i>
                        ${image.type === 'photo' ? 'صورة' : image.type === 'digital' ? 'رقمي' : image.type}
                    </span>
                </div>
                <div class="viewer-tags">
                    ${image.tags.map(tag => `<span class="viewer-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <button class="close-viewer" onclick="closeImageViewer()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="viewer-content">
            <button class="nav-btn prev-btn" onclick="previousImage()" ${index === 0 ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
            <img src="${image.src}" alt="${image.title}">
            <button class="nav-btn next-btn" onclick="nextImage()" ${index === images.length - 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        </div>
        <div class="viewer-footer">
            <span class="image-counter">${index + 1} من ${images.length}</span>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Load developer settings
    loadDeveloperSettings();
    
    // Initialize gallery with all images
    displayFilteredImages(sampleImages);
    
    // Add keyboard support for developer password
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const passwordModal = document.getElementById('developer-password-modal');
            if (passwordModal.style.display === 'flex') {
                checkDeveloperPassword();
            }
        }
    });
    
    // Add CSS for no results
    if (!document.querySelector('.no-results-style')) {
        const style = document.createElement('style');
        style.className = 'no-results-style';
        style.textContent = `
            .no-results {
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                color: var(--text-light);
            }
            
            .no-results i {
                font-size: 4rem;
                color: var(--accent-color);
                margin-bottom: 20px;
                opacity: 0.7;
            }
            
            .no-results h3 {
                font-size: 1.5rem;
                margin-bottom: 10px;
            }
            
            .no-results p {
                opacity: 0.8;
                font-size: 1.1rem;
            }
            
            .viewer-meta {
                display: flex;
                gap: 20px;
                margin: 15px 0;
                flex-wrap: wrap;
            }
            
            .meta-item {
                display: flex;
                align-items: center;
                gap: 8px;
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
            }
            
            .viewer-tags {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                margin-top: 15px;
            }
            
            .viewer-tag {
                background: var(--gradient-accent);
                color: var(--text-light);
                padding: 4px 12px;
                border-radius: 15px;
                font-size: 0.8rem;
            }
            
            .viewer-footer {
                text-align: center;
                padding: 15px;
                color: rgba(255, 255, 255, 0.8);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
});


// Fixed Back to Top Button Functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > 300) {
        if (!backToTopBtn.classList.contains('show')) {
            backToTopBtn.classList.add('show');
            backToTopBtn.classList.add('animate-in');
            setTimeout(() => {
                backToTopBtn.classList.remove('animate-in');
            }, 600);
        }
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Enhanced scroll event listener
let scrollTimeout;
window.addEventListener('scroll', function() {
    // Toggle back to top button
    toggleBackToTopButton();
    
    // Throttle scroll events for better performance
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        // Add any additional scroll-based functionality here
        updateScrollProgress();
    }, 10);
});

// Optional: Add scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    // You can use this to show scroll progress if needed
    // For example, update a progress bar or change button appearance
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn && scrollProgress > 50) {
        backToTopBtn.style.background = `conic-gradient(var(--accent-color) ${scrollProgress * 3.6}deg, var(--primary-color) 0deg)`;
    } else if (backToTopBtn) {
        backToTopBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    }
}

// Initialize back to top button on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initial check for back to top button
    toggleBackToTopButton();
    
    // Add smooth scroll behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

