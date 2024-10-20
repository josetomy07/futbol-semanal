import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage} from '@inertiajs/react';
import '../../css/style.css';


export default function Dashboard({roles}) {

    const user = usePage().props.auth.user;
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Layout" />

            {auth.roles.includes('jugador') && (
             <>
                <div className="py-4">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="relative">
                                    <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"><i className="fa-solid fa-magnifying-glass"></i></label>
                                </div>
                            </div>

                    </div>
                </div>

                <div className="container mx-auto">

                    <div className="grid grid-cols-4 gap-4">

                        <div id="docs-card"
                            className="flex col-span-2 flex-col items-start overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-12 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >
                            <div className="relative flex items-center gap-6 lg:items-end">
                                <div id="docs-card-content" className="flex items-start gap-6 lg:flex-col">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">



                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="docs-card"
                            className="flex md:row-span-4 items-start overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >

                        </div>

                        <div id="docs-card"
                            className="flex md:row-span-4 items-start overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20]  lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >

                        </div>

                        <div id="docs-card"
                            className="flex items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-4 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >

                        </div>

                        <div id="docs-card"
                            className="flex items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-4 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >

                        </div>

                        <div id="docs-card"
                            className="flex items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-4 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >

                        </div>

                        <div id="docs-card"
                            className="flex items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-4 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >

                        </div>

                    </div>

                </div>

             </>

            )}

            {auth.roles.includes('superadmin') && (
                <>
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
                </>
            )}


        </AuthenticatedLayout>
    );
}
