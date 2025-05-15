function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var usuario = sessionStorage.USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null && usuario != null) {
        b_usuario.innerHTML = usuario;
    } else {
        window.location = "../login.html";
    }
}

function entrar() {
    var emailOuUsuario = input_email.value;
    var senhaVar = input_senha.value;

    console.log("FORM LOGIN: ", emailOuUsuario);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        loginServer: emailOuUsuario,
        senhaServer: senhaVar
    })
}).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                console.log("DADOS RECEBIDOS DO BACK-END:", json);
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.USUARIO = json.usuario;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                });
        
                    window.location = "/dashboard/home.html";

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });

            
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function mostrarSenha() {
    const input = document.getElementById("input_senha");
    const icon = document.getElementById("verSenha");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("mostrar");
        icon.classList.add("ocultar");
    } else {
        input.type = "password";
        icon.classList.remove("ocultar");
        icon.classList.add("mostrar");
    }
}
