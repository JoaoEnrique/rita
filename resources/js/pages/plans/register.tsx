import { Plan, type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import RegisterLayout from '@/layouts/appointments/register';
import { AlertNotification } from '@/components/ui/alert-notification';
// import { Dialog } from '@radix-ui/react-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gerenciar planos',
        href: '/plans',
    },
    {
        title: 'Cadastrar',
        href: '/appointments/new',
    },
];

export default function Register() {
    const { props } = usePage();
    const { plan } = usePage().props as unknown as { plan: Plan };
    const isEditing = Boolean(plan);
    const { data, setData, post, patch, errors, processing, recentlySuccessful } = useForm<Required<Plan>>({
        id: plan?.id || 0,
        name: plan?.name || '',
        description: plan?.description || '',
        value: plan?.value || "",
        icon: plan?.icon || '',
        color: plan?.color || '',
    });


    if (isEditing) {
        breadcrumbs[1].title = 'Editar';
        breadcrumbs[1].href = `/plans/${plan.id}`;
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && plan?.id != null) {
            patch(route('plans.update', { id: plan.id }), {
                preserveScroll: true,
            });
            return;
        }

        post(route('plans.save'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? "Editar Plano" : "Adicionar Plano"} />

            <AlertNotification success={props.success as string | undefined} error={props.error as string | undefined}/>

            <RegisterLayout title={isEditing ? "Editar Plano" : "Adicionar Plano"} description={isEditing ? "Edite esse plano" : "Cadastre um novo plano"}>
                <div className="space-y-6">

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Titulo"
                            />

                            <InputError className="mt-2" message={errors.name} />
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

                        <div className="grid gap-2">
                            <Label htmlFor="value">Preço</Label>

                            <Input
                                id="value"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.value}
                                onChange={(e) => setData('value', e.target.value)}
                                autoComplete="value"
                                placeholder="R$ 0,00"
                            />

                            <InputError className="mt-2" message={errors.value} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="icon">Icone (lucide icon)</Label>

                            <Input
                                id="icon"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                placeholder="Heart"
                            />

                            <InputError className="mt-2" message={errors.icon} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="color">Cor (hexadecimal, rgb)</Label>

                            <Input
                                id="color"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.color}
                                onChange={(e) => setData('color', e.target.value)}
                                autoComplete="username"
                                placeholder="#000"
                            />

                            <InputError className="mt-2" message={errors.color} />
                        </div>
                       
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
