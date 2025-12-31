// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialisation d'ApexCharts
    function initApexChart() {
        if (document.getElementById('apexChart')) {
            const options = {
                series: [{
                    name: 'Performance',
                    data: [78, 34, 67, 28, 39, 80]
                }],
                chart: {
                    type: 'bar',
                    height: '100%',
                    fontFamily: 'Inter, sans-serif',
                    toolbar: {
                        show: false
                    },
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800,
                        animateGradually: {
                            enabled: true,
                            delay: 150
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 350
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        borderRadius: 8,
                        columnWidth: '55%',
                        distributed: true,
                        dataLabels: {
                            position: 'top'
                        }
                    }
                },
                colors: ['#f0f0f0', '#f0f0f0', '#ff6b4a', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
                dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                        return val + '%';
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '11px',
                        fontWeight: '500',
                        colors: ['#666']
                    }
                },
                legend: {
                    show: false
                },
                grid: {
                    show: false
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    labels: {
                        style: {
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            colors: '#666'
                        }
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                yaxis: {
                    labels: {
                        show: false
                    },
                    max: 100
                },
                annotations: {
                    yaxis: [{
                        y: 50,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        strokeDashArray: 5,
                        label: {
                            borderColor: '#1c3542',
                            style: {
                                color: '#fff',
                                background: '#1c3542',
                                padding: {
                                    left: 8,
                                    right: 8,
                                    top: 4,
                                    bottom: 4
                                },
                                borderRadius: 4
                            },
                            text: 'Avg $150k',
                            position: 'left',
                            offsetX: 0
                        }
                    }]
                },
                responsive: [{
                    breakpoint: 768,
                    options: {
                        plotOptions: {
                            bar: {
                                columnWidth: '70%'
                            }
                        }
                    }
                }, {
                    breakpoint: 480,
                    options: {
                        plotOptions: {
                            bar: {
                                columnWidth: '80%'
                            }
                        },
                        dataLabels: {
                            offsetY: -15,
                            style: {
                                fontSize: '10px'
                            }
                        }
                    }
                }]
            };

            const chart = new ApexCharts(document.getElementById('apexChart'), options);
            chart.render();
            
            // Gérer le redimensionnement
            window.addEventListener('resize', function() {
                chart.updateOptions({
                    // Les options se mettent à jour automatiquement grâce aux règles responsive
                });
            });
        }
    }
    
    // Appeler la fonction d'initialisation du graphique
    initApexChart();

    // Calendar day selection
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.addEventListener('click', function() {
            // Remove selected class from all days
            days.forEach(d => d.classList.remove('selected'));
            // Add selected class to clicked day
            this.classList.add('selected');
        });
    });

    // Toggle dropdown for workspace
    const workspaceHeader = document.querySelector('.workspace-header');
    if (workspaceHeader) {
        workspaceHeader.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    }

    // Chat bubble animation
    const chatBubble = document.querySelector('.chat-bubble');
    if (chatBubble) {
        chatBubble.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        chatBubble.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
        
        chatBubble.addEventListener('click', function() {
            alert('Chat support would open here!');
        });
    }

    // Button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.opacity = '0.9';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.opacity = '1';
        });
    });

    // Navigation menu item hover effect
    const navItems = document.querySelectorAll('.nav-menu li:not(.active)');
    navItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#f5f5f5';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    // Simulate loading performance data
    setTimeout(() => {
        const metrics = document.querySelectorAll('.metric-value h2');
        metrics.forEach(metric => {
            // Add counting animation effect for numbers
            const finalValue = metric.textContent;
            let startValue = 0;
            
            if (finalValue.includes(',')) {
                startValue = parseInt(finalValue.replace(/,/g, '')) * 0.7;
            } else {
                startValue = parseFloat(finalValue) * 0.7;
            }
            
            // No animation needed for demo, just showing how you could animate the numbers
            console.log(`Would animate ${startValue} to ${finalValue}`);
        });
    }, 500);

    // Gestion du menu mobile et responsive
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle du menu mobile
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle de l'overlay
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }
            
            // Changer l'icône du bouton
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Fermer le menu en cliquant sur l'overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Réinitialiser l'icône
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fermer le menu quand on clique sur un lien (pour mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
                
                // Réinitialiser l'icône
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Ajuster la classe active en fonction de la page courante
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        // Nettoyer les classes active existantes sur les liens
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            // Ajouter la classe active au lien
            link.classList.add('active');
            // Rendre l'élément li parent actif
            if (link.parentElement) {
            link.parentElement.classList.add('active');
            }
        }
    });
    
    // Gestion du redimensionnement de fenêtre
    function handleResize() {
        if (window.innerWidth > 768) {
            // Fermer menu mobile si ouvert
            sidebar.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
            }
            
            // Réinitialiser bouton
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Forcer une mise à jour du layout
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Appel initial
    
    // Gestion des popins (dropdowns)
    
    // Créer l'overlay pour fermer les dropdowns en cliquant à l'extérieur
    const dropdownOverlay = document.createElement('div');
    dropdownOverlay.className = 'dropdown-overlay';
    document.body.appendChild(dropdownOverlay);
    
    // Sélectionner les boutons de dropdown
    const languageBtn = document.querySelector('.header-actions .icon-button:first-of-type');
    const notificationsBtn = document.querySelector('.header-actions .icon-button:nth-of-type(2)');
    const profileBtn = document.querySelector('.user-profile');
    
    // Créer les popins s'ils n'existent pas
    // Popin de langue
    const langDropdown = document.createElement('div');
    langDropdown.className = 'dropdown-modal language-dropdown';
    langDropdown.innerHTML = `
        <div class="dropdown-header">
            <h4>Langue</h4>
            <button class="close-dropdown"><i class="fas fa-times"></i></button>
        </div>
        <div class="dropdown-content">
            <div class="language-option selected">
                <span class="language-flag">🇫🇷</span>
                <div class="language-info">
                    <span class="language-name">Français</span>
                    <span class="language-status">Courant</span>
                </div>
                <span class="language-check"><i class="fas fa-check"></i></span>
            </div>
            <div class="language-option">
                <span class="language-flag">🇬🇧</span>
                <div class="language-info">
                    <span class="language-name">English</span>
                </div>
            </div>
            <div class="language-option">
                <span class="language-flag">🇪🇸</span>
                <div class="language-info">
                    <span class="language-name">Español</span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(langDropdown);

    // Popin de notifications
    const notifDropdown = document.createElement('div');
    notifDropdown.className = 'dropdown-modal notifications-dropdown';
    notifDropdown.innerHTML = `
        <div class="dropdown-header">
            <h4>Notifications</h4>
            <div class="dropdown-actions">
                <button class="mark-all-read">Tout marquer comme lu</button>
                <button class="close-dropdown"><i class="fas fa-times"></i></button>
            </div>
        </div>
        <div class="notification-tabs">
            <button class="notification-tab active">Tous</button>
            <button class="notification-tab">Non lus</button>
        </div>
        <div class="notifications-list">
            <div class="notification-item unread">
                <div class="notification-icon campaign"><i class="fas fa-envelope"></i></div>
                <div class="notification-content">
                    <div class="notification-text">Votre campagne <strong>Soldes d'été</strong> a atteint 80% de taux d'ouverture!</div>
                    <div class="notification-time">Il y a 2 heures</div>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon subscriber"><i class="fas fa-user-plus"></i></div>
                <div class="notification-content">
                    <div class="notification-text">42 nouveaux abonnés depuis votre dernière campagne</div>
                    <div class="notification-time">Hier</div>
                </div>
            </div>
        </div>
        <div class="notifications-footer">
            <a href="#" class="view-all">Voir toutes les notifications</a>
        </div>
    `;
    document.body.appendChild(notifDropdown);

    // Popin de profil
    const profDropdown = document.createElement('div');
    profDropdown.className = 'dropdown-modal profile-dropdown';
    profDropdown.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User">
            </div>
            <div class="profile-info">
                <h4>James Passaquindici</h4>
                <p>jamespass@em.com</p>
                <span class="badge plan-badge">Free Plan</span>
            </div>
        </div>
        <div class="profile-menu">
            <a href="#" class="profile-menu-item">
                <i class="fas fa-user"></i>
                <span>Mon profil</span>
            </a>
            <a href="#" class="profile-menu-item">
                <i class="fas fa-cog"></i>
                <span>Paramètres</span>
            </a>
            <a href="#" class="profile-menu-item">
                <i class="fas fa-credit-card"></i>
                <span>Facturation</span>
                <span class="menu-badge">1</span>
            </a>
            <div class="menu-separator"></div>
            <a href="#" class="profile-menu-item logout">
                <i class="fas fa-sign-out-alt"></i>
                <span>Déconnexion</span>
            </a>
        </div>
    `;
    document.body.appendChild(profDropdown);

    // Fonction pour fermer tous les dropdowns
    function closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-modal');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            dropdown.style.display = '';
        });
        dropdownOverlay.classList.remove('active');
    }
    
    // Ajouter les listeners de fermeture
    document.querySelectorAll('.close-dropdown').forEach(btn => {
        btn.addEventListener('click', closeAllDropdowns);
    });
    
    dropdownOverlay.addEventListener('click', closeAllDropdowns);
    
    // Fonction pour afficher un dropdown
    function showDropdown(dropdown, button) {
        closeAllDropdowns();
        if (dropdown) {
            // Positionner le dropdown sous le bouton
            const buttonRect = button.getBoundingClientRect();
            dropdown.style.position = 'fixed';
            dropdown.style.top = (buttonRect.bottom + 10) + 'px';
            dropdown.style.right = (window.innerWidth - buttonRect.right) + 'px';
            dropdown.style.display = 'block';
            dropdown.classList.add('active');
            dropdownOverlay.classList.add('active');
        }
    }
    
    // Ajouter les événements de clic pour ouvrir les dropdowns
    if (languageBtn) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showDropdown(langDropdown, languageBtn);
        });
    }
    
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showDropdown(notifDropdown, notificationsBtn);
        });
    }
    
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showDropdown(profDropdown, profileBtn);
        });
    }
    
    // Empêcher la propagation du clic dans les dropdowns
    document.querySelectorAll('.dropdown-modal').forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Gestion des tabs dans les notifications
    const notificationTabs = document.querySelectorAll('.notification-tab');
    notificationTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            notificationTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Événement pour marquer toutes les notifications comme lues
    const markAllReadBtn = document.querySelector('.mark-all-read');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
        });
    }
    
    // Interactions avec les options de langue
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            languageOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            // Dans une vraie application, on changerait la langue ici
        });
    });

    // Gestion des boutons dans la section API & Webhooks
    const manageKeysBtn = document.querySelector('.api-stat:nth-child(1) .btn-secondary');
    const configureWebhooksBtn = document.querySelector('.api-stat:nth-child(2) .btn-secondary');

    // Fonction pour créer une popin modale
    function createModal(title, content) {
        // Créer l'élément de popin
        const modal = document.createElement('div');
        modal.className = 'api-modal';
        
        // Structure de la popin
        modal.innerHTML = `
            <div class="api-modal-content">
                <div class="api-modal-header">
                    <h3>${title}</h3>
                    <button class="api-modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="api-modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        // Ajouter au document
        document.body.appendChild(modal);
        
        // Gérer la fermeture
        const closeBtn = modal.querySelector('.api-modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Fermer la modale en cliquant à l'extérieur
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Ajouter les styles CSS pour la modale
        const style = document.createElement('style');
        style.textContent = `
            .api-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            }
            
            .api-modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
                animation: slideUp 0.3s ease;
            }
            
            .api-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 25px;
                border-bottom: 1px solid #eaeaea;
            }
            
            .api-modal-header h3 {
                font-size: 18px;
                font-weight: 600;
                color: #1c3542;
                margin: 0;
            }
            
            .api-modal-close {
                background: none;
                border: none;
                color: #666;
                font-size: 16px;
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.2s;
            }
            
            .api-modal-close:hover {
                background-color: #f5f5f5;
            }
            
            .api-modal-body {
                padding: 25px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .api-table {
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
                margin-bottom: 20px;
            }
            
            .api-table th, .api-table td {
                padding: 12px 15px;
                text-align: left;
                border-bottom: 1px solid #eaeaea;
            }
            
            .api-table th {
                font-weight: 600;
                color: #555;
            }
            
            .api-table tr:last-child td {
                border-bottom: none;
            }
            
            .api-form-group {
                margin-bottom: 20px;
            }
            
            .api-form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                font-size: 14px;
            }
            
            .api-form-group input, .api-form-group select {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
            }
            
            .api-form-group select {
                background-color: white;
            }
            
            .api-checkbox-group {
                margin-top: 15px;
            }
            
            .api-checkbox-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .api-checkbox-item input {
                margin-right: 10px;
            }
            
            .api-form-submit {
                background-color: #1c3542;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 10px 20px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .api-form-submit:hover {
                background-color: #15242d;
            }
            
            .api-action-btn {
                background: none;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 5px 10px;
                font-size: 12px;
                margin-right: 5px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .api-action-btn:hover {
                background-color: #f5f5f5;
            }
            
            .api-action-btn.delete {
                background-color: #fff0f0;
                border-color: #ffcaca;
                color: #ff5050;
            }
            
            .api-action-btn.delete:hover {
                background-color: #ff5050;
                border-color: #ff5050;
                color: white;
            }
            
            .api-action-btn.copy:hover {
                background-color: #f0f7ff;
                border-color: #c5e0ff;
                color: #0066cc;
            }
            
            .api-action-btn.regenerate:hover {
                background-color: #f0fff5;
                border-color: #c5ffd8;
                color: #00b450;
            }
            
            .api-note {
                background-color: #f9f9f9;
                border-left: 3px solid #ddd;
                padding: 15px;
                margin-top: 20px;
                font-size: 13px;
                color: #666;
            }
            
            .api-section {
                margin-bottom: 30px;
            }
            
            .api-section-title {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid #eaeaea;
            }
        `;
        document.head.appendChild(style);
        
        return modal;
    }

    // Contenu de la popin "Gérer les clés API"
    const keysModalContent = `
        <div class="api-section">
            <div class="api-section-title">Clés API existantes</div>
            <table class="api-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Clé</th>
                        <th>Créée le</th>
                        <th>Expiration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>API Production</td>
                        <td><code>ak_8f72...3e91</code></td>
                        <td>12/04/2023</td>
                        <td>Jamais</td>
                        <td>
                            <button class="api-action-btn delete"><i class="fas fa-trash"></i> Supprimer</button>
                        </td>
                    </tr>
                    <tr>
                        <td>API Développement</td>
                        <td><code>ak_3b9d...f72a</code></td>
                        <td>05/01/2023</td>
                        <td>30/06/2023</td>
                        <td>
                            <button class="api-action-btn delete"><i class="fas fa-trash"></i> Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="api-section">
            <div class="api-section-title">Générer une nouvelle clé API</div>
            <form>
                <div class="api-form-group">
                    <label for="key-name">Nom de la clé</label>
                    <input type="text" id="key-name" placeholder="ex: API Test" required>
                </div>
                <div class="api-form-group">
                    <label for="key-permissions">Droits d'accès</label>
                    <select id="key-permissions">
                        <option value="read">Lecture seule</option>
                        <option value="write">Lecture et écriture</option>
                        <option value="admin">Accès complet</option>
                    </select>
                </div>
                <div class="api-form-group">
                    <label for="key-expiration">Durée de validité</label>
                    <select id="key-expiration">
                        <option value="30">30 jours</option>
                        <option value="90">90 jours</option>
                        <option value="365">1 an</option>
                        <option value="0">Illimitée</option>
                    </select>
                </div>
                <button type="button" class="api-form-submit">Générer une nouvelle clé</button>
            </form>
        </div>
        
        <div class="api-note">
            <strong>Note de sécurité :</strong> Les clés API permettent un accès complet à votre compte. Ne les partagez jamais et stockez-les de manière sécurisée.
            <br><br>
            <a href="#" style="color: #1c3542; text-decoration: none;">En savoir plus sur la sécurisation de vos clés API →</a>
        </div>
    `;

    // Contenu de la popin "Configurer les webhooks"
    const webhooksModalContent = `
        <div class="api-section">
            <div class="api-section-title">Webhooks configurés</div>
            <table class="api-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>URL</th>
                        <th>Événements</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Notification CRM</td>
                        <td class="webhook-url">https://crm.company.com/api/events</td>
                        <td>email.opened, subscription.created</td>
                        <td><span class="badge status active">Actif</span></td>
                        <td>
                            <button class="api-action-btn delete"><i class="fas fa-trash"></i> Supprimer</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Analytics</td>
                        <td class="webhook-url">https://analytics.company.com/hooks</td>
                        <td>campaign.sent, campaign.completed</td>
                        <td><span class="badge status active">Actif</span></td>
                        <td>
                            <button class="api-action-btn delete"><i class="fas fa-trash"></i> Supprimer</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Système de facturation</td>
                        <td class="webhook-url">https://billing.example.com/webhooks</td>
                        <td>subscription.updated, subscription.deleted</td>
                        <td><span class="badge status inactive">Inactif</span></td>
                        <td>
                            <button class="api-action-btn delete"><i class="fas fa-trash"></i> Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="api-section">
            <div class="api-section-title">Ajouter un nouveau webhook</div>
            <form>
                <div class="api-form-group">
                    <label for="webhook-name">Nom du webhook</label>
                    <input type="text" id="webhook-name" placeholder="ex: Intégration CRM" required>
                </div>
                <div class="api-form-group">
                    <label for="webhook-url">URL du endpoint</label>
                    <input type="url" id="webhook-url" placeholder="https://" required>
                </div>
                <div class="api-form-group">
                    <label>Événements à notifier</label>
                    
                    <div class="api-checkbox-group">
                        <div class="api-section-title" style="font-size: 14px; color: #666;">Emails</div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-email-sent"> 
                            <label for="event-email-sent">email.sent - Email envoyé</label>
                        </div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-email-opened"> 
                            <label for="event-email-opened">email.opened - Email ouvert</label>
                        </div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-email-clicked"> 
                            <label for="event-email-clicked">email.clicked - Lien cliqué</label>
                        </div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-email-bounced"> 
                            <label for="event-email-bounced">email.bounced - Email rebondi</label>
                        </div>
                    </div>
                    
                    <div class="api-checkbox-group">
                        <div class="api-section-title" style="font-size: 14px; color: #666;">Abonnés</div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-subscription-created"> 
                            <label for="event-subscription-created">subscription.created - Nouvel abonné</label>
                        </div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-subscription-updated"> 
                            <label for="event-subscription-updated">subscription.updated - Abonné modifié</label>
                        </div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-subscription-deleted"> 
                            <label for="event-subscription-deleted">subscription.deleted - Désabonnement</label>
                        </div>
                    </div>
                    
                    <div class="api-checkbox-group">
                        <div class="api-section-title" style="font-size: 14px; color: #666;">Campagnes</div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-campaign-created"> 
                            <label for="event-campaign-created">campaign.created - Campagne créée</label>
                        </div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-campaign-sent"> 
                            <label for="event-campaign-sent">campaign.sent - Campagne envoyée</label>
                        </div>
                        <div class="api-checkbox-item">
                            <input type="checkbox" id="event-campaign-completed"> 
                            <label for="event-campaign-completed">campaign.completed - Campagne terminée</label>
                        </div>
                    </div>
                </div>
                
                <div class="api-form-group">
                    <label for="webhook-secret">Secret partagé (pour la signature)</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="webhook-secret" placeholder="Secret" style="flex: 1;">
                        <button type="button" class="api-action-btn" style="flex-shrink: 0;"><i class="fas fa-random"></i> Générer</button>
                    </div>
                </div>
                
                <div class="api-checkbox-item" style="margin-top: 15px;">
                    <input type="checkbox" id="webhook-active" checked> 
                    <label for="webhook-active">Webhook actif</label>
                </div>
                
                <button type="button" class="api-form-submit" style="margin-top: 20px;">Enregistrer le webhook</button>
            </form>
        </div>
        
        <div class="api-section">
            <div class="api-section-title">Historique des exécutions récentes</div>
            <table class="api-table">
                <thead>
                    <tr>
                        <th>Webhook</th>
                        <th>Événement</th>
                        <th>Date</th>
                        <th>Statut</th>
                        <th>Temps de réponse</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Notification CRM</td>
                        <td>subscription.created</td>
                        <td>Aujourd'hui 14:32</td>
                        <td><span class="badge status active">200 OK</span></td>
                        <td>342 ms</td>
                    </tr>
                    <tr>
                        <td>Analytics</td>
                        <td>email.opened</td>
                        <td>Aujourd'hui 12:15</td>
                        <td><span class="badge status active">200 OK</span></td>
                        <td>156 ms</td>
                    </tr>
                    <tr>
                        <td>Système de facturation</td>
                        <td>campaign.sent</td>
                        <td>Hier 18:45</td>
                        <td><span class="badge status inactive">504 Timeout</span></td>
                        <td>5000+ ms</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="api-note">
            <a href="#" style="color: #1c3542; text-decoration: none; font-weight: 500;">Guide d'implémentation des webhooks →</a>
        </div>
    `;

    // Ajouter les écouteurs d'événements pour les boutons
    if (manageKeysBtn) {
        manageKeysBtn.addEventListener('click', function() {
            createModal('Gestion des clés API', keysModalContent);
        });
    }

    if (configureWebhooksBtn) {
        configureWebhooksBtn.addEventListener('click', function() {
            createModal('Configuration des webhooks', webhooksModalContent);
        });
    }
}); 