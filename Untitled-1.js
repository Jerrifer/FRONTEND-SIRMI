async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('id', id);
    data.append('name', name);
    data.append('email', email);

    const res = await axios.put(`http://localhost:3005/api/v1/users/${id}`, data);
    console.log(res);
    close();
}

=======

async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('id', id);
    data.append('name', name);
    data.append('email', email);

    const res = await axios.put(`http://localhost:3005/api/v1/users/${id}`, data);
    console.log(res);
    console.log(res.data);
    setAPIData(res.data);
    console.log(res.data);
    
    // initModal();
}

=======

async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('id', id);
    data.append('name', name);
    data.append('email', email);

    const res = await axios.put(`http://localhost:3005/api/v1/users/${data.id}`, data);
    console.log(res);
}

=======

async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('email', email);

    const res = await axios.put(`http://localhost:3005/api/v1/users/${id}`, data);
    console.log(res);
    // initModal();
}

=======

async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('email', email);

    const res = await axios.put(`http://localhost:3001/users/${id}`, data);
    // const res = await `http://localhost:3005/api/v1/users/${id}`;
    console.log(res);
    // initModal();
}

=======

async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    const res = await axios.put(`http://localhost:3005/api/v1/users/${id}`, data);
    console.log(res);
    close();
}

=======

async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    const res = await axios.put(`http://localhost:3005/api/v1/users/${id}`, data);
    console.log(res);
}

=======

async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    // console.log(data);
    await axios.put(`http://localhost:3001/users/${id}`, data)
        .then(res => {
            // console.log(res)
            // console.log(res.data)
            
            setAPIData(res.data);
            console.log(res.data);
        })
    close();
}

=======

async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:3001/users/${data.id}`, data)
    console.log(res)
    setAPIData(res.data);
    console.log(res.data);
}
