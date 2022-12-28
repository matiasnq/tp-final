const redireccionLocal = JSON.parse( localStorage.getItem('redireccion') )
let pagina = redireccionLocal[1]
let redire = redireccionLocal[0]

//console.log("Redirección local:", redireccionLocal)
const cargarPersonaje = async() => {
    try{
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`);
        //console.log(respuesta);

        if(respuesta.status === 200){
            const datos = await respuesta.json();
            for(let i = 0; i < datos.results.length; i++){
                let productoFinal = datos.results[i]
                if (productoFinal.id == redire){
                    //console.log("El nombre del personaje id: ", redire, " es: ", productoFinal.name, " ID ", productoFinal.id)
                    let productoPersonaje = '';
                    productoPersonaje += `
                        <div class="col">
                            <h1 class="text-center">${productoFinal.name}</h1>
                            <div class="card">                    
                                <img src="${productoFinal.image}" width="100" height="100" class="card-img-top img-fluid" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Poster de ${productoFinal.name}</h5>
                                    <p class="card-text fs-5">
                                        $ 2.300 </br>
                                        Poster de 1m x 1m </br>
                                        Listo para colgar!
                                    </p>
                                </div>
                                    <button type="button" class="btn btn-primary redireccionar disabled" id=${productoFinal.id}>Comprar</button>
                                </div>
                        </div>   
                    `
                    document.getElementById('cards').innerHTML = productoPersonaje;
                }         
            }
        } 
    } catch(error){
        console.log(error)
    }    
}

cargarPersonaje()

