import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import RegisterLayout from '@/layouts/appointments/register';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Meus Agendamentos',
        href: '/appointments',
    },
    {
        title: 'Agendar',
        href: '/appointments/new',
    },
];

type ProfileForm = {
    title: string;
    description: string;
    send_notification: boolean;
    date_appointment: string;
    date_notification: string;
}

export default function Register() {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        title: "",
        description: "",
        send_notification: false,
        date_appointment: "",
        date_notification: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('appointments.register'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agendar" />

            <RegisterLayout title='Agendar' description='Cadastre um novo agendamento'>
                <div className="space-y-6">
                    {/* <HeadingSmall title="Novo Agendamento" description="Cadastre um novo agendamento" /> */}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Título</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                autoComplete="title"
                                placeholder="Titulo"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>

                            <Input
                                id="description"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                autoComplete="username"
                                placeholder="Descrição"
                            />

                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div className="flex gap-2">
                            <Checkbox
                                id="send_notification"
                                checked={data.send_notification}
                                onCheckedChange={(e) => setData("send_notification", Boolean(e))}
                            />
                            <Label htmlFor="send_notification">Enviar por WhatsApp</Label>
                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Data do evento</Label>

                            <Input
                                id="date_appointment"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.date_appointment}
                                onChange={(e) => setData('date_appointment', e.target.value)}
                                required
                            />

                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        {data.send_notification ? (
                            <div className="grid gap-2">
                                <Label htmlFor="description">Data para notificação</Label>

                                <Input
                                    id="date_notification"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.date_notification}
                                    onChange={(e) => setData('date_notification', e.target.value)}
                                    required
                                />

                                <InputError className="mt-2" message={errors.description} />
                            </div>
                        ) : null}
                       
                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </RegisterLayout>
        </AppLayout>
    );
}
