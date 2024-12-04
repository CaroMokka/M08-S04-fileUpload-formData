$(() => {
  $(document).on("submit", "#formulario-registro", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("rut", txtRut.value)
    // formData.append("nombre", txtNombre.value)
    // formData.append("apellido", txtApellido.value)
    formData.append("foto", fileFoto.files[0]);

    fetch("/registro", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        alert(response.message);
        listarImagenes() 
        $("#formulario-registro")[0].reset()
      });
  });

  $(document).on("click", ".icon-delete", function(){
      const nombre = $(this).data("img")
      if(confirm("Seguro que desea eliminar esta imagen?")){
        fetch(`/imagenes/${nombre}`, {
            method: "DELETE"
          })
            .then((data) => {
              return data.json();
            })
            .then((response) => {
              listarImagenes()
            }).catch(err => alert("Error interno de servidor."))
      }
     
  })

  const obtenerImagenes = async () => {
    try {
      const data = await fetch("/images");
      const response = await data.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const listarImagenes = async () => {
    const images = await obtenerImagenes();
    $("#content-images").html("");
    images.data.forEach((element) => {
      $("#content-images").append(`
        <div class="card p-2 m-3" style="width: 14rem;">
            <img src="/public/images/${element}" class="card-img-top" alt="..." > 
            <img src="/public/icons/trash.png" class="icon-delete" data-img="${element}" >  
        </div>

        `);
    });
  };
  listarImagenes();
});
