async function getProfile() {
    const response = await fetch(
        'http://localhost:5000/users/profile',
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzgwNjAyMzA4LCJleHAiOjE3ODEyMDcxMDh9.mdorp2QRU5H160e9KT1lRyBdJflIe0eHJiTerbbPc0g'
            }
        }
    );

    const data = await response.json();

    console.log(data);
}

getProfile();