document.addEventListener('DOMContentLoaded', function() {
    // Store the document content and summary
    const documentContent = {
        summary: document.getElementById('summary-data').textContent, // Get summary from a hidden element
        fullText: document.getElementById('text-data').textContent // Get full text from a hidden element
    };

    // Toggle chat section visibility
    const chatToggle = document.getElementById('chatToggle');
    const chatSection = document.getElementById('chatSection');
    
    chatToggle.addEventListener('change', function() {
        if (this.checked) {
            chatSection.classList.remove('hidden');
        } else {
            chatSection.classList.add('hidden');
        }
    });

    // Handle Enter key to send message
    document.getElementById('question-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            window.askQuestion(documentContent); // Call the function from chat.js
        }
    });

    // Make the documentContent available globally for chat.js
    window.documentContent = documentContent;
    
    // Setup ask button click event
    document.getElementById('ask-button').addEventListener('click', function() {
        window.askQuestion(documentContent);
    });
});