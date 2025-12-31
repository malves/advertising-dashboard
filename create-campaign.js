// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Variables pour les types de campagnes
    const campaignTypes = document.querySelectorAll('.campaign-type');
    const detailsContainer = document.getElementById('campaign-details-container');
    const emailDetails = document.getElementById('email-details');
    const smsDetails = document.getElementById('sms-details');
    const notificationDetails = document.getElementById('notification-details');
    const multiDetails = document.getElementById('multi-details');
    
    // Variables pour les modals
    const segmentsModal = document.getElementById('segments-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeSegmentsModal = document.getElementById('close-segments-modal');
    const cancelSegments = document.getElementById('cancel-segments');
    const applySegments = document.getElementById('apply-segments');
    const addAudienceButtons = document.querySelectorAll('.add-audience-btn');
    
    // Variables pour la création de segment
    const newSegmentBtn = document.querySelector('.btn-new-segment');
    const segmentsList = document.querySelector('.segments-list');
    const createSegmentForm = document.querySelector('.create-segment-form');
    const cancelCreateSegment = document.getElementById('cancel-create-segment');
    const saveNewSegment = document.getElementById('save-new-segment');
    const addCriteriaBtn = document.querySelector('.add-criteria-btn');
    
    // Variables pour les options de planification
    const scheduleOptions = document.querySelectorAll('.schedule-option');
    
    // Sélection de type de campagne
    campaignTypes.forEach(type => {
        type.addEventListener('click', function() {
            // Enlever la classe active de tous les types
            campaignTypes.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active au type cliqué
            this.classList.add('active');
            
            // Afficher le conteneur de détails
            detailsContainer.classList.remove('hidden');
            
            // Cacher tous les templates de détails
            emailDetails.classList.add('hidden');
            smsDetails.classList.add('hidden');
            notificationDetails.classList.add('hidden');
            multiDetails.classList.add('hidden');
            
            // Afficher le template correspondant au type sélectionné
            const campaignType = this.getAttribute('data-type');
            switch(campaignType) {
                case 'email':
                    emailDetails.classList.remove('hidden');
                    break;
                case 'sms':
                    smsDetails.classList.remove('hidden');
                    break;
                case 'notification':
                    notificationDetails.classList.remove('hidden');
                    break;
                case 'multi':
                    multiDetails.classList.remove('hidden');
                    break;
            }
        });
    });

    // Fonctions pour la modal de segments
    function openSegmentsModal() {
        segmentsModal.classList.add('active');
        modalOverlay.classList.add('active');
    }
    
    function closeSegmentsModal() {
        segmentsModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        // Revenir à la liste de segments si on était en mode création
        segmentsList.classList.remove('hidden');
        createSegmentForm.classList.add('hidden');
    }
    
    // Gestion des clics pour ouvrir la modal de segments
    addAudienceButtons.forEach(button => {
        button.addEventListener('click', openSegmentsModal);
    });
    
    // Gestion des clics pour fermer la modal
    closeSegmentsModal.addEventListener('click', closeSegmentsModal);
    cancelSegments.addEventListener('click', closeSegmentsModal);
    modalOverlay.addEventListener('click', closeSegmentsModal);
    
    // Gestion de la création de segment
    newSegmentBtn.addEventListener('click', function() {
        segmentsList.classList.add('hidden');
        createSegmentForm.classList.remove('hidden');
    });
    
    cancelCreateSegment.addEventListener('click', function() {
        segmentsList.classList.remove('hidden');
        createSegmentForm.classList.add('hidden');
    });
    
    // Ajouter un critère de segmentation
    addCriteriaBtn.addEventListener('click', function() {
        const criteriaBuilder = document.querySelector('.criteria-builder');
        const newRow = document.createElement('div');
        newRow.className = 'criteria-row';
        newRow.innerHTML = `
            <select class="criteria-field">
                <option value="email_open">Ouverture d'email</option>
                <option value="click_rate">Taux de clic</option>
                <option value="purchase">Achat récent</option>
                <option value="location">Localisation</option>
                <option value="subscription_date">Date d'inscription</option>
            </select>
            <select class="criteria-operator">
                <option value="greater_than">Plus grand que</option>
                <option value="less_than">Plus petit que</option>
                <option value="equal">Égal à</option>
                <option value="contains">Contient</option>
            </select>
            <input type="text" class="criteria-value" placeholder="Valeur">
            <button class="remove-criteria"><i class="fas fa-times"></i></button>
        `;
        criteriaBuilder.appendChild(newRow);
        
        // Ajouter un event listener pour le bouton de suppression
        const removeBtn = newRow.querySelector('.remove-criteria');
        removeBtn.addEventListener('click', function() {
            criteriaBuilder.removeChild(newRow);
        });
    });
    
    // Supprimer un critère existant
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-criteria')) {
            const criteriaRow = e.target.closest('.criteria-row');
            criteriaRow.parentNode.removeChild(criteriaRow);
        }
    });
    
    // Appliquer les segments sélectionnés
    applySegments.addEventListener('click', function() {
        const selectedSegments = document.querySelectorAll('.segment-item input[type="checkbox"]:checked');
        const campaignType = document.querySelector('.campaign-type.active').getAttribute('data-type');
        let targetAudience;
        
        switch(campaignType) {
            case 'email':
                targetAudience = document.querySelector('#email-details .selected-audience');
                break;
            case 'sms':
                targetAudience = document.querySelector('#sms-details .selected-audience');
                break;
            case 'notification':
                // Les notifications n'ont pas de sélection d'audience dans le template original
                break;
            case 'multi':
                targetAudience = document.querySelector('#multi-details .selected-audience');
                break;
        }
        
        if (targetAudience) {
            // Vider les segments actuels
            targetAudience.innerHTML = '';
            
            // Ajouter les segments sélectionnés
            selectedSegments.forEach(segment => {
                const segmentItem = segment.closest('.segment-item');
                const segmentName = segmentItem.querySelector('.segment-name').textContent;
                const tag = document.createElement('span');
                tag.className = 'audience-tag';
                tag.innerHTML = `${segmentName} <i class="fas fa-times"></i>`;
                
                // Gérer la suppression du tag
                tag.querySelector('i').addEventListener('click', function() {
                    targetAudience.removeChild(tag);
                });
                
                targetAudience.appendChild(tag);
            });
        }
        
        closeSegmentsModal();
    });
    
    // Gestion de la planification (pour tous les types de campagnes)
    scheduleOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radioInput = this.querySelector('input[type="radio"]');
            const scheduleDatetime = this.parentElement.nextElementSibling;
            
            // Activer le radio bouton
            radioInput.checked = true;
            
            // Mettre à jour les classes actives
            this.parentElement.querySelectorAll('.schedule-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            // Afficher/cacher la sélection de date et heure
            if (radioInput.id.startsWith('schedule-later')) {
                scheduleDatetime.classList.remove('hidden');
            } else {
                scheduleDatetime.classList.add('hidden');
            }
        });
    });
    
    // Pour les campagnes SMS - Compteur de caractères
    const smsContent = document.getElementById('sms-content');
    const smsCharacterCount = document.getElementById('sms-character-count');
    
    if (smsContent && smsCharacterCount) {
        smsContent.addEventListener('input', function() {
            smsCharacterCount.textContent = this.value.length;
            
            // Avertissement visuel si dépassement
            if (this.value.length > 160) {
                smsCharacterCount.classList.add('warning');
            } else {
                smsCharacterCount.classList.remove('warning');
            }
        });
    }
    
    // Sauvegarde du brouillon
    const saveDraftBtn = document.querySelector('.save-draft-btn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            // Logique de sauvegarde du brouillon
            alert('Brouillon enregistré avec succès!');
        });
    }
}); 
}); 