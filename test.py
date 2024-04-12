import requests

# Dados a serem enviados no corpo da requisição
data = {
    "email": "example@example.com",
    "name": "Example User",
    "phoneNumber": "123456789",
    "studentId": "123456",
    "password": "examplepassword"
}

# Enviar requisição POST com os dados
response = requests.post("http://localhost:8080/auth/register", json=data)

# Verificar o código de status da resposta
print(response.status_code)

# Se desejar, você pode imprimir a resposta completa para ver os detalhes
print(response.json())
