// OmniTrack Pro - Main Application
class OmniTrackApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.data = {
            projects: [],
            clients: [],
            transactions: []
        };
        this.charts = {};
        this.init();
    }

    async init() {
        await this.initDatabase();
        this.initEventListeners();
        this.initTheme();
        await this.loadData();
        this.renderCurrentPage();
        this.hideLoadingScreen();
    }

    // Database Management
    async initDatabase() {
        // Initialize IndexedDB
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('OmniTrackDB', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object stores
                if (!db.objectStoreNames.contains('projects')) {
                    const projectStore = db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
                    projectStore.createIndex('status', 'status', { unique: false });
                    projectStore.createIndex('clientId', 'clientId', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('clients')) {
                    const clientStore = db.createObjectStore('clients', { keyPath: 'id', autoIncrement: true });
                    clientStore.createIndex('name', 'name', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('transactions')) {
                    const transactionStore = db.createObjectStore('transactions', { keyPath: 'id', autoIncrement: true });
                    transactionStore.createIndex('type', 'type', { unique: false });
                    transactionStore.createIndex('date', 'date', { unique: false });
                }
            };
        });
    }

    async loadData() {
        try {
            this.data.clients = await this.getFromDB('clients');
            this.data.projects = await this.getFromDB('projects');
            this.data.transactions = await this.getFromDB('transactions');
            
            // If no data exists, create sample data
            if (this.data.clients.length === 0) {
                await this.createSampleData();
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.showToast('Error loading data', 'error');
        }
    }

    async createSampleData() {
        // Sample clients
        const sampleClients = [
            { name: 'John Smith', company: 'Tech Corp', email: 'john@techcorp.com', phone: '+1-555-0101', status: 'active' },
            { name: 'Sarah Johnson', company: 'Design Studio', email: 'sarah@designstudio.com', phone: '+1-555-0102', status: 'active' },
            { name: 'Mike Wilson', company: 'Marketing Plus', email: 'mike@marketingplus.com', phone: '+1-555-0103', status: 'active' },
            { name: 'Emily Davis', company: 'StartupXYZ', email: 'emily@startupxyz.com', phone: '+1-555-0104', status: 'active' }
        ];

        for (const client of sampleClients) {
            await this.saveToDB('clients', client);
        }

        // Reload clients to get IDs
        this.data.clients = await this.getFromDB('clients');

        // Sample projects
        const sampleProjects = [
            {
                name: 'E-commerce Website',
                clientId: this.data.clients[0].id,
                budget: 15000,
                deadline: '2025-03-15',
                status: 'active',
                progress: 65,
                description: 'Complete e-commerce solution with payment integration'
            },
            {
                name: 'Mobile App Design',
                clientId: this.data.clients[1].id,
                budget: 8000,
                deadline: '2025-02-28',
                status: 'active',
                progress: 40,
                description: 'iOS and Android app design and prototyping'
            },
            {
                name: 'Brand Identity',
                clientId: this.data.clients[2].id,
                budget: 5000,
                deadline: '2025-02-15',
                status: 'completed',
                progress: 100,
                description: 'Complete brand identity package including logo and guidelines'
            },
            {
                name: 'Website Redesign',
                clientId: this.data.clients[3].id,
                budget: 12000,
                deadline: '2025-04-01',
                status: 'active',
                progress: 25,
                description: 'Modern website redesign with improved UX'
            }
        ];

        for (const project of sampleProjects) {
            await this.saveToDB('projects', project);
        }

        // Sample transactions
        const sampleTransactions = [
            {
                description: 'E-commerce Website - Initial Payment',
                type: 'income',
                amount: 7500,
                clientId: this.data.clients[0].id,
                date: '2025-01-15',
                status: 'completed'
            },
            {
                description: 'Software License',
                type: 'expense',
                amount: 299,
                clientId: null,
                date: '2025-01-10',
                status: 'completed'
            },
            {
                description: 'Brand Identity - Full Payment',
                type: 'income',
                amount: 5000,
                clientId: this.data.clients[2].id,
                date: '2025-01-20',
                status: 'completed'
            },
            {
                description: 'Office Supplies',
                type: 'expense',
                amount: 150,
                clientId: null,
                date: '2025-01-12',
                status: 'completed'
            }
        ];

        for (const transaction of sampleTransactions) {
            await this.saveToDB('transactions', transaction);
        }

        // Reload all data
        await this.loadData();
    }

    async getFromDB(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async saveToDB(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async updateInDB(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteFromDB(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Event Listeners
    initEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileMenuToggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('mobile-open');
            });
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('collapsed');
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Fullscreen toggle
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }

        // Quick actions
        document.querySelectorAll('.quick-action').forEach(action => {
            action.addEventListener('click', () => {
                const actionType = action.dataset.action;
                this.handleQuickAction(actionType);
            });
        });

        // Modal events
        this.initModalEvents();

        // Form events
        this.initFormEvents();

        // Refresh button
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }
    }

    initModalEvents() {
        const modalOverlay = document.getElementById('modalOverlay');
        
        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });

        // Close buttons
        document.querySelectorAll('.modal-close, #cancelProject, #cancelClient, #cancelTransaction').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Add buttons
        const addProjectBtn = document.getElementById('addProjectBtn');
        if (addProjectBtn) {
            addProjectBtn.addEventListener('click', () => {
                this.openProjectModal();
            });
        }

        const addClientBtn = document.getElementById('addClientBtn');
        if (addClientBtn) {
            addClientBtn.addEventListener('click', () => {
                this.openClientModal();
            });
        }

        const addTransactionBtn = document.getElementById('addTransactionBtn');
        if (addTransactionBtn) {
            addTransactionBtn.addEventListener('click', () => {
                this.openTransactionModal();
            });
        }
    }

    initFormEvents() {
        // Project form
        const projectForm = document.getElementById('projectForm');
        if (projectForm) {
            projectForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProject();
            });
        }

        // Client form
        const clientForm = document.getElementById('clientForm');
        if (clientForm) {
            clientForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveClient();
            });
        }

        // Transaction form
        const transactionForm = document.getElementById('transactionForm');
        if (transactionForm) {
            transactionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveTransaction();
            });
        }
    }

    // Navigation
    navigateToPage(page) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Update page visibility
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        document.getElementById(page).classList.add('active');

        // Update breadcrumb
        document.getElementById('currentPage').textContent = this.getPageTitle(page);

        this.currentPage = page;
        this.renderCurrentPage();

        // Close mobile menu
        document.getElementById('sidebar').classList.remove('mobile-open');
    }

    getPageTitle(page) {
        const titles = {
            dashboard: 'Dashboard',
            analytics: 'Analytics',
            projects: 'Projects',
            clients: 'Clients',
            transactions: 'Transactions',
            settings: 'Settings'
        };
        return titles[page] || 'Dashboard';
    }

    // Theme Management
    initTheme() {
        const savedTheme = localStorage.getItem('omnitrack-theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('omnitrack-theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Fullscreen
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            document.querySelector('#fullscreenBtn i').className = 'fas fa-compress';
        } else {
            document.exitFullscreen();
            document.querySelector('#fullscreenBtn i').className = 'fas fa-expand';
        }
    }

    // Page Rendering
    renderCurrentPage() {
        switch (this.currentPage) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'projects':
                this.renderProjects();
                break;
            case 'clients':
                this.renderClients();
                break;
            case 'transactions':
                this.renderTransactions();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }

    renderDashboard() {
        this.updateMetrics();
        this.renderCharts();
        this.renderRecentActivity();
        this.updateFooterStats();
    }

    updateMetrics() {
        const totalRevenue = this.data.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const activeProjects = this.data.projects.filter(p => p.status === 'active').length;
        const totalClients = this.data.clients.length;

        document.getElementById('totalRevenue').textContent = this.formatCurrency(totalRevenue);
        document.getElementById('activeProjects').textContent = activeProjects;
        document.getElementById('totalClients').textContent = totalClients;
    }

    renderCharts() {
        this.renderRevenueChart();
        this.renderProjectChart();
    }

    renderRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.charts.revenue) {
            this.charts.revenue.destroy();
        }

        // Generate sample data for the last 7 days
        const labels = [];
        const data = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            
            // Generate random revenue data
            data.push(Math.floor(Math.random() * 5000) + 1000);
        }

        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue',
                    data: data,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    },
                    y: {
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    renderProjectChart() {
        const ctx = document.getElementById('projectChart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.charts.project) {
            this.charts.project.destroy();
        }

        const statusCounts = {
            active: this.data.projects.filter(p => p.status === 'active').length,
            completed: this.data.projects.filter(p => p.status === 'completed').length,
            'on-hold': this.data.projects.filter(p => p.status === 'on-hold').length
        };

        this.charts.project = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Completed', 'On Hold'],
                datasets: [{
                    data: [statusCounts.active, statusCounts.completed, statusCounts['on-hold']],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            color: '#64748b'
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }

    renderRecentActivity() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        const activities = [
            {
                icon: 'fas fa-plus',
                iconColor: '#10b981',
                title: 'New project created',
                description: 'E-commerce Website project added',
                time: '2 hours ago'
            },
            {
                icon: 'fas fa-user-plus',
                iconColor: '#6366f1',
                title: 'New client added',
                description: 'John Smith from Tech Corp',
                time: '4 hours ago'
            },
            {
                icon: 'fas fa-check-circle',
                iconColor: '#f59e0b',
                title: 'Project completed',
                description: 'Brand Identity project finished',
                time: '1 day ago'
            },
            {
                icon: 'fas fa-dollar-sign',
                iconColor: '#10b981',
                title: 'Payment received',
                description: '$5,000 from Design Studio',
                time: '2 days ago'
            }
        ];

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon" style="background-color: ${activity.iconColor}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-description">${activity.description}</div>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    renderAnalytics() {
        this.renderPerformanceChart();
        this.renderClientRevenueChart();
    }

    renderPerformanceChart() {
        const ctx = document.getElementById('performanceChart');
        if (!ctx) return;

        if (this.charts.performance) {
            this.charts.performance.destroy();
        }

        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const revenueData = [12000, 19000, 15000, 25000, 22000, 30000];
        const expenseData = [8000, 12000, 10000, 15000, 14000, 18000];

        this.charts.performance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: revenueData,
                        backgroundColor: '#10b981',
                        borderRadius: 8
                    },
                    {
                        label: 'Expenses',
                        data: expenseData,
                        backgroundColor: '#ef4444',
                        borderRadius: 8
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#64748b',
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    },
                    y: {
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    renderClientRevenueChart() {
        const ctx = document.getElementById('clientRevenueChart');
        if (!ctx) return;

        if (this.charts.clientRevenue) {
            this.charts.clientRevenue.destroy();
        }

        const clientRevenue = this.data.clients.map(client => {
            const revenue = this.data.transactions
                .filter(t => t.clientId === client.id && t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0);
            return { name: client.company, revenue };
        }).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

        this.charts.clientRevenue = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: clientRevenue.map(c => c.name),
                datasets: [{
                    data: clientRevenue.map(c => c.revenue),
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            color: '#64748b'
                        }
                    }
                }
            }
        });
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        if (this.data.projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-project-diagram"></i>
                    <h3>No projects yet</h3>
                    <p>Create your first project to get started</p>
                    <button class="btn btn-primary" onclick="app.openProjectModal()">
                        <i class="fas fa-plus"></i>
                        Add Project
                    </button>
                </div>
            `;
            return;
        }

        projectsGrid.innerHTML = this.data.projects.map(project => {
            const client = this.data.clients.find(c => c.id === project.clientId);
            return `
                <div class="project-card">
                    <div class="project-header">
                        <h3 class="project-title">${project.name}</h3>
                        <span class="project-status ${project.status}">${project.status}</span>
                    </div>
                    <div class="project-info">
                        <div class="project-client">Client: ${client ? client.company : 'Unknown'}</div>
                        <div class="project-budget">${this.formatCurrency(project.budget)}</div>
                        <div class="project-deadline">Due: ${this.formatDate(project.deadline)}</div>
                    </div>
                    <div class="project-progress">
                        <div class="progress-label">
                            <span>Progress</span>
                            <span>${project.progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${project.progress}%"></div>
                        </div>
                    </div>
                    <div class="project-actions">
                        <button class="btn btn-secondary" onclick="app.editProject(${project.id})">
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                        <button class="btn btn-primary" onclick="app.viewProject(${project.id})">
                            <i class="fas fa-eye"></i>
                            View
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderClients() {
        const clientsTableBody = document.getElementById('clientsTableBody');
        if (!clientsTableBody) return;

        if (this.data.clients.length === 0) {
            clientsTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        <div class="empty-state">
                            <i class="fas fa-users"></i>
                            <h3>No clients yet</h3>
                            <p>Add your first client to get started</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        clientsTableBody.innerHTML = this.data.clients.map(client => {
            const projectCount = this.data.projects.filter(p => p.clientId === client.id).length;
            const revenue = this.data.transactions
                .filter(t => t.clientId === client.id && t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0);

            return `
                <tr>
                    <td>
                        <div class="client-info">
                            <div class="client-name">${client.name}</div>
                            <div class="client-email">${client.email}</div>
                        </div>
                    </td>
                    <td>${client.company}</td>
                    <td>${projectCount}</td>
                    <td>${this.formatCurrency(revenue)}</td>
                    <td>
                        <span class="status-badge ${client.status}">${client.status}</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-secondary" onclick="app.editClient(${client.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-primary" onclick="app.viewClient(${client.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    renderTransactions() {
        this.updateTransactionSummary();
        this.renderTransactionsTable();
    }

    updateTransactionSummary() {
        const totalIncome = this.data.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalExpense = this.data.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const netProfit = totalIncome - totalExpense;

        document.getElementById('totalIncome').textContent = this.formatCurrency(totalIncome);
        document.getElementById('totalExpense').textContent = this.formatCurrency(totalExpense);
        document.getElementById('netProfit').textContent = this.formatCurrency(netProfit);
    }

    renderTransactionsTable() {
        const transactionsTableBody = document.getElementById('transactionsTableBody');
        if (!transactionsTableBody) return;

        if (this.data.transactions.length === 0) {
            transactionsTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        <div class="empty-state">
                            <i class="fas fa-credit-card"></i>
                            <h3>No transactions yet</h3>
                            <p>Add your first transaction to get started</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        transactionsTableBody.innerHTML = this.data.transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(transaction => {
                const client = this.data.clients.find(c => c.id === transaction.clientId);
                return `
                    <tr>
                        <td>${this.formatDate(transaction.date)}</td>
                        <td>${transaction.description}</td>
                        <td>
                            <span class="transaction-type ${transaction.type}">
                                <i class="fas fa-arrow-${transaction.type === 'income' ? 'up' : 'down'}"></i>
                                ${transaction.type}
                            </span>
                        </td>
                        <td class="transaction-amount ${transaction.type}">
                            ${transaction.type === 'income' ? '+' : '-'}${this.formatCurrency(transaction.amount)}
                        </td>
                        <td>${client ? client.company : '-'}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-sm btn-secondary" onclick="app.editTransaction(${transaction.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="app.deleteTransaction(${transaction.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
    }

    renderSettings() {
        // Settings are mostly static, just ensure dark mode toggle is synced
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.checked = document.body.getAttribute('data-theme') === 'dark';
            darkModeToggle.addEventListener('change', () => {
                this.toggleTheme();
            });
        }
    }

    // Modal Management
    openProjectModal(projectId = null) {
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('projectModalTitle');
        const form = document.getElementById('projectForm');
        
        if (projectId) {
            const project = this.data.projects.find(p => p.id === projectId);
            modalTitle.textContent = 'Edit Project';
            this.populateProjectForm(project);
        } else {
            modalTitle.textContent = 'Add New Project';
            form.reset();
        }
        
        this.populateClientSelect('projectClient');
        this.showModal('projectModal');
    }

    openClientModal(clientId = null) {
        const modal = document.getElementById('clientModal');
        const modalTitle = document.getElementById('clientModalTitle');
        const form = document.getElementById('clientForm');
        
        if (clientId) {
            const client = this.data.clients.find(c => c.id === clientId);
            modalTitle.textContent = 'Edit Client';
            this.populateClientForm(client);
        } else {
            modalTitle.textContent = 'Add New Client';
            form.reset();
        }
        
        this.showModal('clientModal');
    }

    openTransactionModal(transactionId = null) {
        const modal = document.getElementById('transactionModal');
        const modalTitle = document.getElementById('transactionModalTitle');
        const form = document.getElementById('transactionForm');
        
        if (transactionId) {
            const transaction = this.data.transactions.find(t => t.id === transactionId);
            modalTitle.textContent = 'Edit Transaction';
            this.populateTransactionForm(transaction);
        } else {
            modalTitle.textContent = 'Add New Transaction';
            form.reset();
            document.getElementById('transactionDate').value = new Date().toISOString().split('T')[0];
        }
        
        this.populateClientSelect('transactionClient');
        this.showModal('transactionModal');
    }

    showModal(modalId) {
        document.getElementById('modalOverlay').classList.add('active');
        document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
        document.getElementById(modalId).style.display = 'block';
    }

    closeModal() {
        document.getElementById('modalOverlay').classList.remove('active');
    }

    populateClientSelect(selectId) {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select Client</option>';
        
        this.data.clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = `${client.name} - ${client.company}`;
            select.appendChild(option);
        });
        
        if (currentValue) {
            select.value = currentValue;
        }
    }

    populateProjectForm(project) {
        document.getElementById('projectName').value = project.name;
        document.getElementById('projectClient').value = project.clientId;
        document.getElementById('projectBudget').value = project.budget;
        document.getElementById('projectDeadline').value = project.deadline;
        document.getElementById('projectDescription').value = project.description || '';
    }

    populateClientForm(client) {
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientCompany').value = client.company;
        document.getElementById('clientEmail').value = client.email;
        document.getElementById('clientPhone').value = client.phone || '';
    }

    populateTransactionForm(transaction) {
        document.getElementById('transactionDescription').value = transaction.description;
        document.getElementById('transactionType').value = transaction.type;
        document.getElementById('transactionAmount').value = transaction.amount;
        document.getElementById('transactionClient').value = transaction.clientId || '';
        document.getElementById('transactionDate').value = transaction.date;
    }

    // CRUD Operations
    async saveProject() {
        const form = document.getElementById('projectForm');
        const formData = new FormData(form);
        
        const project = {
            name: formData.get('projectName') || document.getElementById('projectName').value,
            clientId: parseInt(formData.get('projectClient') || document.getElementById('projectClient').value),
            budget: parseFloat(formData.get('projectBudget') || document.getElementById('projectBudget').value),
            deadline: formData.get('projectDeadline') || document.getElementById('projectDeadline').value,
            description: formData.get('projectDescription') || document.getElementById('projectDescription').value,
            status: 'active',
            progress: 0
        };

        try {
            await this.saveToDB('projects', project);
            await this.loadData();
            this.closeModal();
            this.showToast('Project saved successfully!', 'success');
            if (this.currentPage === 'projects') {
                this.renderProjects();
            }
        } catch (error) {
            console.error('Error saving project:', error);
            this.showToast('Error saving project', 'error');
        }
    }

    async saveClient() {
        const form = document.getElementById('clientForm');
        const formData = new FormData(form);
        
        const client = {
            name: formData.get('clientName') || document.getElementById('clientName').value,
            company: formData.get('clientCompany') || document.getElementById('clientCompany').value,
            email: formData.get('clientEmail') || document.getElementById('clientEmail').value,
            phone: formData.get('clientPhone') || document.getElementById('clientPhone').value,
            status: 'active'
        };

        try {
            await this.saveToDB('clients', client);
            await this.loadData();
            this.closeModal();
            this.showToast('Client saved successfully!', 'success');
            if (this.currentPage === 'clients') {
                this.renderClients();
            }
        } catch (error) {
            console.error('Error saving client:', error);
            this.showToast('Error saving client', 'error');
        }
    }

    async saveTransaction() {
        const form = document.getElementById('transactionForm');
        const formData = new FormData(form);
        
        const transaction = {
            description: formData.get('transactionDescription') || document.getElementById('transactionDescription').value,
            type: formData.get('transactionType') || document.getElementById('transactionType').value,
            amount: parseFloat(formData.get('transactionAmount') || document.getElementById('transactionAmount').value),
            clientId: parseInt(formData.get('transactionClient') || document.getElementById('transactionClient').value) || null,
            date: formData.get('transactionDate') || document.getElementById('transactionDate').value,
            status: 'completed'
        };

        try {
            await this.saveToDB('transactions', transaction);
            await this.loadData();
            this.closeModal();
            this.showToast('Transaction saved successfully!', 'success');
            if (this.currentPage === 'transactions') {
                this.renderTransactions();
            }
        } catch (error) {
            console.error('Error saving transaction:', error);
            this.showToast('Error saving transaction', 'error');
        }
    }

    // Quick Actions
    handleQuickAction(actionType) {
        switch (actionType) {
            case 'add-project':
                this.openProjectModal();
                break;
            case 'add-client':
                this.openClientModal();
                break;
            case 'add-transaction':
                this.openTransactionModal();
                break;
            case 'export-data':
                this.exportData();
                break;
        }
    }

    // Utility Functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    updateFooterStats() {
        document.getElementById('footerProjects').textContent = this.data.projects.length;
        document.getElementById('footerClients').textContent = this.data.clients.length;
        
        const totalRevenue = this.data.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        document.getElementById('footerRevenue').textContent = this.formatCurrency(totalRevenue);
    }

    async refreshData() {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
        }
        
        await this.loadData();
        this.renderCurrentPage();
        
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        }
        
        this.showToast('Data refreshed successfully!', 'success');
    }

    exportData() {
        const data = {
            projects: this.data.projects,
            clients: this.data.clients,
            transactions: this.data.transactions,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `omnitrack-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Data exported successfully!', 'success');
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const appContainer = document.getElementById('appContainer');
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            appContainer.classList.add('loaded');
        }, 1500);
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new OmniTrackApp();
});

// Global functions for onclick handlers
window.app = {
    openProjectModal: (id) => app.openProjectModal(id),
    openClientModal: (id) => app.openClientModal(id),
    openTransactionModal: (id) => app.openTransactionModal(id),
    editProject: (id) => app.openProjectModal(id),
    editClient: (id) => app.openClientModal(id),
    editTransaction: (id) => app.openTransactionModal(id),
    viewProject: (id) => console.log('View project:', id),
    viewClient: (id) => console.log('View client:', id),
    deleteTransaction: (id) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            app.deleteFromDB('transactions', id).then(() => {
                app.loadData().then(() => {
                    app.renderTransactions();
                    app.showToast('Transaction deleted successfully!', 'success');
                });
            });
        }
    }
};