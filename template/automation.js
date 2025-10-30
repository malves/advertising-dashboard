// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Effet de survol pour les éléments d'automation
    const automationItems = document.querySelectorAll('.automation-item');
    automationItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.borderColor = '#c8e6c9';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.borderColor = '#eaeaea';
        });
    });

    // Boutons d'action pour les automations
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const automationName = this.closest('.automation-item').querySelector('h4').textContent;
            alert(`Éditer l'automation: ${automationName}`);
        });
    });

    const pauseButtons = document.querySelectorAll('.btn-pause');
    pauseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const automationItem = this.closest('.automation-item');
            const automationName = automationItem.querySelector('h4').textContent;
            const statusElement = automationItem.querySelector('.status');
            
            if (statusElement.classList.contains('active')) {
                const confirmation = confirm(`Voulez-vous mettre en pause l'automation "${automationName}" ?`);
                if (confirmation) {
                    // Simuler la mise en pause
                    statusElement.classList.remove('active');
                    statusElement.classList.add('inactive');
                    statusElement.textContent = 'Inactive';
                    
                    // Changer l'icône à play
                    this.innerHTML = '<i class="fas fa-play"></i>';
                    this.classList.remove('btn-pause');
                    this.classList.add('btn-play');
                    
                    // Changer la couleur de l'icône d'automation
                    const iconElement = automationItem.querySelector('.automation-icon');
                    iconElement.classList.remove('active');
                    iconElement.classList.add('inactive');
                }
            }
        });
    });

    const playButtons = document.querySelectorAll('.btn-play');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const automationItem = this.closest('.automation-item');
            const automationName = automationItem.querySelector('h4').textContent;
            const statusElement = automationItem.querySelector('.status');
            
            if (statusElement.classList.contains('inactive')) {
                const confirmation = confirm(`Voulez-vous activer l'automation "${automationName}" ?`);
                if (confirmation) {
                    // Simuler l'activation
                    statusElement.classList.remove('inactive');
                    statusElement.classList.add('active');
                    statusElement.textContent = 'Active';
                    
                    // Changer l'icône à pause
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                    this.classList.remove('btn-play');
                    this.classList.add('btn-pause');
                    
                    // Changer la couleur de l'icône d'automation
                    const iconElement = automationItem.querySelector('.automation-icon');
                    iconElement.classList.remove('inactive');
                    iconElement.classList.add('active');
                }
            }
        });
    });

    const moreButtons = document.querySelectorAll('.automation-actions .btn-more');
    moreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const automationName = this.closest('.automation-item').querySelector('h4').textContent;
            
            // Simuler un menu contextuel
            const options = [
                'Voir les statistiques',
                'Dupliquer',
                'Exporter',
                'Supprimer'
            ];
            
            const selectedOption = prompt(`Options pour "${automationName}":\n\n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}\n4. ${options[3]}\n\nEntrez le numéro de l'option:`);
            
            if (selectedOption && !isNaN(selectedOption)) {
                const optionIndex = parseInt(selectedOption) - 1;
                if (optionIndex >= 0 && optionIndex < options.length) {
                    alert(`Action sélectionnée: ${options[optionIndex]}`);
                    
                    // Si l'option est "Supprimer", demander confirmation
                    if (optionIndex === 3) {
                        const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer l'automation "${automationName}" ?`);
                        if (confirmDelete) {
                            // Simuler la suppression
                            this.closest('.automation-item').style.opacity = '0.5';
                            setTimeout(() => {
                                this.closest('.automation-item').remove();
                            }, 500);
                        }
                    }
                }
            }
        });
    });

    // Filtrer les automations
    const searchInput = document.querySelector('.search-filter input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            automationItems.forEach(item => {
                const automationName = item.querySelector('h4').textContent.toLowerCase();
                const automationDesc = item.querySelector('p').textContent.toLowerCase();
                
                if (automationName.includes(searchTerm) || automationDesc.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Templates d'automation
    const templateButtons = document.querySelectorAll('.use-template-btn');
    templateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateName = this.closest('.template-card').querySelector('h4').textContent;
            alert(`Création d'une nouvelle automation à partir du template: ${templateName}`);
        });
    });

    // Bouton "Créer une automation"
    const createButton = document.querySelector('.create-campaigns-btn');
    if (createButton) {
        createButton.addEventListener('click', function() {
            alert("Création d'une nouvelle automation");
        });
    }

    // Bouton "Voir tout" pour les templates
    const viewAllButton = document.querySelector('.view-all-btn');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            alert("Afficher tous les templates d'automation disponibles");
        });
    }

    // Tri des automations
    const sortButton = document.querySelector('.btn-sort');
    if (sortButton) {
        sortButton.addEventListener('click', function() {
            const sortOptions = ['Nom', 'Statut', 'Date d\'exécution', 'Engagement'];
            const selectedOption = prompt(`Trier par:\n\n1. ${sortOptions[0]}\n2. ${sortOptions[1]}\n3. ${sortOptions[2]}\n4. ${sortOptions[3]}\n\nEntrez le numéro de l'option:`);
            
            if (selectedOption && !isNaN(selectedOption)) {
                const optionIndex = parseInt(selectedOption) - 1;
                if (optionIndex >= 0 && optionIndex < sortOptions.length) {
                    alert(`Tri par: ${sortOptions[optionIndex]}`);
                }
            }
        });
    }
}); 