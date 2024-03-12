const urlBase = "https://calcount.develotion.com";

export const obtenerPaises = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/paises.php`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener países');
            }
            return response.json();
        })
        .then(data => {
            return data.paises; // Retorna los datos obtenidos
        })
        .catch(error => {
            throw error; // Re-lanza el error para que pueda ser manejado en otro lugar si es necesario
        });
}


export const registroObligatorio = (usuario, password, idPais, calorias) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "usuario": usuario,
        "password": password,
        "idPais": idPais,
        "caloriasDiarias": calorias
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/usuarios.php`, requestOptions)
        .then(response => response.json()) // Parsear la respuesta a JSON
        .then(result => {
            console.log(result);
            if (result.codigo !== 200) {
                return { error: true, result }; // Devolver el mensaje de error
            }
            return { error: false, result };
        })
        .catch(error => console.log('error', error));
};

export const loginObligatorio = (usuario, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "usuario": usuario,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/login.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.codigo !== 200) {
                return { error: true, result };
            }
            return { error: false, result };
        })
        .catch(error => {
            console.log('error', error);
            throw new Error("Hubo un error");
        });
};

export const obtenerUsuariosPorPais = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem("token"));
    myHeaders.append("iduser", localStorage.getItem('id'));    

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/usuariosPorPais.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.codigo !== 200) {
                return { error: true, result };
            }
            return { error: false, result };
        })
        .catch(error => {
            console.log('error', error);
            throw new Error("Hubo un error");
        });
};

export const obtenerAlimentosUsuario = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem("token"));
    myHeaders.append("iduser", localStorage.getItem('id'));    

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/registros.php?idUsuario=${localStorage.getItem('id')}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.codigo !== 200) {
                return { error: true, result };
            }
            return { error: false, result };
        })
        .catch(error => {
            console.log('error', error);
            throw new Error("Hubo un error");
        });
};

export const obtenerAlimentos = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem("token"));
    myHeaders.append("iduser", localStorage.getItem('id'));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/alimentos.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.codigo !== 200) {
                return { error: true, result };
            }
            return { error: false, result };
        })
        .catch(error => {
            console.log('error', error);
            throw new Error("Hubo un error");
        });
};

export const registrarAlimento = (idAlimento, cantidad, fecha) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem("token"));
    myHeaders.append("iduser", localStorage.getItem('id'));

    var raw = JSON.stringify({
        "idAlimento": idAlimento,
        "idUsuario": localStorage.getItem('id'),
        "cantidad": cantidad,
        "fecha": fecha //"2023-09-21"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/registros.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.codigo !== 200) {
                return { error: true, result };
            }
            return { error: false, result };
        })
        .catch(error => {
            console.log('error', error);
            throw new Error("Hubo un error");
        });
};


export const registrosUsuarioAPI = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem("token"));
    myHeaders.append("iduser", localStorage.getItem('id'));    

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/registros.php?idUsuario=${localStorage.getItem('id')}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.codigo !== 200) {
                return { error: true, result };
            }
            return { error: false, result };
        })
        .catch(error => {
            console.log('error', error);
            throw new Error("Hubo un error");
        });
};


export const borrarAlimentoAPI = (idBorrar) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem("token"));
    myHeaders.append("iduser", localStorage.getItem('id'));

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/registros.php?idRegistro=${idBorrar}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.codigo !== 200) {
                return { error: true, result };
            }
            return { error: false, result };
        })
        .catch(error => {
            console.log('error', error);
            throw new Error("Hubo un error");
        });
}