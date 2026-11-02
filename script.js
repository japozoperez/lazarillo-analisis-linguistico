
// Análisis lingüístico del Lazarillo de Tormes

// Función para contar las coincidencias de una expresión regular
function contarCoincidencias(texto, expresion) {
    const resultados = texto.match(expresion);
    return resultados ? resultados.length : 0;
}

// Función principal: carga y analiza el texto
async function analizarTexto() {
    const estado = document.getElementById("estado");

    try {
        // Cargar el archivo de texto completo
        const respuesta = await fetch("/02_Texto_Limpio/lazarillo_limpio.txt");

        if (!respuesta.ok) {
            throw new Error("No se ha podido cargar el archivo de texto.");
        }

        const texto = await respuesta.text();

        // Convertir el texto a minúsculas para no distinguir mayúsculas
        const textoMinusculas = texto.toLowerCase();

        // Contar palabras
        const palabras = contarCoincidencias(
            textoMinusculas,
            /[a-zñáéíóúü]+/g
        );

        // Contar vocales
        const vocales = contarCoincidencias(
            textoMinusculas,
            /[aeiouáéíóúü]/g
        );

        // Contar consonantes
        const consonantes = contarCoincidencias(
            textoMinusculas,
            /[bcdfghjklmnñpqrstvwxyz]/g
        );

        // Contar palabras completas y expresiones literales
        const lazaro = contarCoincidencias(
            textoMinusculas,
            /(^|[^a-zñáéíóúü])lázaro($|[^a-zñáéíóúü])/g
        );

        const ciego = contarCoincidencias(
            textoMinusculas,
            /(^|[^a-zñáéíóúü])ciego($|[^a-zñáéíóúü])/g
        );

        const clerigo = contarCoincidencias(
            textoMinusculas,
            /(^|[^a-zñáéíóúü])clérigo($|[^a-zñáéíóúü])/g
        );

        const arcipreste = contarCoincidencias(
            textoMinusculas,
            /(^|[^a-zñáéíóúü])arcipreste($|[^a-zñáéíóúü])/g
        );

        const miMujer = contarCoincidencias(
            textoMinusculas,
            /(^|[^a-zñáéíóúü])mi\s+mujer($|[^a-zñáéíóúü])/g
        );

        // Mostrar los resultados en la tabla HTML
        document.getElementById("palabras").textContent = palabras;
        document.getElementById("vocales").textContent = vocales;
        document.getElementById("consonantes").textContent = consonantes;
        document.getElementById("lazaro").textContent = lazaro;
        document.getElementById("ciego").textContent = ciego;
        document.getElementById("clerigo").textContent = clerigo;
        document.getElementById("arcipreste").textContent = arcipreste;
        document.getElementById("mi-mujer").textContent = miMujer;

        estado.textContent = "Análisis completado correctamente.";

    } catch (error) {
        estado.textContent = "Error al analizar el texto: " + error.message;
        console.error(error);
    }
}

// Ejecutar el análisis cuando se carga la página
analizarTexto();
