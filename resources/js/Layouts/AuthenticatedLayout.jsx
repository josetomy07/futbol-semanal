import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';

export default function Authenticated({ header, children }) {

    const { auth } = usePage().props;
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const dashboardRoute =
    auth.roles[0] === 'superadmin' ? route('dashboard') :
    auth.roles[0] === 'jugador' ? route('Jugador.Dashjugador') :
    auth.roles[0] === 'predio' ? route('Predio.Dashpredios'):
    '/';

    return (

        <div className="min-h-screen bg-slate-50 dark:bg-gray-900">

            <nav className="bg-gray-200 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">

                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <i id="house" className="bi bi-house-door"></i>
                                </Link>
                            </div>


                            <div className="hidden sm:flex sm:items-center space-x-4 sm:-my-px sm:ms-5">
                                <div className="ms-3 relative">
                                    <Link href={dashboardRoute}
                                        type="button"
                                        className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white dark:text-slate-50 bg-gray-500 dark:bg-gray-900 focus:outline-none transition ease-in-out duration-150"
                                        >
                                        Inicio
                                    </Link>
                                </div>
                            </div>

                            {auth.roles.includes('jugador') && (
                                <div className="hidden sm:flex sm:items-center">
                                    <div className="ms-3 relative">
                                        <button
                                            type="button"
                                            className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white dark:text-slate-50 bg-sky-800 dark:bg-sky-900 focus:outline-none transition ease-in-out duration-150"
                                            >
                                            Ver Solicitud
                                        </button>
                                    </div>
                                    <div className="ms-3 relative">
                                        <button
                                            type="button"
                                            className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white dark:text-slate-50 bg-sky-800 dark:bg-sky-900 focus:outline-none transition ease-in-out duration-150"
                                            >
                                            Conocimientos
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">

                            <div className="ms-3 relative">
                                <button
                                    type="button"
                                    className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white dark:text-slate-50 bg-sky-800 dark:bg-sky-900 focus:outline-none transition ease-in-out duration-150"
                                    >
                                    <i className="bi bi-info-square"></i>
                                </button>
                            </div>

                            <div className="ms-2 relative">
                                <button
                                    type="button"
                                    className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white dark:text-slate-50 bg-emerald-900 dark:bg-emerald-900 hover:text-white dark:hover:text-slate-50 focus:outline-none transition ease-in-out duration-150"
                                    >
                                    <Link href={route('Solicitud.index')}>Nueva Solicitud </Link>
                                </button>
                            </div>

                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="flex items-center px-3 py-2 justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                                            >
                                                FS

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Salir
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={dashboardRoute}>
                            New Perfil
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Salir
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>

            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
