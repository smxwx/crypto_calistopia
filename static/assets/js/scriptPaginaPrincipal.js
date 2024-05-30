//ANIMACION BOTON MENU
document.querySelector(".menu__hamburguesa").addEventListener("click", animacionBarrasMenu);

var line1__barra = document.querySelector(".line1__menu-hamburguesa");
var line2__barra = document.querySelector(".line2__menu-hamburguesa");
var line3__barra = document.querySelector(".line3__menu-hamburguesa");
var aside = document.querySelector(".menuLateral");

function animacionBarrasMenu(){
    line1__barra.classList.toggle("activeline1__menu-hamburguesa");
    line2__barra.classList.toggle("activeline2__menu-hamburguesa");
    line3__barra.classList.toggle("activeline3__menu-hamburguesa");
}

//ABRIR - CERRAR MENU
const $openClose = document.getElementById("open-close"),
    $aside = document.getElementById("aside");

$openClose.addEventListener("click",()=>{
    $aside.classList.toggle("desplegar");
})

//ARRAY RUTINA 

const exercise = document.querySelectorAll('.ejercicio');
const routine = document.querySelector('.ejercicio_rutina');
const sendButton = document.querySelector('.ejercicio_rutina_button_crear');
let titles = [];

const generateElement = (imagen, nombre, grupo) => {

    let newElement = 
    `<div class="ejercicio_rutina_elemento">
        <div class="ejercicio ejercicio_layout">
            <a class="ejercicio_rutina_elemento_cerrar" href="">
                <img class="ejercicio__imagen_cerrar ${nombre} delete" src="https://cdn-icons-png.flaticon.com/128/6276/6276642.png" alt="imagen ejercicio">
            </a>
            <img class="ejercicio__imagen" src="${imagen}" alt="imagen ejercicio">
            <div class="ejercicio__informacion">
                <p class="ejercicio__nombre nombre_ejercicio_rutina">${nombre}</p>
                <p class="ejercicio__musculo">${grupo}</p>
            </div>
        </div>

        <div class="param_ejercicio">
            <div class="campo">
                <label class="campo_nombre_series">Series</label>
                <input class="campo_ejercicio" type="number" min="0" max="100" pattern="\d{1,3}" inputmode="numeric">
            </div>

            <div class="campo">
                <label>Repeticiones</label>
                <input class="campo_ejercicio" type="number" min="0" max="100" pattern="\d{1,3}" inputmode="numeric">
            </div>

            <div class="campo">
                <label class="campo_nombre_descanso">Descanso(Min)</label>
                <input class="campo_ejercicio" type="number" min="0" max="100" pattern="\d{1,3}" inputmode="numeric">
            </div>
        </div>
    </div>`;

    if (titles.includes(nombre)) {
        alert("Este ejercicio ya se encuentra en la rutina");
    } else {
        routine.innerHTML += newElement;
        titles.push(nombre);
    }

};

routine.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.parentElement.remove();
        const i = titles.indexOf(e.target.parentElement.parentElement.children[2].children[0].textContent);
        titles.splice(i, 1);
    }
});

exercise.forEach((element) => {

    const button = element.childNodes[3];
    const imagen = element.childNodes[1].childNodes[1].src;
    const nombre = element.childNodes[1].childNodes[3].childNodes[1].childNodes[0].data;
    const grupo = element.childNodes[1].childNodes[3].childNodes[3].childNodes[0].data;

    button.addEventListener('click', e => {
        generateElement(imagen, nombre, grupo);
    });
});

sendButton.addEventListener('click', e => {

    const title = document.querySelector('.ejercicio_rutina_input_titulo');
    
    if(!title.value){
        return alert("Debes asignar un nombre a la rutina");
    }
    
    if(!titles[0]){
        return alert("Debes agregar ejercicios");
    }

    const characteristics = document.querySelectorAll('.campo_ejercicio');
    let description = [];

    characteristics.forEach( item => {
        if(item.value){
            description.push(item.value);
        }else{
            alert("Debes completar la información de todos los ejercicios");
            characteristics = [];
            return;
        }
    });

    if (!characteristics[0]){
        return;
    }

    const csrftoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    const requestObj = new XMLHttpRequest();
    requestObj.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            location.href = '/user/';
            alert('Rutina registrada con exito!');
        }
    }

    requestObj.open("POST", '/routine/create/');
    requestObj.setRequestHeader('X-CSRFToken', csrftoken);
    const formData = new FormData();
    formData.append('title',title.value);
    formData.append('routine',titles);
    formData.append('description',description);
    requestObj.send(formData);

})

