// ======================================
// ASISTMED WEB V2
// Control del menú responsive
// ======================================


document.addEventListener("DOMContentLoaded", function(){

    const botonMenu = document.getElementById("btnMenu");
    const menu = document.getElementById("menu");


    if(botonMenu && menu){


        botonMenu.addEventListener("click", function(){


            menu.classList.toggle("mostrar");


        });



        // Cerrar menú al seleccionar una opción

        const enlaces = menu.querySelectorAll("a");


        enlaces.forEach(function(enlace){


            enlace.addEventListener("click", function(){


                menu.classList.remove("mostrar");


            });


        });


    }


});