import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  // console.log(error.message);
  return (
    <div className="space-y-8">
      <h1 className="text-center text-6xl font-extrabold mt-20 text-blue-900">
        CRM - CLIENTES
      </h1>
      <p className="text-center uppercase">Hubo un Error</p>
      <p className="text-center text-2xl uppercase">
        {error.statusText || error.message}
      </p>
    </div>
  );
}
