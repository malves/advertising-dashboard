// Initialisation des graphiques et fonctionnalités pour la page Subscriptions
document.addEventListener('DOMContentLoaded', function() {

    // Graphique de tendance des abonnements
    if (document.getElementById('subscriptionTrend')) {
        const subscriptionTrendOptions = {
            series: [{
                name: 'Nouveaux abonnés',
                type: 'column',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70, 68, 74, 78, 85, 88, 90, 92, 95, 100, 102, 105, 108, 110, 112, 115, 118, 120, 123, 125, 128]
            }, {
                name: 'Désabonnements',
                type: 'column',
                data: [12, 11, 14, 18, 17, 13, 13, 15, 16, 14, 10, 9, 8, 12, 15, 13, 14, 10, 12, 9, 8, 7, 5, 6, 4, 5, 3, 4, 5, 6]
            }, {
                name: 'Croissance nette',
                type: 'line',
                data: [32, 44, 43, 38, 44, 45, 50, 45, 50, 56, 58, 65, 70, 73, 73, 77, 78, 85, 88, 93, 97, 101, 105, 106, 111, 113, 117, 119, 120, 122]
            }],
            chart: {
                height: 300,
                type: 'line',
                fontFamily: 'Inter, sans-serif',
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                }
            },
            stroke: {
                width: [0, 0, 3]
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#4CAF50', '#FF5252', '#1976D2'],
            xaxis: {
                categories: Array.from({length: 30}, (_, i) => i + 1),
                labels: {
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Nombre d\'abonnés'
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y) {
                        if (typeof y !== "undefined") {
                            return y.toFixed(0) + " abonnés";
                        }
                        return y;
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right'
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    legend: {
                        position: 'bottom',
                        horizontalAlign: 'center'
                    }
                }
            }]
        };

        const subscriptionTrend = new ApexCharts(document.getElementById('subscriptionTrend'), subscriptionTrendOptions);
        subscriptionTrend.render();
    }

    // Graphique de distribution géographique
    if (document.getElementById('geoChart')) {
        const geoChartOptions = {
            series: [42, 18, 14, 9, 17],
            chart: {
                type: 'donut',
                height: 250,
                fontFamily: 'Inter, sans-serif',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                }
            },
            labels: ['France', 'Belgique', 'Suisse', 'Canada', 'Autres'],
            colors: ['#3f51b5', '#4caf50', '#ff9800', '#e91e63', '#9c27b0'],
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total',
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => {
                                        return a + b;
                                    }, 0) + ' abonnés';
                                }
                            }
                        }
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        height: 200
                    }
                }
            }]
        };

        const geoChart = new ApexCharts(document.getElementById('geoChart'), geoChartOptions);
        geoChart.render();
    }

    // Graphique des sources d'abonnement
    if (document.getElementById('sourceChart')) {
        const sourceChartOptions = {
            series: [56.5, 19.5, 12.0, 6.7, 5.3],
            chart: {
                type: 'pie',
                height: 250,
                fontFamily: 'Inter, sans-serif',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                }
            },
            labels: ['Site web', 'Facebook', 'Instagram', 'Twitter', 'Autres'],
            colors: ['#3f51b5', '#3b5998', '#e1306c', '#1da1f2', '#9c27b0'],
            legend: {
                show: false
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(1) + "%";
                },
                style: {
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif'
                },
                dropShadow: {
                    enabled: false
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        height: 200
                    },
                    dataLabels: {
                        enabled: false
                    }
                }
            }]
        };

        const sourceChart = new ApexCharts(document.getElementById('sourceChart'), sourceChartOptions);
        sourceChart.render();
    }

    // Gestion des filtres et segments
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Supprime la classe active de tous les boutons du même groupe
            const parentGroup = this.parentElement;
            parentGroup.querySelectorAll('.btn-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            // Ajoute la classe active au bouton cliqué
            this.classList.add('active');
        });
    });
    
    // Gestion des segments
    const segmentButtons = document.querySelectorAll('.segment');
    segmentButtons.forEach(segment => {
        segment.addEventListener('click', function() {
            // Supprime la classe active de tous les segments
            document.querySelectorAll('.segment').forEach(seg => {
                seg.classList.remove('active');
            });
            // Ajoute la classe active au segment cliqué
            this.classList.add('active');
        });
    });
    
    // Gestion des checkboxes
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            document.querySelectorAll('.subscribers-table tbody input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });
    }
    
    // Animation au survol des lignes du tableau
    const tableRows = document.querySelectorAll('.subscribers-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseover', function() {
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'all 0.2s';
        });
        
        row.addEventListener('mouseout', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animation de la pagination
    const pageButtons = document.querySelectorAll('.page-button');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.querySelector('i')) {
                // Supprime la classe active de tous les boutons de pagination
                document.querySelectorAll('.page-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Ajoute la classe active au bouton cliqué
                this.classList.add('active');
            }
        });
    });

    // ===== GESTION DE LA MODAL D'IMPORT =====
    const importBtn = document.getElementById('import-subscribers-btn');
    const importModal = document.getElementById('import-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Ouverture de la modal
    if (importBtn && importModal && modalOverlay) {
        importBtn.addEventListener('click', function() {
            importModal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll
        });
    }
    
    // Fermeture de la modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    function closeModal() {
        importModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Gestion des onglets dans la modal
    const modalTabs = document.querySelectorAll('.modal-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtonSets = {
        'upload': document.getElementById('upload-tab-buttons'),
        'copy-paste': document.getElementById('copy-paste-tab-buttons'),
        'manual': document.getElementById('manual-tab-buttons')
    };
    
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Activer l'onglet
            modalTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Afficher le contenu de l'onglet
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Afficher les bons boutons d'action
            Object.values(tabButtonSets).forEach(buttonSet => {
                if (buttonSet) buttonSet.classList.add('hidden');
            });
            
            if (tabButtonSets[tabId]) {
                tabButtonSets[tabId].classList.remove('hidden');
            }
        });
    });
    
    // Gestion des étapes d'import de fichier
    const importSteps = document.querySelectorAll('.import-step');
    const stepContents = document.querySelectorAll('.import-step-content');
    const prevStepBtn = document.querySelector('.prev-step');
    const nextStepBtn = document.querySelector('.next-step');
    let currentStep = 0;
    
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', function() {
            if (currentStep < importSteps.length - 1) {
                // Si on est à l'étape 0 et qu'aucun fichier n'est sélectionné, bloquer
                if (currentStep === 0 && !document.querySelector('.dropzone-preview').classList.contains('active')) {
                    // Animation de secouement pour indiquer qu'un fichier est requis
                    const dropzone = document.getElementById('upload-dropzone');
                    if (dropzone) {
                        dropzone.classList.add('shake');
                        setTimeout(() => {
                            dropzone.classList.remove('shake');
                        }, 820);
                    }
                    return;
                }
                
                currentStep++;
                updateImportSteps();
                
                // Changer le texte du bouton à la dernière étape
                if (currentStep === importSteps.length - 1) {
                    this.textContent = "Importer";
                    this.classList.add('btn-import');
                }
            } else {
                // La dernière étape - lancer l'import
                alert('Import réalisé avec succès!');
                closeModal();
                
                // Reset modal state pour la prochaine ouverture
                resetModalState();
            }
        });
    }
    
    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', function() {
            if (currentStep > 0) {
                currentStep--;
                updateImportSteps();
                
                // Remettre le texte du bouton suivant
                if (nextStepBtn && currentStep < importSteps.length - 1) {
                    nextStepBtn.textContent = "Suivant";
                    nextStepBtn.classList.remove('btn-import');
                }
            }
        });
    }
    
    function updateImportSteps() {
        // Mettre à jour les indicateurs d'étape
        importSteps.forEach((step, index) => {
            step.classList.toggle('active', index <= currentStep);
            step.classList.toggle('completed', index < currentStep);
        });
        
        // Afficher le contenu d'étape approprié
        stepContents.forEach((content, index) => {
            content.classList.toggle('active', index === currentStep);
        });
        
        // Mettre à jour l'état des boutons
        if (prevStepBtn) {
            prevStepBtn.disabled = currentStep === 0;
        }
    }
    
    function resetModalState() {
        currentStep = 0;
        updateImportSteps();
        
        // Réinitialiser le fichier sélectionné
        if (fileInput) {
            fileInput.value = '';
        }
        
        // Masquer la prévisualisation
        if (dropzonePreview) {
            dropzonePreview.classList.remove('active');
            dropzonePreview.classList.add('hidden');
        }
        
        // Réinitialiser le texte du bouton
        if (nextStepBtn) {
            nextStepBtn.textContent = "Suivant";
            nextStepBtn.classList.remove('btn-import');
        }
    }
    
    // Gestion du drag & drop
    const dropzone = document.getElementById('upload-dropzone');
    const fileInput = document.getElementById('file-upload');
    const browseLink = document.querySelector('.browse-link');
    const dropzonePreview = document.querySelector('.dropzone-preview');
    const fileName = document.querySelector('.file-name');
    const fileSize = document.querySelector('.file-size');
    const removeFileBtn = document.querySelector('.remove-file');
    
    if (dropzone && fileInput) {
        // Clic sur le lien de parcours
        if (browseLink) {
            browseLink.addEventListener('click', function(e) {
                e.preventDefault();
                fileInput.click();
            });
        }
        
        // Changement de fichier via l'input
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
        
        // Drag & drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, unhighlight, false);
        });
        
        dropzone.addEventListener('drop', handleDrop, false);
        
        // Suppression du fichier
        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', function() {
                fileInput.value = '';
                dropzonePreview.classList.remove('active');
                dropzonePreview.classList.add('hidden');
            });
        }
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        function highlight() {
            dropzone.classList.add('highlight');
        }
        
        function unhighlight() {
            dropzone.classList.remove('highlight');
        }
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }
        
        function handleFiles(files) {
            if (files.length > 0) {
                updateFilePreview(files[0]);
            }
        }
        
        function updateFilePreview(file) {
            // Mettre à jour l'aperçu du fichier
            if (fileName) fileName.textContent = file.name;
            if (fileSize) fileSize.textContent = formatFileSize(file.size);
            
            dropzonePreview.classList.remove('hidden');
            dropzonePreview.classList.add('active');
        }
        
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Octets';
            
            const k = 1024;
            const sizes = ['Octets', 'Ko', 'Mo', 'Go'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    }
    
    // Gestion des tags de segment
    const segmentTagsClose = document.querySelectorAll('.segment-tag i');
    const addSegmentBtn = document.querySelector('.add-segment-btn');
    const segmentsModal = document.getElementById('segments-modal');
    const closeSegmentsModal = document.getElementById('close-segments-modal');
    const cancelSegmentsBtn = document.getElementById('cancel-segments');
    const applySegmentsBtn = document.getElementById('apply-segments');
    
    // Suppression des tags existants
    segmentTagsClose.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
    
    // Ouverture de la modal de segments
    if (addSegmentBtn && segmentsModal) {
        addSegmentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            segmentsModal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Fermeture de la modal de segments
    if (closeSegmentsModal) {
        closeSegmentsModal.addEventListener('click', closeSegmentsModalFunc);
    }
    
    if (cancelSegmentsBtn) {
        cancelSegmentsBtn.addEventListener('click', closeSegmentsModalFunc);
    }
    
    function closeSegmentsModalFunc() {
        if (segmentsModal) {
            segmentsModal.classList.remove('active');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Implémentation de la recherche de segments
    const segmentSearch = document.getElementById('segment-search');
    const segmentItems = document.querySelectorAll('.segment-item');
    
    if (segmentSearch) {
        segmentSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            segmentItems.forEach(item => {
                const segmentName = item.querySelector('.segment-name').textContent.toLowerCase();
                if (segmentName.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Sélection des segments
    const segmentCheckboxes = document.querySelectorAll('.segment-check input[type="checkbox"]');
    
    segmentItems.forEach(item => {
        item.addEventListener('click', function() {
            const checkbox = this.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                this.classList.toggle('selected', checkbox.checked);
            }
        });
    });
    
    segmentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            e.stopPropagation();
            const segmentItem = this.closest('.segment-item');
            if (segmentItem) {
                segmentItem.classList.toggle('selected', this.checked);
            }
        });
    });
    
    // Appliquer les segments sélectionnés
    if (applySegmentsBtn) {
        applySegmentsBtn.addEventListener('click', function() {
            // Récupérer tous les segments sélectionnés
            const selectedSegments = [];
            segmentCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const segmentItem = checkbox.closest('.segment-item');
                    if (segmentItem) {
                        const segmentName = segmentItem.querySelector('.segment-name').textContent;
                        const segmentId = segmentItem.getAttribute('data-segment');
                        selectedSegments.push({ id: segmentId, name: segmentName });
                    }
                }
            });
            
            // Ajouter les segments à la liste des tags
            addSelectedSegmentsToTags(selectedSegments);
            
            // Fermer la modal
            closeSegmentsModalFunc();
        });
    }
    
    function addSelectedSegmentsToTags(segments) {
        const segmentTags = document.querySelector('.segment-tags');
        if (!segmentTags) return;
        
        segments.forEach(segment => {
            // Vérifier si le segment existe déjà
            const existingTags = segmentTags.querySelectorAll('.segment-tag');
            let exists = false;
            
            existingTags.forEach(tag => {
                if (tag.querySelector('span').textContent === segment.name) {
                    exists = true;
                }
            });
            
            // Si le segment n'existe pas, l'ajouter
            if (!exists) {
                const newTag = document.createElement('div');
                newTag.className = 'segment-tag';
                newTag.innerHTML = `
                    <span>${segment.name}</span>
                    <i class="fas fa-times"></i>
                `;
                
                // Ajouter avant le bouton d'ajout
                const addBtn = segmentTags.querySelector('.add-segment-btn');
                if (addBtn) {
                    segmentTags.insertBefore(newTag, addBtn);
                } else {
                    segmentTags.appendChild(newTag);
                }
                
                // Ajouter l'événement de suppression
                newTag.querySelector('i').addEventListener('click', function() {
                    newTag.remove();
                });
            }
        });
    }
    
    // Gestion du formulaire de création de segment
    const btnNewSegment = document.querySelector('.btn-new-segment');
    const createSegmentForm = document.querySelector('.create-segment-form');
    const segmentsList = document.querySelector('.segments-list');
    const cancelCreateSegmentBtn = document.getElementById('cancel-create-segment');
    const saveNewSegmentBtn = document.getElementById('save-new-segment');
    
    if (btnNewSegment && createSegmentForm && segmentsList) {
        btnNewSegment.addEventListener('click', function() {
            segmentsList.classList.add('hidden');
            createSegmentForm.classList.remove('hidden');
        });
    }
    
    if (cancelCreateSegmentBtn && createSegmentForm && segmentsList) {
        cancelCreateSegmentBtn.addEventListener('click', function() {
            createSegmentForm.classList.add('hidden');
            segmentsList.classList.remove('hidden');
        });
    }
    
    // Gestion des conditions du segment
    const addConditionBtn = document.querySelector('.add-condition-btn');
    const segmentConditions = document.querySelector('.segment-conditions');
    
    if (addConditionBtn && segmentConditions) {
        addConditionBtn.addEventListener('click', function() {
            const newCondition = document.createElement('div');
            newCondition.className = 'condition-row';
            newCondition.innerHTML = `
                <select class="condition-field">
                    <option value="email">Email</option>
                    <option value="name">Nom</option>
                    <option value="activity">Activité</option>
                    <option value="purchase">Achat</option>
                    <option value="location">Localisation</option>
                </select>
                <select class="condition-operator">
                    <option value="contains">contient</option>
                    <option value="equals">est égal à</option>
                    <option value="starts">commence par</option>
                    <option value="ends">se termine par</option>
                </select>
                <input type="text" class="condition-value" placeholder="Valeur">
                <button class="remove-condition"><i class="fas fa-times"></i></button>
            `;
            
            segmentConditions.appendChild(newCondition);
            
            // Ajouter l'événement pour supprimer cette condition
            newCondition.querySelector('.remove-condition').addEventListener('click', function() {
                newCondition.remove();
            });
        });
    }
    
    // Gérer les boutons de suppression de condition existants
    document.querySelectorAll('.remove-condition').forEach(btn => {
        btn.addEventListener('click', function() {
            const conditionRow = this.closest('.condition-row');
            if (conditionRow) {
                conditionRow.remove();
            }
        });
    });
    
    // Sauvegarder un nouveau segment
    if (saveNewSegmentBtn) {
        saveNewSegmentBtn.addEventListener('click', function() {
            const segmentName = document.getElementById('new-segment-name');
            
            if (segmentName && !segmentName.value) {
                alert('Veuillez entrer un nom pour le segment');
                return;
            }
            
            // Création d'un nouveau segment
            const newSegment = {
                id: 'new-' + Date.now(),
                name: segmentName ? segmentName.value : 'Nouveau segment'
            };
            
            // Ajouter le segment à la liste des segments disponibles
            addNewSegmentToList(newSegment);
            
            // Ajouter le segment aux tags sélectionnés
            addSelectedSegmentsToTags([newSegment]);
            
            // Revenir à la liste des segments
            if (createSegmentForm && segmentsList) {
                createSegmentForm.classList.add('hidden');
                segmentsList.classList.remove('hidden');
            }
            
            // Notification de succès
            alert('Segment créé avec succès !');
        });
    }
    
    function addNewSegmentToList(segment) {
        const segmentItemsContainer = document.querySelector('.segment-items');
        if (!segmentItemsContainer) return;
        
        // Créer un nouvel élément segment
        const newSegmentItem = document.createElement('div');
        newSegmentItem.className = 'segment-item selected';
        newSegmentItem.setAttribute('data-segment', segment.id);
        
        // Générer un ID unique pour la checkbox
        const checkboxId = 'segment-' + Date.now();
        
        newSegmentItem.innerHTML = `
            <div class="segment-check">
                <input type="checkbox" id="${checkboxId}" checked>
                <label for="${checkboxId}"></label>
            </div>
            <div class="segment-info">
                <span class="segment-name">${segment.name}</span>
                <span class="segment-count">0 contacts</span>
            </div>
        `;
        
        // Ajouter au début de la liste
        segmentItemsContainer.prepend(newSegmentItem);
        
        // Ajouter les événements
        const checkbox = newSegmentItem.querySelector('input[type="checkbox"]');
        
        newSegmentItem.addEventListener('click', function() {
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                this.classList.toggle('selected', checkbox.checked);
            }
        });
        
        if (checkbox) {
            checkbox.addEventListener('change', function(e) {
                e.stopPropagation();
                newSegmentItem.classList.toggle('selected', this.checked);
            });
        }
    }
}); 