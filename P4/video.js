console.log("Ejecutando JS...");

//----- Obtener elemento del video en emision y configurarlo
const videoenemision = document.getElementById("videoenemision")
videoenemision.width=500;  //-- Tamaño de la pantalla de video en emision
videoenemision.height=250;

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

//----- Obtener elemento de la fuente 4 y configurarla, la cual esta en pruebas aun
const fuente4 = document.getElementById("fuente4")
fuente4.width=200;  //-- Tamaño de la pantalla de fuente 4
fuente4.height=100;
fuente4.src="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/test.png"

//-- Imagen estática a mostrar en el monitor y en las fuentes cuando no
//-- se le ha dado al play
videoenemision.poster="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/poster.png";
fuente1.poster="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/poster.png";
fuente2.poster="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/poster.png";
fuente3.poster="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/poster.png";

//-- Obtener los botones
const on = document.getElementById("on")
const stop = document.getElementById("stop")
const sel1 = document.getElementById("sel1")
const sel2 = document.getElementById("sel2")
const sel3 = document.getElementById("sel3")
const sel4 = document.getElementById("sel4")

//-- Funcion para que se visualicen las distintas fuentes salvo la que esta en pruebas
on.onclick = () => {
  console.log("Encendiendo las fuentes");
  fuente1.play()
  fuente2.play()
  fuente3.play()
};

//-- Función de retrollamada del botón de select y marcado de la fuente seleccionada
sel1.onclick = () => {
  console.log("Reproduciendo fuente 1");
  videoenemision.src = fuente1.src;
  videoenemision.currentTime = fuente1.currentTime + 0.5; // Sincronizamos los videos
  videoenemision.play();
  fuente1.style.border = '3px solid red';
  fuente2.style.border = '0px';
  fuente3.style.border = '0px';
  fuente4.style.border = '0px';
};

sel2.onclick = () => {
  console.log("Reproduciendo fuente 2");
  videoenemision.src = fuente2.src;
  videoenemision.currentTime = fuente2.currentTime + 0.4;
  videoenemision.play();
  fuente1.style.border = '0px';
  fuente2.style.border = '3px solid red';
  fuente3.style.border = '0px';
  fuente4.style.border = '0px';
};

sel3.onclick = () => {
  console.log("Reproduciendo fuente 3");
  videoenemision.src = fuente3.src;
  videoenemision.currentTime = fuente3.currentTime;
  videoenemision.play();
  fuente1.style.border = '0px';
  fuente2.style.border = '0px';
  fuente3.style.border = '3px solid red';
  fuente4.style.border = '0px';
};

sel4.onclick = () => {
  console.log("Reproduciendo fuente 4");
  videoenemision.src = null;
  videoenemision.poster = fuente4.src;
  videoenemision.play();
  fuente1.style.border = '0px';
  fuente2.style.border = '0px';
  fuente3.style.border = '0px';
  fuente4.style.border = '3px solid red';
};

//-- Funcion para que se quite la señal del monitor y de las fuentes
stop.onclick = () => {
  console.log("Se quita la fuente de emision en el monitor");
  videoenemision.pause();
  videoenemision.src=null;
  videoenemision.poster="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/poster.png";
  fuente1.pause();
  fuente1.src=null;
  fuente1.poster="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/poster.png";
  fuente2.pause();
  fuente2.src=null;
  fuente2.poster="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/poster.png";
  fuente3.pause();
  fuente3.src=null;
  fuente3.poster="https://github.com/paulpq15/2019-2020-CSAAI-Videos/raw/master/poster.png";
}
