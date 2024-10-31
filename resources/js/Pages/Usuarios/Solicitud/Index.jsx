import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Mapbox from '@/Components/Mapbox';
import { Modal } from 'flowbite-react';


const Index = () => {

    //Datos de predios, alquilados, ciudad
    const { ciudad, predios, alquilados } = usePage().props;

    //Habre y cierra opciones como calendario y disponibilidad
    const [showToast, setShowToast] = useState(false)
    const [showEquipo, setShowEquipo] = useState(false);

    //Marca toda las fechas posteriores al dia en gris y habre el menu disponible
    const [selectedDate, setSelectedDate] = useState(new Date());
    const verDiponibilidad = (date) =>{
        setSelectedDate(date)
        setShowEquipo(true)
    }

    //Contador del dia de hoy
    const [contador, setContador] = useState([]);
    useEffect(() => {
        const fetchContador = async () => {
            const response = await fetch('/Solicitud/hoy');
            const data = await response.json();
            setContador(data.contador);
        };

        fetchContador();
    }, []);

    //De vuelve los predios disponible
    const [selectedLocalidad, setSelectedLocalidad] = useState(null);
    const [datos, setDatos] = useState([]);
    const handleLocalidadChange = async (e) => {

        const localidadId = e.target.value;
        setSelectedLocalidad(localidadId);

        const response = await fetch(`/Solicitud/${localidadId}`);
        const result = await response.json();
        setDatos(result);
    };

    //ubicacion
    const [selectedUbicacion, setSelectedUbicacion] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    //Modal muestra la localizacion de los predios.
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const confirmUserDeletion = async (e) => {

        const ubicacionId = e.target.value;

        setConfirmingUserDeletion(true);

        setSelectedUbicacion(ubicacionId);


        predios.map(dato => {

            if (dato.direccion === ubicacionId) {

                setLatitude(dato.latitude);
                setLongitude(dato.longitude);
            }

        });

    };
    const closeModal = () => {
        setConfirmingUserDeletion(false);

        //clearErrors();
        //reset();
    };


    return (

        <AuthenticatedLayout>

            <Head />

            <div className=" container py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="d-flex position-relative align-items-center p-3 my-3 bg-purple shadow-sm text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <div className="">
                            <h1 className="h6 mb-0 lh-1">Solicitud de Cancha</h1>
                        </div>
                        <button
                            type='button'
                            className='btn btn-primary position-absolute top-50 end-0 mr-6'
                            onClick={(e) => setShowToast('Disponibilidad', e.target.value)}
                            >
                            Disponibilidad
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-fluid">

                <div className="row justify-content-start">

                    {showToast === "Disponibilidad" && (

                        <div className="caja1 text-gray-900 bg-slate-800 border border-b-gray-800 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                            <h5 className='py-4 text-center'>Ver Disponibilidad</h5>

                            <Calendar
                                className="rounded"
                                onChange={verDiponibilidad}
                                value={selectedDate}
                                minDate={new Date()}
                            />
                        </div>

                    )}

                    {showEquipo && (
                    <>
                        <div className="mx-8 text-black bg-zinc-300 border border-b-gray-800 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                            <div className="container">

                                <div className="relative overflow-x-auto">

                                    <h5 className='py-4 text-center'>Predio disponible </h5>

                                    <table className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <thead  className=''>
                                            <tr className='bg-red-400'>
                                            <th scope="col" className=''>

                                                <label htmlFor="underline_select" className="sr-only">Localidad</label>
                                                <select
                                                    value={selectedLocalidad || ''}
                                                    onChange={handleLocalidadChange}
                                                    className="bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                                    >
                                                    <option value="" disabled>Localidad</option>
                                                    {ciudad.map(location =>(
                                                        <option
                                                            key={location.localidad}
                                                            value={location.localidad}
                                                            >
                                                            {location.localidad}
                                                        </option>
                                                    ))}
                                                </select>

                                            </th>
                                            <th scope="col" className="px-8 py-3">Ubicación</th>
                                            <th scope="col" className="px-6 py-3">Futbol 5</th>
                                            <th scope="col" className="px-6 py-3">Futbol 8</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datos.map(data => (
                                                <tr scope="col" key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="px-2 py-2">
                                                        <i className="fa-solid fa-futbol ico-soli" />
                                                        {data.nombre}
                                                    </td>
                                                    <td scope="col" className="px-2 py-2">
                                                        <button
                                                            type='button'
                                                            className="px-4 py-2"
                                                            value={data.direccion || ''}
                                                            onClick={confirmUserDeletion}
                                                        >
                                                            <i className="fa-solid fa-map-location-dot ico-soli" />
                                                            {data.direccion}
                                                        </button>
                                                    </td>
                                                    <td scope="col" className="px-4 py-2 text-center">{data.cinco}</td>
                                                    <td scope="col" className="px-4 py-2 text-center">{data.ocho}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

                                </div>

                            </div>
                        </div>
                    </>
                    )}

                </div>

            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>

                <Modal.Body className='container-fluid'>

                    <button
                        type="button"
                        className='position-absolute top-50 end-0 mr-6 py-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                        onClick={closeModal}
                        >
                        <i className="fa-solid fa-xmark ico-modal" />
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div>
                        <h3 className='text-center py-4'>Ubicación en el mapa</h3>
                        <Mapbox latitude={latitude} longitude={longitude} />
                    </div>

                </Modal.Body>

            </Modal>

        </AuthenticatedLayout>

    )
}

export default Index
