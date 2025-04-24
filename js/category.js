document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('category-form');
    const messageBox = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('server/category/create_cat.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            messageBox.textContent = data.message;
            messageBox.className = data.status;

            if (data.status === 'success') {
                form.reset();
            }
        })
        .catch(error => {
            messageBox.textContent = 'Error en la conexión.';
            messageBox.className = 'error';
        });
    });
});
