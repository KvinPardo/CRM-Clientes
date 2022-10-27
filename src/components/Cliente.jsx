import { Form, useNavigate, redirect } from "react-router-dom";
import { eliminarCliente} from '../data/clientes'

export async function action({params}) {
  await eliminarCliente(params.clienteId)
  return redirect('/')
}


const Cliente = ({ cliente }) => {
  const navigate = useNavigate();

  const { nombre, empresa, email, telefono, id } = cliente;

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>

      <td className="p-6">
        <p className="tex-gray-600">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p className="tex-gray-600">
          <span className="text-gray-800 uppercase font-bold">Teléfono: </span>
          {telefono}
        </p>
      </td>

      <td className="flex gap-3 justify-center p-6">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 text-xs uppercase font-bold bg-blue-300 p-2 rounded-lg"
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >
          Editar
        </button>
        <Form
          method="POST"
          action={`/clientes/${id}/eliminar`}
          onSubmit={() => {
            if(!confirm('¿Deseas Eliminar a este Cliente?')) {
              e.preventDefault()
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 text-xs uppercase font-bold bg-red-300 p-2 rounded-lg"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Cliente;
