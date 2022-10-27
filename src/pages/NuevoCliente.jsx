import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Error from "../components/Error";
import Formulario from "../components/Formulario";
import { agregarCliente} from '../data/clientes'


export async function action({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get('email')

  // Validación
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los Campos son Obligatorios");
  }

  //  Validación Email
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)) {
    errores.push('El Email no es válido')
  }

  // retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores;
  }

  // Agregar Clientes
  await agregarCliente(datos)

  return redirect('/')

  
}

const NuevoCliente = () => {
  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para Registrar un Nuevo Cliente
      </p>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {
            errores?.length && errores.map( (error,i) => <Error key={i}>{error}</Error> )
        }
        <Form 
            method="POST"
            noValidate
        >
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;
