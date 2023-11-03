const menuSemanal = [ //DECLARO JSON 
    {
      dia: "Lunes",
      primerPlato: ["Sopa de lentejas", "Ensalada César", "Risotto de champiñones"],
      segundoPlato: ["Lomo de cerdo a la parrilla con salsa de mostaza", "Salmón a la plancha con puré de patatas", "Espaguetis a la bolognesa"],
      postre: ["Tarta de chocolate con helado de vainilla", "Fruta fresca de temporada", "Tiramisú"]
    },
    {
      dia: "Martes",
      primerPlato: ["Sopa de tomate", "Ensalada griega", "Paella de mariscos"],
      segundoPlato: ["Pollo al curry con arroz basmati", "Bacalao a la vizcaína", "Ratatouille"],
      postre: ["Flan de caramelo", "Manzana asada", "Helado de fresa"]
    },
    {
      dia: "Miércoles",
      primerPlato: ["Gazpacho", "Tabulé", "Crema de espárragos"],
      segundoPlato: ["Entrecot a la pimienta con patatas gratinadas", "Merluza en salsa verde", "Pasta primavera."],
      postre: ["Pastel de queso con frutos rojos", "Pera en almíbar", "Mousse de limón"]
    },
    {
      dia: "Jueves",
      primerPlato: ["Sopa de calabaza", "Ensalada de aguacate", "Arroz con setas"],
      segundoPlato: ["Costillas de cerdo a la barbacoa con maíz asado", "Trucha a la plancha con puré de calabacín", "Canelones de espinacas y ricotta"],
      postre: ["Tarta de manzana", "Kiwi fresco", "Helado de vainilla"]
    },
    {
      dia: "Viernes",
      primerPlato: ["Sopa de cebolla", "Ensalada de quinoa", "Tortilla española."],
      segundoPlato: ["Pechuga de pollo a la naranja con arroz salvaje", "Bacalao al pil-pil", "Lasaña de carne"],
      postre: ["Tiramisú", "Mango maduro", "Flan de vainilla"]
    }
  ]

//PONER EN PANTALLA AL CARGAR LA WEB EL MENU DEL DIA ACTUAL CON UN OBJETO DATE

  let fechaActual = new Date()
  
  let diaActual = fechaActual.getDay() - 1;
  if (diaActual < 0 || diaActual > 4) {
      diaActual = 4; // SI ES SABADO O DOMINGO PONE EL DIA ACTUAL EL VIERNES
  }
  let menuDelDia = menuSemanal[diaActual] //ME GUARDO EN VARIABLE LA POSICION DEL DIA EN EL QUE ESTOY
  let diaSemana = menuDelDia.dia //GUARDO VARIABLE
  let primerPlato = menuDelDia.primerPlato //GUARDO VARIABLE
  let segundoPlato = menuDelDia.segundoPlato //GUARDO VARIABLE
  let postre = menuDelDia.postre //GUARDO VARIABLE

  document.querySelector("#dia").innerHTML = diaSemana //INYECTO EN DIV
  document.querySelector("#comidaPrimero").innerHTML = primerPlato //INYECTO EN DIV
  document.querySelector("#comidaSegundo").innerHTML = segundoPlato //INYECTO EN DIV
  document.querySelector("#Postre").innerHTML = postre //INYECTO EN DIV


  //MENU DESPLEGABLE DIAS SEMANAS

  const diaSelect = document.querySelector("#diaSelect") //DETECTO EL DIV DEL DESPLEGABLE

  diaSelect.addEventListener("change", function() { //HAGO QUE SE LLAME A LA FUNCION CUANDO VEA QUE EL SELECTOR CAMBIA

    let diaSeleccionado = parseInt(diaSelect.value) //PASO A INTEGER EL STRING QUE ES EL NUMERO QUE SERA LA POSICION DEL JSON

    let menuSeleccionado = menuSemanal[diaSeleccionado] //ME GUARDO LA POSICION

    let diaSemana = menuSeleccionado.dia
    document.querySelector("#dia").innerHTML = diaSemana //INYECTO EN DIV
    document.querySelector("#comidaPrimero").innerHTML = menuSeleccionado.primerPlato //INYECTO EN DIV
    document.querySelector("#comidaSegundo").innerHTML = menuSeleccionado.segundoPlato //INYECTO EN DIV
    document.querySelector("#Postre").innerHTML= menuSeleccionado.postre  //INYECTO EN DIV

  })


  //MARCAR EN VERDE

  const botonBuscar = document.querySelector("#buscarBtn") //PILLO DIV BOTON

  botonBuscar.addEventListener("click", function(){

    const palabraBuscada = document.querySelector("#palabraInvestigar").value.trim() //pillo palabra input y quito espacios principio y fin
    const comidaPrimero = document.querySelector('#comidaPrimero') //pillo div
    const comidaSegundo = document.querySelector('#comidaSegundo') //pillo div
    const Postre = document.querySelector('#Postre') //pillo div

    resaltarElemento(comidaPrimero, palabraBuscada) //ENVIO DOS PARAMETROS FUNCION
    resaltarElemento(comidaSegundo, palabraBuscada) //ENVIO DOS PARAMETROS FUNCION
    resaltarElemento(Postre, palabraBuscada) //ENVIO DOS PARAMETROS FUNCION

  }) 

  function resaltarElemento(elemento, palabraBuscada) { //FUNCION QUE RECIBE DOS PARAMETRROS
    const contenido = elemento.innerText.trim() //LE QUITO LOS ESPACIOS A LOS DIV QUE TIENEN LOS NOMBRES DE LOS PLATOIS
    if (contenido.includes(palabraBuscada) && palabraBuscada !== "") { //COMPRUEBO SI INCLUYE EL DIV LA PALABRA Y SI ESTA NO ESTA VACÍA
      const contenidoResaltado = contenido.replaceAll(palabraBuscada, `<span style="background-color: #79ff00; color:black;">$&</span>`)
      elemento.innerHTML = contenidoResaltado //inyecto en en div de los platos la palabra cambiada 
    } else {
      elemento.innerHTML = contenido //mostrar el contenido original
    }
  }


//HORAS

  const calcularBtn = document.querySelector("#calcularBtn") //pillo div boton
  const tiempoRestanteLabel = document.querySelector("#tiempoRestanteLabel") //pilo div label

  calcularBtn.addEventListener("click", function(){

  const horaApertura = document.querySelector("#horaApertura").value //pillo valor del input hora
  const horaCierre = document.querySelector("#horaCierre").value //pillo valor del input hora

  let minutosRestantes
  let horasRestantes
  let horaActual
  let cierreHora
  let cierreMinuto
  let horaAperturaDate
  let horaCierreDate 

  if (horaApertura && horaCierre) {
    const ahora = new Date() //creo variable date

    horaActual = ahora.getHours() //me guardo en un variable solo las horas
    const minutoActual = ahora.getMinutes() //me guardo en un variable solo los minutos

    //CONVIERTO VALORES A INTEGER
    const aperturaHora = parseInt(horaApertura.split(":")[0], 10);

    //CONVIERTO VALORES A INTEGER
    const aperturaMinuto = parseInt(horaApertura.split(":")[1], 10);

    //CONVIERTO VALORES A INTEGER   
    cierreHora = parseInt(horaCierre.split(":")[0], 10);

    //CONVIERTO VALORES A INTEGER
    cierreMinuto = parseInt(horaCierre.split(":")[1], 10);

    //CREO OTRA HORA
    horaAperturaDate = new Date(ahora)
    horaCierreDate = new Date(ahora)

    //ESTABLEZCO AL OBJETO HOY LAS HORAS Y MINUTOS
    horaAperturaDate.setHours(aperturaHora, aperturaMinuto, 0, 0)
    horaCierreDate.setHours(cierreHora, cierreMinuto, 0, 0)

    //CALCULO LA DIFERENCIA EN MS  
    let tiempoRestante
    if (horaActual > cierreHora || (horaActual === cierreHora && minutoActual >= cierreMinuto)) {
      //SI HA CERRADO SABER CUANDO ABRE
      horaAperturaDate.setDate(horaAperturaDate.getDate() + 1)
      tiempoRestante = horaAperturaDate - ahora
    } else {
      //SI SIGUE ABIERTO CALCULAR CUANDO CIERRA
      tiempoRestante = horaCierreDate - ahora
    }

    //PASO LA DIFERENCIA A HORAS/MINUTOS
    horasRestantes = Math.floor(tiempoRestante / (1000 * 60 * 60))
    minutosRestantes = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60))
  } 

  if (horaActual > cierreHora || (horaActual === cierreHora && minutoActual >= cierreMinuto)) {
    tiempoRestanteLabel.innerHTML = "El lugar está cerrado. Abre nuevamente a las " + horaApertura + ".";
  } else {
    tiempoRestanteLabel.innerHTML = `Faltan ${horasRestantes} horas y ${minutosRestantes} minutos para cerrar.`;
  }
  
})

