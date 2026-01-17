import { createContext, useContext, useState, useEffect } from "react";
import { loadCatalog, saveCatalog } from "../utils/api";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [catalog, setCatalog] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load catalog from JSON file on mount
    useEffect(() => {
        const initCatalog = async () => {
            try {
                const data = await loadCatalog();
                setCatalog(data);
            } catch (error) {
                console.error('Failed to load catalog:', error);
            } finally {
                setIsLoading(false);
            }
        };
        initCatalog();
    }, []);

    // Save catalog to JSON file whenever it changes (debounced)
    useEffect(() => {
        if (!isLoading && catalog.length > 0) {
            const timeoutId = setTimeout(async () => {
                try {
                    await saveCatalog(catalog);
                } catch (error) {
                    console.error('Failed to save catalog:', error);
                }
            }, 500); // Debounce saves by 500ms

            return () => clearTimeout(timeoutId);
        }
    }, [catalog, isLoading]);

    const loginAdmin = (username, password) => {
        if (username === "admin" && password === "admin123") {
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logoutAdmin = () => {
        setIsAdmin(false);
    };

    const addCategory = (categoryData) => {
        setCatalog(prev => [...prev, { ...categoryData, id: categoryData.id || Date.now().toString(), products: [] }]);
    };

    const editCategory = (categoryId, updatedData) => {
        setCatalog(prev => prev.map(cat => cat.id === categoryId ? { ...cat, ...updatedData } : cat));
    };

    const deleteCategory = (categoryId) => {
        setCatalog(prev => prev.filter(cat => cat.id !== categoryId));
    };

    const addProduct = (categoryId, productData) => {
        setCatalog((prev) => {
            return prev.map((cat) => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        products: [...cat.products, { ...productData, id: Date.now().toString() }]
                    };
                }
                return cat;
            });
        });
    };

    const editProduct = (categoryId, productId, updatedData) => {
        setCatalog(prev => prev.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    products: cat.products.map(prod => prod.id === productId ? { ...prod, ...updatedData } : prod)
                };
            }
            return cat;
        }));
    };

    const deleteProduct = (categoryId, productId) => {
        setCatalog(prev => prev.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    products: cat.products.filter(prod => prod.id !== productId)
                };
            }
            return cat;
        }));
    };

    const searchProducts = (query) => {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        let results = [];
        catalog.forEach(cat => {
            cat.products.forEach(prod => {
                if (prod.name.toLowerCase().includes(lowerQuery) || cat.name.toLowerCase().includes(lowerQuery)) {
                    results.push({ ...prod, categoryName: cat.name });
                }
            });
        });
        return results;
    };

    return (
        <ProductContext.Provider value={{
            catalog,
            isAdmin,
            isLoading,
            loginAdmin,
            logoutAdmin,
            addCategory,
            editCategory,
            deleteCategory,
            addProduct,
            editProduct,
            deleteProduct,
            searchProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};
