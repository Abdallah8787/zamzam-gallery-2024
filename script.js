// Global Variables
let currentImageIndex = 0;
let galleryImages = [];
let isWelcomeShown = false;

// Sample Gallery Data
const sampleImages = [
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'منظر طبيعي خلاب',
        description: 'جبال وسحب في منظر طبيعي رائع',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        title: 'غابة كثيفة',
        description: 'أشجار خضراء في غابة طبيعية',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        title: 'بحيرة هادئة',
        description: 'مياه صافية تعكس السماء الزرقاء',
        category: 'landscape'
    },
    {
        src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
        title: 'شروق الشمس',
        description: 'شروق جميل فوق الجبال',
        category: 'landscape'
    },
    {
        src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
        title: 'بحر هادئ',
        description: 'أمواج هادئة على الشاطئ',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'قمة جبلية',
        description: 'منظر من أعلى قمة جبلية',
        category: 'landscape'
    },
    {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
        title: 'نجوم الليل',
        description: 'سماء مليئة بالنجوم اللامعة',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop',
        title: 'حقل أخضر',
        description: 'حقل واسع من العشب الأخضر',
        category: 'landscape'
    },
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'شلال طبيعي',
        description: 'مياه متدفقة من شلال عالي',
        category: 'nature'
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

