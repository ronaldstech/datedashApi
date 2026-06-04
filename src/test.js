async function signIn() {
    const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: 'Befus',
            last_name: 'Makwinja',
            email: 'befmakwinja@gmail.com',
            password: '123456'
        })
    });

    const data = await response.json();
    console.log(data);

}

signIn();