
const Inicio = () => {
    const imagenURL ="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg";
  return (
    <>
      <main>
        <div className="w-100 mb-4">
          <img 
            // 3. Usamos la variable de la URL directamente en el src
            src={imagenURL} 
            alt="Personal de oficina en una reunión" 
            className="img-fluid object-fit-cover" 
          />
        </div>
        <section className="container">
          <h1 className="my-2">
            Bienvenidos al Sistema de Gestion de Personal - SGP
          </h1>
          <p>
            Este sistema permite gestionar la informacion del personal de manera
            eficiente y segura.
          </p>
          <p>
            Utilice el menu de navegacion para acceder a las diferentes
            secciones del sistema.
          </p>
        </section>
        <section></section>
      </main>
    </>
  );
};

export default Inicio;
