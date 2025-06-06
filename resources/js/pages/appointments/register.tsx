import { Appointment, type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import RegisterLayout from '@/layouts/appointments/register';
import { AlertNotification } from '@/components/ui/alert-notification';
// import { Dialog } from '@radix-ui/react-dialog';

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
    id?: number;
    title: string;
    description: string;
    send_notification: boolean;
    date_appointment: string;
    date_notification: string;
}

export default function Register() {
    const { props } = usePage();
    const { appointment } = usePage().props as unknown as { appointment: Appointment };
    const isEditing = Boolean(appointment);
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        id: appointment?.id || null,
        title: appointment?.title || '',
        description: appointment?.description || '',
        send_notification: appointment?.send_notification || false,
        date_appointment: appointment?.date_appointment || '',
        date_notification: appointment?.date_notification || '',
    });


    if (isEditing) {
        breadcrumbs[1].title = 'Editar';
        breadcrumbs[1].href = `/appointments/${appointment.id}`;
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing) {
            post(route('appointments.update', appointment.id), {
                preserveScroll: true,
            });
            return;
        }

        post(route('appointments.register'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? "Editar" : "Agendar"} />

            <AlertNotification success={props.success as string | undefined} error={props.error as string | undefined}/>

            <RegisterLayout title={isEditing ? "Editar" : "Agendar"} description={isEditing ? "Edite seu agendamento" : "Cadastre um novo agendamento"}>
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
                            <Button disabled={processing}>
                                {isEditing ? 'Atualizar' : 'Salvar'}
                            </Button>

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
