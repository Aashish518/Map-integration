import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/Admindashboard";
import PropertyList from "./pages/PropertyList";
import Form from "./components/Form";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PropertyList/>
  },
  {
    path: "/admin",
    element: <AdminDashboard />
  },
  {
    path: "/form/:id",
    element: <Form/>
  },
  {
    path: "/form",
    element: <Form />
  },
  {
    path: "/login",
    element: <Login/>
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
