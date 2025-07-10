document.addEventListener("DOMContentLoaded", () => {
  let numeros = [];

  const mostrarMensaje = (texto, tipo = "warning") => {
    const div = document.getElementById("mensaje");
    div.textContent = texto;
    div.className = `mt-2 text-${tipo}`;
  };

  window.agregarNumero = function () {
    const input = document.getElementById("numero");
    const valor = input.value.trim();

    if (!valor || isNaN(valor)) {
      mostrarMensaje("Ingresá un número válido", "danger");
      return;
    }

    if (numeros.length >= 20) {
      mostrarMensaje("Máximo 20 números alcanzado", "danger");
      return;
    }

    numeros.push(Number(valor));
    actualizarLista();
    input.value = "";

    document.getElementById("guardarBtn").disabled = numeros.length < 10;

    mostrarMensaje("Número agregado correctamente", "success");
  };

  function actualizarLista() {
    const lista = document.getElementById("listaNumeros");
    lista.innerHTML = "";

    numeros.forEach(n => {
      const li = document.createElement("li");
      li.className = "list-group-item bg-secondary text-white";
      li.textContent = n;
      lista.appendChild(li);
    });

    document.getElementById("contador").textContent = numeros.length;
  }

  window.guardarArchivo = function () {
    const contenido = numeros.join("\n");
    const blob = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "numeros.txt";
    a.click();

    URL.revokeObjectURL(url);

    mostrarMensaje("Archivo guardado correctamente", "info");
  };
});
