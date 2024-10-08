document.addEventListener("DOMContentLoaded", function() {
    // Seleciona os elementos necessários
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');

    // Adiciona o evento de clique para alternar a visibilidade da senha
    togglePassword.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? 'Mostrar Senha' : 'Ocultar Senha';
    });

    // Adiciona o evento de submit ao formulário
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão

        const username = document.getElementById('username').value;
        const email = document.getElementById('TipoEmail').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5109/api/Usuarios/Cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: username, email: email, senhaHash: password })
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = 'login.html'; // Redireciona para a página de login
            } else {
                alert('Erro ao cadastrar. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro. Verifique sua conexão.');
        }
    });
});
