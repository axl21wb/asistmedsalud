document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formConsulta");
    const dni = document.getElementById("dni");
    const resultado = document.getElementById("resultado");

    formulario.addEventListener("submit", function (e) {

        e.preventDefault();

        const numeroDNI = dni.value.replace(/\D/g, "");

        resultado.innerHTML = "";

        if (numeroDNI === "") {

            resultado.innerHTML = `
                <div class="resultado error">
                    Ingrese un DNI válido.
                </div>
            `;

            return;
        }

        resultado.innerHTML = `
            <div class="resultado cargando">
                Consultando...
            </div>
        `;

        fetch("api/consulta_afiliado.php", {
            
        
            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },

            body: "dni=" + encodeURIComponent(numeroDNI)

        })

        .then(response => response.json())

        .then(data => {

            if (data.encontrado) {

                resultado.innerHTML = `
                    <div class="resultado encontrado">

                        <h3>${data.nombre}</h3>

                        <p>
                            <strong>Obra Social:</strong><br>
                            ${data.obra_social}
                        </p>

                        <p class="cobertura">
                            Cobertura: Afiliado activo
                        </p>

                    </div>
                `;

            } else {

                resultado.innerHTML = `
                    <div class="resultado error">

                        <h3>Sin cobertura activa</h3>

                        <p>
                            No se encontró un afiliado activo
                            con el DNI ingresado.
                        </p>

                    </div>
                `;

            }

        })

        .catch(error => {

            console.error(error);

            resultado.innerHTML = `
                <div class="resultado error">
                    No fue posible realizar la consulta.
                    Intente nuevamente.
                </div>
            `;

        });

    });

});
