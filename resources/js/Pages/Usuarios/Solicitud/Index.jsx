import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Collapse from '@/Components/collapse';
import { Head, usePage } from '@inertiajs/react';



const Index = () => {

    const { ciudad } = usePage().props;

    const [showToast, setShowToast] = useState(false)
    const [showEquipo, setShowEquipo] = useState(false);


    const [datos, setDatos] = useState('');

    useEffect(() => {
        fetch('/Solicitud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ nombre: showEquipo })
            })
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error:', error));
    }, [showEquipo]);

    return (

        <AuthenticatedLayout>

            <Head title="Solicitudes" />

            <div className="container py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Nueva Solicitud</div>
                    </div>
                </div>
            </div>

            <div className="container">

                <div className="row justify-content-start">

                    <div className="col-md-2 menu1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                        <Collapse.button
                            onClick={(e) => setShowToast('Solicitud de Cancha', e.target.value)}>
                            <i className="fa-solid fa-futbol ico-soli"></i>
                            Solicitud de Cancha
                        </Collapse.button>

                        <Collapse.button
                            value={'Disponibildad de cancha'}
                            onClick={(e) => setShowToast(e.target.value)}>
                            <i className="fa-solid fa-map-location-dot ico-soli"></i>
                            Disponibildad de cancha
                        </Collapse.button>

                        <Collapse.button
                            onClick={(e) => setShowToast('Baja de Reserva', e.target.value)}>
                            <i className="fa-solid fa-calendar-xmark ico-soli"></i>
                            Baja de Reserva
                        </Collapse.button>

                        <Collapse.button
                            onClick={(e) => setShowToast('Locacion de Predio', e.target.value)}>
                            <i className="fa-solid fa-earth-americas ico-soli"></i>
                            Locacion de Predio
                        </Collapse.button>

                        <Collapse.button
                            onClick={(e) => setShowToast('Reserva Varias', e.target.value)}>
                            <i className="fa-solid fa-clipboard-list ico-soli"></i>
                            Reserva Varias
                        </Collapse.button>

                        <Collapse.button
                            onClick={(e) => setShowToast('Error de Sistema', e.target.value)}>
                            <i className="fa-solid fa-screwdriver-wrench ico-soli"></i>
                            Error de Sistema
                        </Collapse.button>

                    </div>

                    {showToast === "Solicitud de Cancha" && (
                            <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {ciudad.map( (lugar, index ) => (
                                    <Collapse.button
                                        type='button'
                                        value={lugar.localidad}
                                        onClick={(e) => setShowEquipo(e.target.value)}
                                        key={index}
                                    >
                                        {lugar.localidad}
                                    </Collapse.button>
                                ))}
                            </div>
                    )}

                    {showToast === "Disponibildad de cancha" && (
                    <>
                        <div className="col-md-4">
                        <div className="ml-3 text-sm font-normal">Set yourself free2.</div>
                        </div>

                        <button type='button' className='border-t-purple-500' onClick={() => setShowToast(false)}> salir</button>
                    </>
                    )}

                    {showEquipo === "Cipolletti" && (

                        <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {datos.map( (predio, indexs ) => (
                                <a
                                    href={route('Solicitud.show', predio.id)}
                                    className='relative inline-flex items-center w-full px-4 py-3 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
                                    key={indexs}
                                    >
                                    {predio.nombre}
                                </a>
                            ))}
                        </div>

                    )}

                    {showEquipo === "Neuquen" && (
                        <>
                            <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {datos.map( (predio, indexs ) => (

                                <Collapse.button
                                    key={indexs}>
                                        {predio.nombre}
                                </Collapse.button>
                                ))}
                            </div>
                        </>
                    )}

                    {showEquipo === "Cinco-Salto" && (

                        <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {datos.map( (predio, indexs ) => (
                                <Collapse.button
                                    key={indexs}
                                    >
                                    {predio.nombre}
                                </Collapse.button>
                            ))}
                        </div>

                    )}

                    {showEquipo === "Fernandez-Oro" && (

                        <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {datos.map( (predio, indexs ) => (
                                <Collapse.button
                                    key={indexs}
                                    >
                                    {predio.nombre}
                                </Collapse.button>
                            ))}
                        </div>

                    )}







                </div>


            </div>

        </AuthenticatedLayout>

    )
}

export default Index