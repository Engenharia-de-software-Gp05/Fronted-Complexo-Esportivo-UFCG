let registerStudentData = {
    email: email,
    name: nomeCompleto,
    phoneNumber: telefone,
    studentId: matricula,
    password: senha
  };
  try {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir solicitações de todos os origens
      },
      body: JSON.stringify(registerStudentData)
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar');
    }

    const responseData = await response.json();
    setData(responseData);
    setError(null);
  } catch (error) {
    setError(error.message);
  }