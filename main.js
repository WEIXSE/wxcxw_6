document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let megabytes = 1024;
    let progress = 10;
    let maxProgress = 1024;
    let isDarkTheme = true;
    
    // DOM elements
    const megabyteCounter = document.getElementById('megabyteCounter');
    const progressCounter = document.getElementById('progressCounter');
    const levelProgress = document.getElementById('levelProgress');
    const decreaseButton = document.querySelector('.decrease-button');
    const increaseButton = document.querySelector('.increase-button');
    const clickBtn = document.querySelector('.click-top');

    const refreshButton = document.querySelector('.refresh-button');
    const themeToggle = document.querySelector('.theme-toggle');
    const navItems = document.querySelectorAll('.nav-item');
    const characterImage = document.querySelector('.character-image');
    
    // Format number with spaces
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    // Update megabyte counter with animation
    function updateMegabyteCounter(newValue) {
        // Add pulse animation
        megabyteCounter.classList.add('pulse');
        
        // Update the value with animation
        const duration = 500; // ms
        const start = parseInt(megabyteCounter.textContent.replace(/\s/g, ''));
        const end = newValue;
        const range = end - start;
        const startTime = performance.now();
        
        function updateCounter(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(start + range * progress);
            megabyteCounter.textContent = formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                megabyteCounter.classList.remove('pulse');
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Update progress bar
    function updateProgress(newProgress) {
        progress = newProgress;
        progressCounter.textContent = `${progress}/${maxProgress}`;
        const percentage = (progress / maxProgress) * 100;
        levelProgress.style.width = `${percentage}%`;
    }
    
    // Initialize values
    updateMegabyteCounter(megabytes);
    updateProgress(progress);
    
    // Event listeners for megabyte buttons
    decreaseButton.addEventListener('click', function() {
        const decrease = Math.min(megabytes, 100);
        megabytes -= decrease;
        updateMegabyteCounter(megabytes);
        
        // Add some progress when decreasing
        updateProgress(Math.min(maxProgress, progress + 5));
        
        // Add animation to button
        this.classList.add('pulse');
        setTimeout(() => this.classList.remove('pulse'), 500);
    });
    
    increaseButton.addEventListener('click', function() {
        megabytes += 100;
        updateMegabyteCounter(megabytes);
        
        // Add some progress when increasing
        updateProgress(Math.min(maxProgress, progress + 10));
        
        // Add animation to button
        this.classList.add('pulse');
        setTimeout(() => this.classList.remove('pulse'), 500);
    });
    clickBtn.addEventListener('click', function() {
        megabytes += 10;
        updateMegabyteCounter(megabytes);
        
        // Add some progress when increasing
        updateProgress(Math.min(maxProgress, progress + 10));
        
        // Add animation to button
        this.classList.add('pulse');
        setTimeout(() => this.classList.remove('pulse'), 500);
    });
    // Refresh button
    refreshButton.addEventListener('click', function() {
        // Animate the refresh button
        this.style.transition = 'transform 0.5s ease';
        this.style.transform = 'rotate(360deg)';
        
        // Reset the transform after animation
        setTimeout(() => {
            this.style.transition = 'none';
            this.style.transform = 'rotate(0deg)';
            setTimeout(() => {
                this.style.transition = 'transform 0.3s ease';
            }, 50);
        }, 500);
        
        // Reset progress
        updateProgress(10);
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', function() {
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            document.body.style.backgroundColor = '#000';
            document.body.style.color = '#fff';
        } else {
            document.body.style.backgroundColor = '#f5f5f5';
            document.body.style.color = '#000';
            
            // Update other elements for light theme
            document.querySelectorAll('.pill-button').forEach(btn => {
                btn.style.backgroundColor = '#e0e0e0';
            });
            
            document.querySelector('.progress-bar').style.backgroundColor = '#e0e0e0';
            document.querySelector('.bottom-nav').style.backgroundColor = '#e0e0e0';
            
            document.querySelectorAll('.nav-item.active .nav-icon').forEach(icon => {
                icon.style.backgroundColor = '#000';
            });
            
            document.querySelectorAll('.nav-item.active .nav-icon svg').forEach(svg => {
                svg.style.stroke = '#fff';
            });
        }
        
        // Add animation
        document.body.classList.add('fade-in');
        setTimeout(() => document.body.classList.remove('fade-in'), 500);
    });
    
    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add animation
            this.classList.add('slide-up');
            setTimeout(() => this.classList.remove('slide-up'), 500);
            
            // Show section name
            const section = this.getAttribute('data-section');
            console.log(`Navigating to ${section} section`);
        });
    });
    
    // Character image hover effect
    characterImage.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    characterImage.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add initial animations
    document.querySelectorAll('.header-item, .level-progress, .megabyte-section, .character-container, .bottom-nav')
        .forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
                setTimeout(() => element.classList.remove('fade-in'), 500);
            }, index * 100);
        });
});
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const navLabels = document.querySelectorAll('.nav-label');
    
    // Function to update active states
    function setActiveTab(section) {
        // Remove active class from all items and labels
        navItems.forEach(item => item.classList.remove('active'));
        navLabels.forEach(label => label.classList.remove('active'));
        
        // Add active class to the clicked item
        const activeItem = document.querySelector(`.nav-item[data-section="${section}"]`);
        const activeLabel = document.querySelector(`.nav-label[data-for="${section}"]`);
        
        if (activeItem) activeItem.classList.add('active');
        if (activeLabel) activeLabel.classList.add('active');
    }
    
    // Add click event listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            setActiveTab(section);
        });
    });
    
    // Add click event listeners to labels (optional, for better UX)
    navLabels.forEach(label => {
        label.addEventListener('click', function() {
            const section = this.getAttribute('data-for');
            setActiveTab(section);
        });
    });
});