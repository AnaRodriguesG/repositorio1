// Quando o documento for carregado
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o formulário de login
    const loginForm = document.getElementById("loginForm");
    
    if (loginForm) {
        // Adiciona um evento ao enviar o formulário
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Obtém os valores de usuário e senha
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Exibe os dados no console (opcional)
            console.log("Usuário:", username);
            console.log("Senha:", password);

            // Chama a função de login
            EntrarCadastro(username, password);
        });
    }

    // Verifica se o usuário já está logado e mostra uma mensagem
    if (localStorage.getItem('usuarioLogado') === 'true') {
        alert(`Bem-vindo de volta, ${localStorage.getItem('nomeUsuario')}!`);
        // Aqui você pode adicionar mais lógica, como alterar o layout ou exibir opções específicas para usuários logados.
    }
});

// Função para enviar o login à API
async function EntrarCadastro(username, password) {
    try {
        const response = await fetch('http://localhost:5109/api/Autenticacao/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,  // Altere conforme necessário para o nome do campo correto
                senhaHash: password  // Altere conforme necessário para o nome do campo correto
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login bem-sucedido:", data);

            // Armazena informações de login no localStorage
            localStorage.setItem('usuarioLogado', 'true');
            localStorage.setItem('nomeUsuario', username);

            // Exibe um alerta de boas-vindas
            alert(`Bem-vindo, ${username}! Você está logado.`);

            // Redireciona para a página dos quizzes
            window.location.href = "quizes.html"; 
        } else {
            console.error('Credenciais inválidas');
            alert('Credenciais inválidas. Verifique seu e-mail e senha.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao tentar realizar login. Por favor, tente novamente mais tarde.');
    }
}

// Script para alternar a visibilidade da senha
document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');

    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            togglePassword.textContent = type === 'password' ? 'Mostrar Senha' : 'Ocultar Senha';
        });
    }
});
