import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage} from '@inertiajs/react';

export default function Dashboard() {

    const { auth } = usePage().props;


    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {auth.roles.includes('superadmin') && (
                    <div className="container py-12">
                        <div className="row">
                            <div className="col-sm-4 mb-3 mb-sm-0">
                                <div className="card text-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Roles</h5>
                                        <PrimaryButton><Link href={route('Roles.index')}>Roles</Link></PrimaryButton>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card text-center mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Usuarios</h5>
                                        <PrimaryButton>User</PrimaryButton>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card text-center mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Reportes de Errores</h5>
                                        <PrimaryButton>Reportes</PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
