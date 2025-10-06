import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Navigate,
} from "react-router-dom";

// pages & components
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyPage from "./pages/PropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthContext } from "./contexts/AuthContext";

const App = () => {
    const { isAuthenticated } = useAuthContext();
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={isAuthenticated ? <MainLayout /> : <LoginPage />}>
                    <Route index element={<Home />} />
                    <Route path="/properties/add-property" element={<AddPropertyPage />} />
                    <Route path="/edit-property/:id" element={<EditPropertyPage />} />
                    <Route path="/properties/:id" element={<PropertyPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
            </>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
