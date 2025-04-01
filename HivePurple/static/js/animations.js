// Smooth form transitions and animations
document.addEventListener('DOMContentLoaded', () => {
    // Initial fade in of container
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '1';
    }
    
    // Function to show form with animation
    window.showForm = (formType) => {
        const youtubeForm = document.getElementById('youtube-form');
        const documentForm = document.getElementById('document-form');
        
        // Hide all forms first with proper transitions
        [youtubeForm, documentForm].forEach(form => {
            if (form) {
                form.classList.remove('active');
                // Wait for transition to complete before hiding
                setTimeout(() => {
                    if (!form.classList.contains('active')) {
                        form.style.display = 'none';
                    }
                }, 300); // Match transition duration from CSS
            }
        });
        
        // Show selected form with animation
        const selectedForm = formType === 'youtube' ? youtubeForm : documentForm;
        if (selectedForm) {
            selectedForm.style.display = 'block';
            // Trigger reflow
            selectedForm.offsetHeight;
            setTimeout(() => {
                selectedForm.classList.add('active');
            }, 10);
        }
    };

    // Smooth button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = `
                    <div class="loading">
                        <div></div>
                        <div></div>
                    </div>
                    Processing...
                `;
                submitButton.disabled = true;

                // Re-enable button after 30 seconds (failsafe)
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 30000);
            }
        });
    });

    // Smooth input focus effects
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'translateY(-1px)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'translateY(0)';
        });
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple');
        
        const rippleContainer = document.createElement('span');
        rippleContainer.classList.add('ripple-container');
        
        button.appendChild(rippleContainer);
        rippleContainer.appendChild(ripple);
        
        setTimeout(() => {
            rippleContainer.remove();
        }, 1000);
    }

    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Show/hide custom prompt based on selection
document.addEventListener('DOMContentLoaded', function() {
    const promptOption = document.getElementById('prompt_option');
    const customPromptGroup = document.getElementById('custom_prompt_group');
    
    if (promptOption && customPromptGroup) {
        // Initial check
        if (promptOption.value === 'custom') {
            customPromptGroup.style.display = 'block';
        } else {
            customPromptGroup.style.display = 'none';
        }
        
        // Add change listener
        promptOption.addEventListener('change', function() {
            if (this.value === 'custom') {
                customPromptGroup.style.display = 'block';
            } else {
                customPromptGroup.style.display = 'none';
            }
        });
    }
});
