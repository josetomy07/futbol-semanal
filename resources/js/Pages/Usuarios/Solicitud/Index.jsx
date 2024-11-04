import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Mapbox from '@/Components/Mapbox';
import { Modal, Popover } from 'flowbite-react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';


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

    //Trae la informacion de las canchas
    const[contador, setContador] = useState([]);
    useEffect(() => {

        const fetchContador = async () => {

            const response = await fetch('/Solicitud/hoy');
            const data = await response.json();

            setContador(data)

        }

        fetchContador();
    }, []);

    console.log(contador);


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
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    //Modal muestra la localizacion de los predios.
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const confirmUserDeletion = async (e) => {

        const ubicacionId = e.target.value;

        setConfirmingUserDeletion(true);

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


    // //Retorna una hora
    const [isPopoverOpen, setIsPopoverOpen] = useState({});
    const togglePopover = (id) => {
        setIsPopoverOpen((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const [selectedValue, setSelectedValue] = useState({});
    const handleSelect = (id, value) => {
        setSelectedValue((prev) => ({ ...prev, [id]: value }));
        setIsPopoverOpen((prev) => ({ ...prev, [id]: false })); // Cierra el Popover específico
    };



    //const canchasDisponibles = contador.totalDiponibles.canchas;
    //const botonHabilitado = verificarDisponibilidad(canchasDisponibles);

    const [habilitado, setHabilitado] = useState();
    const pruebas = async (e) => {
        const tipoCancha = e.target.value;

         console.log(canchasDisponibles);

        let mostrarBoton = false;

        for (const cancha in tipoCancha) {
            const horarios = tipoCancha[cancha];

            console.log(horarios);
            // Verificamos si hay algún horario disponible
            //const hayTurno = Object.values(horarios).some(turno => turno > 0);

            //if (hayTurno) {
           // mostrarBoton = true;
           // break; // Si encontramos un turno, podemos salir del bucle
            //}
        }

        //return mostrarBoton;
    }

   // console.log(selectedValue);


   const [isVisible, setIsVisible] = useState(true);
    const ocultarBoton = () => {
        setIsVisible(false);
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

                                    <table className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <thead  className=''>
                                            <tr className='bg-red-950'>
                                            <th scope="col" className=''>

                                                <label htmlFor="underline_select" className="sr-only">Localidad</label>
                                                <select
                                                    value={selectedLocalidad || ''}
                                                    onChange={handleLocalidadChange}
                                                    className="bg-transparent border-0 border-b-2 text-white border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                                    >
                                                    <option value="" disabled>Localidad</option>
                                                    {ciudad.map(location =>(
                                                        <option
                                                            className='text-black'
                                                            key={location.localidad}
                                                            value={location.localidad}
                                                            >
                                                            {location.localidad}
                                                        </option>
                                                    ))}
                                                </select>

                                            </th>
                                            <th scope="col" className="px-8 py-3 text-white">Ubicación</th>
                                            <th scope="col" className="px-6 py-3 text-white">Futbol 5</th>
                                            <th scope="col" className="px-6 py-3 text-white">Futbol 8</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datos.map(usuarios => (
                                                <tr scope="col" className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={usuarios.id}>

                                                    <td className="px-2 py-2">
                                                        <i className="fa-solid fa-futbol ico-soli" />
                                                        {usuarios.nombre}
                                                    </td>
                                                    <td scope="col" className="px-2 py-2">
                                                        <button
                                                            type='button'
                                                            className="px-4 py-2"
                                                            value={usuarios.direccion || ''}
                                                            onClick={confirmUserDeletion}
                                                        >
                                                            <i className="fa-solid fa-map-location-dot ico-soli" />
                                                            {usuarios.direccion}
                                                        </button>
                                                    </td>

                                                        <td scope="col" className="px-4 py-2 text-center">

                                                            <Popover
                                                                onClose={() => togglePopover(usuarios.id)}
                                                                aria-labelledby="profile-popover"
                                                                content={
                                                                    <div className="w-64 p-3">

                                                                        <p>Horario Disponible</p>

                                                                        <div className="mb-2 flex items-center justify-between">

                                                                            <ul className="grid w-full grid-cols-2 gap-2 mt-2">

                                                                                {isVisible &&(
                                                                                    <li>
                                                                                        <button type="radio" id="20:00" onClick={() => handleSelect(usuarios.id, '20:00')}  className="hidden peer" name="timetable" />
                                                                                        <label htmlFor="20:00"
                                                                                            className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-black peer-checked:text-black hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                                                                                            >
                                                                                            20:00 PM
                                                                                        </label>
                                                                                    </li>
                                                                                )}

                                                                                <li>
                                                                                    <button type="radio" id="21:00" onClick={() => handleSelect(usuarios.id, '21:00')}  className="hidden peer" name="timetable" />
                                                                                    <label htmlFor="21:00"
                                                                                        className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-black peer-checked:text-black hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                                                                                        >
                                                                                        21:00 PM
                                                                                    </label>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="radio" id="22:00" onClick={() => handleSelect(usuarios.id, '22:00')} className="hidden peer" name="timetable" />
                                                                                    <label htmlFor="22:00"
                                                                                        className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-black peer-checked:text-black hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                                                                                        >
                                                                                        22:00 PM
                                                                                    </label>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="radio" id="23:00" onClick={() => handleSelect(usuarios.id, '23:00')}  className="hidden peer" name="timetable" />
                                                                                    <label htmlFor="23:00"
                                                                                        className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-black peer-checked:text-black hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                                                                                        >
                                                                                        23:00 PM
                                                                                    </label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>

                                                                        <PrimaryButton>
                                                                            <Link href="#">Reservar</Link>
                                                                        </PrimaryButton>

                                                                    </div>
                                                                }
                                                            >
                                                                <button
                                                                    type="button"
                                                                    value={'futbol 5'}
                                                                    onChange={() => togglePopover(usuarios.id)}
                                                                    onClick={pruebas}
                                                                    >
                                                                    <i className="fa-solid fa-clock ico-soli" />
                                                                    Futbol 5
                                                                </button>
                                                            </Popover>

                                                        </td>

                                                    <td scope="col" className="px-4 py-2 text-center">
                                                        <i className="fa-solid fa-clock ico-soli" />
                                                        Futbol 8
                                                    </td>
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



