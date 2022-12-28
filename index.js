let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')

btnSiguiente.addEventListener('click', () => {
    if(pagina < 42){
        pagina +=1
        cargarPersonajes()
    }
})

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina -=1
        cargarPersonajes()
    }
})

const cargarPersonajes = async() => {
    try{
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`);
        // console.log(respuesta);

        if(respuesta.status === 200){
            const datos = await respuesta.json();
            let personajes = '';
            datos.results.forEach(personaje => {
                personajes += `
                    <div class="col">
                        <div class="card">
                            <img src="${personaje.image}" width="100" height="100" class="card-img-top img-fluid" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Poster de ${personaje.name}</h5>
                                <p class="card-text">
                                $ 2.300
                                </p>
                            </div>
                            
                                <button type="button" class="btn btn-primary redireccionar" id=${personaje.id}>Ver más</button>
                            
                        </div>
                    </div>   
                    `
            });
            // console.log(datos.results[0].id)
           

            document.getElementById('cards').innerHTML = personajes;
            document.getElementById('pagActual').innerHTML = "Página: "+ pagina;
        
        const redireccion = JSON.parse( localStorage.getItem('redireccion') ) || []

        const redireccionar = () => {
            let botones = document.querySelectorAll('.btn-primary')
            // console.log(botones);
            for (const btn of botones) {
                btn.addEventListener('click', (evento) => {
                    // console.log("Redirigir a la pagina del id: ", evento.target.id); 
                    let resultado = [parseInt(evento.target.id)]
                    //console.log("Resultado", resultado)
                    resultado.push(pagina)
                    //console.log("Página:", pagina)
                    localStorage.setItem('redireccion',JSON.stringify(resultado))
                    window.location.href='producto.html'
                })
            }
        }
        redireccionar()            
        } 
    } catch(error){
        console.log(error)
    }
    
}


cargarPersonajes()

