import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const Crear = () => {

    const user = usePage().props.auth.user;

    const { predios, predioSelecionado } = usePage().props;

    const [futbol, setFutbol] = useState(false)

    const manejarCambio = (evento) => {
        setFutbol(evento.target.value);
    }





    return (

        <AuthenticatedLayout>
            <Head title="Crear Solicitud" />

            <div className="py-5 ml-3">
                <button type="button" className="ml-4 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    <Link href={route('dashboard')}><i className="fa-solid fa-left-long"></i></Link>
                </button>
            </div>

            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2 ml-6 mr-6">

                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={user.name}
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={user.email}
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Predios</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={predioSelecionado.nombre}
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="localidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Localidad</label>
                        <input
                            type="text"
                            id="localiad"
                            name="locaidad"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={predioSelecionado.localidad}
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="futbol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Tipo de Futbol</label>
                        <select
                            name="futbol"
                            id="futbol"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={futbol}
                            onChange={manejarCambio}
                            >
                            <option value="">Selecione</option>
                            <option value="canchacinco">Futbol 5</option>
                            <option value="canchaocho"> Futbol 8</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="futbol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Disponibiliad de cancha</label>
                        <input
                            type="text"
                            id="futbol"
                            name="futbol"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={futbol === 'canchacinco' && predioSelecionado.canchacinco || futbol === 'canchaocho' && predioSelecionado.canchaocho || undefined}
                            disabled
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className="ms-4">
                        Actualizar
                    </PrimaryButton>
                </div>

            </form>

        </AuthenticatedLayout>

    )

}

export default Crear
