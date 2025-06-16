// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.querySelector('#password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Show loading state
            const loginBtn = this.querySelector('.login-btn');
            const originalContent = loginBtn.innerHTML;
            loginBtn.innerHTML = '<span class="loading"></span>';

            // Simulate API call
            setTimeout(() => {
                if (email && password) {
                    // Store login state
                    localStorage.setItem('isLoggedIn', 'true');
                    if (remember) {
                        localStorage.setItem('rememberMe', 'true');
                    }
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    loginBtn.innerHTML = originalContent;
                    showNotification('Please fill in all fields', 'error');
                }
            }, 1500);
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList[1];
            showNotification(`Logging in with ${platform}...`, 'info');
        });
    });

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'index.html';
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('rememberMe');
            window.location.href = 'index.html';
        });
    }

    // Job search functionality
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const location = document.getElementById('location').value;
            const degree = document.getElementById('degree').value;
            const interest = document.getElementById('interest').value;
            const experience = document.getElementById('experience').value;

            // Show loading state
            const searchBtn = this.querySelector('.search-btn');
            const originalContent = searchBtn.innerHTML;
            searchBtn.innerHTML = '<span class="loading"></span>';

            // Simulate API call
            setTimeout(() => {
                // Mock job data
                const mockJobs = [
                    {
                        title: 'Senior Software Developer',
                        company: 'Tech Corp',
                        location: 'New York',
                        type: 'Full-time',
                        salary: '$120k - $150k',
                        description: 'Looking for an experienced software developer with expertise in modern web technologies...',
                        posted: '2 days ago',
                        skills: ['JavaScript', 'React', 'Node.js']
                    },
                    {
                        title: 'Data Scientist',
                        company: 'Data Analytics Inc',
                        location: 'San Francisco',
                        type: 'Remote',
                        salary: '$130k - $160k',
                        description: 'Join our data science team to work on cutting-edge machine learning projects...',
                        posted: '1 day ago',
                        skills: ['Python', 'Machine Learning', 'SQL']
                    },
                    {
                        title: 'UX Designer',
                        company: 'Design Studio',
                        location: 'London',
                        type: 'Full-time',
                        salary: '$90k - $110k',
                        description: 'Creative UX designer needed to join our growing design team...',
                        posted: '3 days ago',
                        skills: ['Figma', 'UI/UX', 'Prototyping']
                    }
                ];

                // Filter jobs based on search criteria
                const filteredJobs = mockJobs.filter(job => {
                    return (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
                           (!interest || job.title.toLowerCase().includes(interest.toLowerCase())) &&
                           (!degree || job.skills.some(skill => skill.toLowerCase().includes(degree.toLowerCase()))) &&
                           (!experience || job.type.toLowerCase().includes(experience.toLowerCase()));
                });

                // Update stats
                updateStats(filteredJobs.length);

                // Display results
                displayJobs(filteredJobs);

                // Restore button
                searchBtn.innerHTML = originalContent;
            }, 1000);
        });
    }

    // View toggle functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('jobResults').className = `job-results ${view}-view`;
        });
    });
});

// Function to display job results
function displayJobs(jobs) {
    const jobResults = document.getElementById('jobResults');
    if (!jobResults) return;

    jobResults.innerHTML = '';
    
    if (jobs.length === 0) {
        jobResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No jobs found matching your criteria.</p>
                <button class="clear-filters">Clear Filters</button>
            </div>
        `;
        return;
    }

    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <div class="job-header">
                <h3>${job.title}</h3>
                <button class="save-job">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>
            <div class="job-company">
                <i class="fas fa-building"></i>
                <span>${job.company}</span>
            </div>
            <div class="job-details">
                <div class="job-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location}</span>
                </div>
                <div class="job-type">
                    <i class="fas fa-briefcase"></i>
                    <span>${job.type}</span>
                </div>
                <div class="job-salary">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>${job.salary}</span>
                </div>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-skills">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="job-footer">
                <span class="posted-date"><i class="far fa-clock"></i> ${job.posted}</span>
                <a href="#" class="apply-btn">
                    <i class="fas fa-paper-plane"></i>
                    Apply Now
                </a>
            </div>
        `;
        jobResults.appendChild(jobCard);
    });

    // Add event listeners for save buttons
    document.querySelectorAll('.save-job').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('saved');
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            showNotification('Job saved successfully!', 'success');
        });
    });
}

// Function to update dashboard stats
function updateStats(jobCount) {
    const stats = document.querySelectorAll('.stat-number');
    if (stats[0]) {
        stats[0].textContent = jobCount.toLocaleString();
    }
}

// Function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 
                       type === 'success' ? 'fa-check-circle' : 
                       'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
} 