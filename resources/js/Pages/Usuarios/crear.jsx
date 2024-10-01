import React, { useState } from 'react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'




const crear = ({roles}) => {

    const [rol, setRol] = useState();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('Usuarios.store', {rol}), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

  return (
    <AuthenticatedLayout>
        <Head title="Crear Usuarios" />

        <div className="container py-12">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div className="flex items-center justify-between md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    < div className="sm:col-span-3">
                        <button type="button" className="inline-flex ml-4 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <Link href={route('Usuarios.index')}>Back</Link>
                        </button>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <div className="mt-4 ml-4 mr-4">
                        <InputLabel htmlFor="name" value="Name" className='ml-1' />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4 ml-4 mr-4">
                        <InputLabel htmlFor="email" value="Email" className='ml-1' />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 ml-4 mr-4">
                        <InputLabel htmlFor="password" value="Password" className='ml-1' />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 ml-4 mr-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='ml-1' />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mt-4 ml-4 mr-4">
                        <label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione Opción</label>

                        <select
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >

                            <option>Seleccione Rol</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}

                        </select>

                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default crear

