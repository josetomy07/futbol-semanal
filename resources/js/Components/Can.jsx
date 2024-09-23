import React, { createContext, useContext } from 'react';

// Crear el contexto de permisos
const PermissionContext = createContext([]);

// Proveedor de permisos
export const PermissionProvider = ({ permissions, children }) => {
  return (
    <PermissionContext.Provider value={permissions}>
      {children}
    </PermissionContext.Provider>
  );
};

// Hook para usar los permisos
const usePermissions = () => {
  return useContext(PermissionContext);
};

// Componente de autorización
const Can = ({ permission, children }) => {
  const permissions = usePermissions();
  return permissions.includes(permission) ? children : null;
};

export default Can;
