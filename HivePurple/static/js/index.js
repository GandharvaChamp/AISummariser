document.addEventListener('DOMContentLoaded', function() {
    // Handle custom prompt visibility
    const promptOption = document.getElementById('prompt_option');
    const customPromptGroup = document.getElementById('custom_prompt_group');

    // Hide custom prompt initially
    if (customPromptGroup) {
        customPromptGroup.style.display = 'none';
    }

    // Show/hide custom prompt based on selection
    if (promptOption) {
        promptOption.addEventListener('change', function() {
            customPromptGroup.style.display =
                this.value === 'custom' ? 'block' : 'none';
        });
    }
});

window.showForm = function(type) {
    // Hide all forms
    document.querySelectorAll('.form-container').forEach(form => {
        form.style.display = 'none';
    });

    // Show selected form
    const selectedForm = document.getElementById(`${type}-form`);
    if (selectedForm) {
        selectedForm.style.display = 'block';
    }
};