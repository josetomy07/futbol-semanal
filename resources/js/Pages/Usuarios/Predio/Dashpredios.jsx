import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';


const Dashpredios = () => {
    const user = usePage().props.auth.user;
    const { predios } = usePage().props;

  return (
    <AuthenticatedLayout>
      <div className="container py-4">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">Bienvenido {user.name}</div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default Dashpredios
