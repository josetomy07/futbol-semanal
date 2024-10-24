import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const Crear = () => {

     //Traigo los datos del usuario y el predio seleccionado
     const user = usePage().props.auth.user;
     const { predioSelecionado } = usePage().props;


    // Obtener el valor de cuantas canchas dispinble hay.
    const [tipoFutbol, setTipoFutbol] = useState(false)
    const manejarCambio = (e) => {
        setTipoFutbol(e.target.value);
    }

    // habilita o deshabilita un input
    const [habilitado, setHabilitado] = useState(false);
    useEffect(() => {

        if (tipoFutbol === "futbol 5" && predioSelecionado.cinco > 0) {
            setHabilitado(true);
            data.futbol = tipoFutbol;
        }
        else if (tipoFutbol === "futbol 8" && predioSelecionado.ocho > 0) {
            setHabilitado(true);
            data.futbol = tipoFutbol;
        }
        else{
            setHabilitado(false);
        }

    }, [tipoFutbol]);


     //Carga el formulario al servidor
     const { data, setData, post} = useForm({
        jugador: user.name,
        email: user.email,
        predio: predioSelecionado.nombre,
        futbol: "",
        localidad: predioSelecionado.localidad,
        direccion: predioSelecionado.direccion,
        fecha: "",
        horario: "",
        reserva: "1"
    })


    const submit = (e) => {
        e.preventDefault();

       // console.log(data);
        post(route('Solicitud.store'));

    };


    return (

        <AuthenticatedLayout>
            <Head title="Crear Solicitud" />

            <div className='container'>

                <div className='valor'>

                    <div className="py-4 ml-3">
                        <button type="button" className="ml-4 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <Link href={route('dashboard')}><i className="fa-solid fa-left-long"></i></Link>
                        </button>
                    </div>

                    <form onSubmit={submit}>


                        <div className="grid gap-6 mb-6 md:grid-cols-2 ml-6 mr-6">

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Jugador</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.jugador}
                                    onChange={(e) => setData('name', e.target.value)}
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
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
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
                                    value={data.predio}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    placeholder={predioSelecionado.nombre}
                                    disabled
                                />
                            </div>

                            <div>
                                <label htmlFor="futbol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Tipo de Futbol</label>
                                <select
                                    name="futbol"
                                    id="futbol"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={tipoFutbol}
                                    onChange={manejarCambio}
                                    >
                                    <option value="">Selecione</option>
                                    <option value="futbol 5">Futbol 5</option>
                                    <option value="futbol 8"> Futbol 8</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="localidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Localidad</label>
                                <input
                                    type="text"
                                    id="localiad"
                                    name="localidad"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.localidad}
                                    onChange={(e) => setData('localidad', e.target.value)}
                                    placeholder={predioSelecionado.localidad}
                                    disabled
                                />
                            </div>

                            <div>
                                <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Direccion</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.direccion}
                                    onChange={(e) => setData('direccion', e.target.value)}
                                    placeholder={predioSelecionado.direccion}
                                    disabled
                                />
                            </div>

                            <div className="date-container">
                                <label htmlFor="fecha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Fecha de Solicitud</label>
                                <input
                                    type='date'
                                    name='fecha'
                                    id="fecha"
                                    className="custom-date-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.fecha}
                                    onChange={(e) => setData('fecha',e.target.value)}
                                    disabled={!habilitado}
                                    />
                            </div>

                            <div>
                                <label htmlFor="horario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Hora de Solicitud</label>
                                <select
                                    name="horario"
                                    id="horario"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.horario}
                                    onChange={(e) => setData('horario', e.target.value)}
                                    disabled={!habilitado}
                                    >
                                    <option value="">Selecione</option>
                                    <option value="20:00"> 20:00 - 21:00</option>
                                    <option value="21:00"> 21:00 - 22:00</option>
                                    <option value="22:00"> 22:00 - 23:00</option>
                                    <option value="23:00"> 23:00 - 24:00</option>
                                </select>

                            </div>

                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <PrimaryButton className="ms-4">
                                Solicitar Turno
                            </PrimaryButton>
                        </div>

                    </form>

                </div>
            </div>

        </AuthenticatedLayout>

    )

}

export default Crear
