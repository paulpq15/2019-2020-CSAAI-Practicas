console.log("Ejecutando JS...");

//----- Obtener elemento del video en emision y configurarlo
const videoenemision = document.getElementById("videoenemision")
videoenemision.width=400;  //-- Tamaño de la pantalla de video en emision
videoenemision.height=200;

//----- Obtener elemento de la fuente 1 y configurarla
const fuente1 = document.getElementById("fuente1")
fuente1.width=200;  //-- Tamaño de la pantalla de fuente 1
fuente1.height=100;
fuente1.src="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/rauw1.mp4"

//----- Obtener elemento de la fuente 2 y configurarla
const fuente2 = document.getElementById("fuente2")
fuente2.width=200;  //-- Tamaño de la pantalla de fuente 2
fuente2.height=100;
fuente2.src="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/rauw2.mp4"

//----- Obtener elemento de la fuente 3 y configurarla
const fuente3 = document.getElementById("fuente3")
fuente3.width=200;  //-- Tamaño de la pantalla de fuente 3
fuente3.height=100;
fuente3.src="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/rauw3.mp4"

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
videoenemision.poster="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/poster.png";

//-- Obtener los botones
const sel1 = document.getElementById("sel1")
const sel2 = document.getElementById("sel2")
const sel3 = document.getElementById("sel3")

//-- Función de retrollamada del botón de ver
sel1.onclick = () => {
  console.log("Reproduciendo fuente 1");
  videoenemision.src = fuente1.src;
  videoenemision.currentTime = fuente1.currentTime + 0.34;
  videoenemision.play();
};

sel2.onclick = () => {
  console.log("Reproduciendo fuente 2");
  videoenemision.src = fuente2.src;
  videoenemision.currentTime = fuente2.currentTime + 0.34;
  videoenemision.play();
};

sel3.onclick = () => {
  console.log("Reproduciendo fuente 3");
  videoenemision.src = fuente3.src;
  videoenemision.currentTime = fuente3.currentTime + 0.34;
  videoenemision.play();
};

//-- Funcion de retrollamada del boton de parar
//--stop.onclick = () => {
  //video1.pause();
  //video2.pause();
  //video3.pause();

  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  //fuente1.src=null;
  //fuente2.src=null;
  //fuente3.src=null;

//}
