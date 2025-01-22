import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./Pages/Home";
import ProductosGrid from "./components/ProductosGrid";
import CategoriasGrid from "./components/CategoriasGrid";

const AppRoutes = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="productos" element={<ProductosGrid/>}/>
                    <Route path="categorias" element={<CategoriasGrid/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;