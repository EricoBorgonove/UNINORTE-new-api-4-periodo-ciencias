async function saveUser(){
    
    const nome = document.getElementById('inputName')
    const email = document.getElementById('inputEmail')
    const password = document.getElementById('inputPassword')

    const userData = {
        'nome': nome.value, 
        'email': email.value, 
        'password': password.value
    }

    try {
        const method = 'POST'
        const url = 'http://localhost:3000/usuarios'

        const response = await fetch (url, {
            method,
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        }) 
        if (response.ok){
            alert("Salvo com Sucesso")
            console.log (userData)
        }else{
            alert("Erro ao salvar usuário")
        }
    } catch(error) {
        alert("erro na requisição: "+ error.message)
    }
}