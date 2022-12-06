import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import './App.css';
import { router } from "./Routers/Routers/Routers";
function App() {
  return (
    <div className='mx-6'>
     <RouterProvider router ={router}>
     </RouterProvider>
     <Toaster></Toaster>
    </div>
  );
}

export default App;
