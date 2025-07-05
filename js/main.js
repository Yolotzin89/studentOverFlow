// JavaScript principal para StudentOverflow

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Auto-cerrar alertas después de 5 segundos
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

    // Validación de formulario de registro
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const password = document.querySelector('#password').value;
            const confirmPassword = document.querySelector('#confirm_password').value;
            
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Las contraseñas no coinciden');
                return false;
            }
            
            if (password.length < 6) {
                e.preventDefault();
                alert('La contraseña debe tener al menos 6 caracteres');
                return false;
            }
        });
    }

    // Función para votar respuestas (para implementar más tarde)
    function voteAnswer(answerId, action) {
        fetch(`/vote/${answerId}/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const voteElement = document.querySelector(`#votes-${answerId}`);
            if (voteElement) {
                voteElement.textContent = data.votes;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Agregar event listeners para botones de voto
    const voteButtons = document.querySelectorAll('.vote-btn');
    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answerId = this.dataset.answerId;
            const action = this.dataset.action;
            voteAnswer(answerId, action);
        });
    });

    // Función para destacar código en preguntas y respuestas
    function highlightCode() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.classList.add('language-generic');
        });
    }

    // Llamar función de destacado
    highlightCode();

    // Función para formatear fechas de manera más amigable
    function formatDates() {
        const dateElements = document.querySelectorAll('.date-format');
        dateElements.forEach(element => {
            const date = new Date(element.dataset.date);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                element.textContent = 'Hace 1 día';
            } else if (diffDays < 7) {
                element.textContent = `Hace ${diffDays} días`;
            } else {
                element.textContent = date.toLocaleDateString('es-ES');
            }
        });
    }

    // Llamar función de formateo de fechas
    formatDates();

    // Función para buscar preguntas (para implementar más tarde)
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const questions = document.querySelectorAll('.question-card');
            
            questions.forEach(question => {
                const title = question.querySelector('.question-title').textContent.toLowerCase();
                const content = question.querySelector('.question-content').textContent.toLowerCase();
                
                if (title.includes(query) || content.includes(query)) {
                    question.style.display = 'block';
                } else {
                    question.style.display = 'none';
                }
            });
        });
    }

    // Función para mostrar/ocultar formulario de respuesta
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answerId = this.dataset.questionId;
            const answerForm = document.querySelector(`#answerForm-${answerId}`);
            
            if (answerForm) {
                answerForm.style.display = answerForm.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    // Contador de caracteres para textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        if (maxLength) {
            const counter = document.createElement('div');
            counter.className = 'text-muted small text-end';
            counter.textContent = `0/${maxLength}`;
            textarea.parentNode.appendChild(counter);
            
            textarea.addEventListener('input', function() {
                counter.textContent = `${this.value.length}/${maxLength}`;
                
                if (this.value.length > maxLength * 0.9) {
                    counter.className = 'text-warning small text-end';
                } else {
                    counter.className = 'text-muted small text-end';
                }
            });
        }
    });

    // Función para confirmar acciones destructivas
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('¿Estás seguro de que quieres eliminar esto?')) {
                e.preventDefault();
            }
        });
    });

    // Función para expandir/contraer respuestas largas
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.previousElementSibling;
            const isExpanded = content.style.maxHeight !== '100px';
            
            if (isExpanded) {
                content.style.maxHeight = '100px';
                this.textContent = 'Ver más';
            } else {
                content.style.maxHeight = 'none';
                this.textContent = 'Ver menos';
            }
        });
    });

    // Función para scroll suave
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('StudentOverflow JavaScript cargado correctamente');
});