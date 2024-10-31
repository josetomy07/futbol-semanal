import { Head, Link, usePage} from '@inertiajs/react';
import Dashjugador from './Usuarios/Jugador/Dashjugador';
import Dashpredios from './Usuarios/Predio/Dashpredios';
import Dashadmin from './Usuarios/Administrador/Dashadmin';

export default function Dashboard() {

    const { auth } = usePage().props;

    return (
        <>
            {auth.roles.includes('jugador') && (
             <>
                <Dashjugador />
             </>

            )}

            {auth.roles.includes('predio') && (
             <>
                <Dashpredios />
             </>

            )}

            {auth.roles.includes('superadmin') && (
                <>
                  <Dashadmin />
                </>
            )}
        </>


    );
}
