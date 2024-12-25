const popupOverlay = document.getElementById('popup-overlay');
    const openPopupButton = document.getElementById('open-popup');
    const formElement = document.getElementById('feedback-form-element');

    openPopupButton.addEventListener('click', () => {
        popupOverlay.style.display = 'flex';
        history.pushState(null, '', '#feedback-form');
    });

    window.addEventListener('popstate', () => {
        if (popupOverlay.style.display === 'flex') {
            popupOverlay.style.display = 'none';
        }
    });

    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(formElement);

        try {
            const response = await fetch('https://formcarry.com/s/your-endpoint', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                formElement.reset();
                localStorage.removeItem('formData');
                popupOverlay.style.display = 'none';
                history.back();
            } else {
                throw new Error('Submission failed.');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });


    formElement.addEventListener('input', () => {
        const formData = {};
        Array.from(formElement.elements).forEach(input => {
            if (input.id && input.type !== 'submit') {
                formData[input.id] = input.value;
            }
        });
        localStorage.setItem('formData', JSON.stringify(formData));
    });