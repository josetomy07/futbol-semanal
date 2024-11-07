import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';




const Dashjugador = () => {
    const user = usePage().props.auth.user;
    const {datosAlquiler} = usePage().props;


    const { data } = usePage();

    const isFutureDate = (date) => {
        const today = new Date();
        return date > today;
    }


    return (
        <AuthenticatedLayout>

            <Head title="jugador" />
            <div className="container py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Bienvenido {user.name}</div>

                    </div>
                </div>
            </div>

            <div>


            </div>

        </AuthenticatedLayout>
    )
}

export default Dashjugador
