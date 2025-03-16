function summarizer() {
    var text = document.getElementById('text').value.trim();
    
    if (text === '') {
        document.getElementById('summarize_text').innerHTML = 'Please Enter Some Text';
        document.getElementById('summarize_text').classList.add('visible');
        updateCount();
        return;
    }

    var button = document.querySelector('button');
    var buttonText = document.getElementById('button-text');
    var spinner = document.getElementById('loading-spinner');
    button.disabled = true;
    buttonText.textContent = 'Summarizing...';
    spinner.style.display = 'block';

    fetch('/text-summarizer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var predictionText = data.summarizeText;
        document.getElementById('summarize_text').innerHTML = predictionText;
        document.getElementById('summarize_text').classList.add('visible');
        
        updateCount();
    })
    .catch(function(error) {
        document.getElementById('summarize_text').innerHTML = 'Error: ' + error.message;
        document.getElementById('summarize_text').classList.add('visible');
    })
    .finally(function() {
        button.disabled = false;
        buttonText.textContent = 'Summarize';
        spinner.style.display = 'none';
    });
}

function updateCount() {
    var text = document.getElementById('text').value;
    var textCount = text.length + ' characters, ' + text.trim().split(/\s+/).length + ' words';
    document.getElementById('text-count').textContent = textCount;

    var summarize = document.getElementById('summarize-container').textContent;
    var summarizeCount = summarize.trim().split(/\s+/).length + ' words';
    document.getElementById('summarize-count').textContent = summarizeCount;
}