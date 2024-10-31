import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const Dashadmin = () => {
    const user = usePage().props.auth.user;

  return (
    <AuthenticatedLayout>

        <div className="container py-4">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">Bienvenido {user.name}</div>
                </div>
            </div>
        </div>

        <div className="container py-4">
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
                            <PrimaryButton><Link href={route('Administrador.index')}>User</Link></PrimaryButton>
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
    </AuthenticatedLayout>
  )
}

export default Dashadmin
