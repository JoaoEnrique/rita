import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import IndexLayout from '@/layouts/appointments/index';
import { BadgeDollarSign, Gift, Rocket } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Planos',
        href: '/plans',
    },
];

export default function Index() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Planos" />

            <IndexLayout title='Planos' description='Escolha o plano que melhor se adapta às suas necessidades'>
                    {/* import { BadgeDollarSign, Gift, Rocket } from 'lucide-react'; */}

                    <ul className="flex flex-wrap gap-4 items-stretch">
                    {/* Plano Gratuito */}
                    <li className="flex flex-col justify-between border rounded-lg p-6 shadow-md w-full md:w-[calc(33.333%-1rem)] bg-zinc-900">
                        <div>
                        <div className="flex items-center gap-2 mb-4 text-green-400">
                            <Gift className="w-5 h-5" />
                            <h3 className="text-xl font-bold">Gratuito</h3>
                        </div>
                        <p className="text-sm text-neutral-300">
                            Até 10 agendamentos por mês com notificações automáticas.
                        </p>
                        </div>
                       <div className="mt-6">
                            <Button
                                variant="outline"
                                className="w-full cursor-default pointer-events-none text-muted-foreground border-muted"
                            >
                                Seu plano atual
                            </Button>
                        </div>
                    </li>

                    {/* Plano Essencial */}
                    <li className="flex flex-col justify-between border rounded-lg p-6 shadow-md w-full md:w-[calc(33.333%-1rem)] bg-zinc-900">
                        <div>
                        <div className="flex items-center gap-2 mb-4 text-yellow-400">
                            <BadgeDollarSign className="w-5 h-5" />
                            <h3 className="text-xl font-bold">Essencial</h3>
                        </div>
                        <p className="text-sm text-neutral-300">
                            Até 50 agendamentos por mês com notificações automáticas.
                        </p>
                        </div>
                        <div className="mt-6">
                        <Link href="/checkout?plan=essencial">
                            <Button variant="default" className="w-full">R$ 9,90 / mês</Button>
                        </Link>
                        </div>
                    </li>

                    {/* Plano Profissional */}
                    <li className="flex flex-col justify-between border rounded-lg p-6 shadow-md w-full md:w-[calc(33.333%-1rem)] bg-zinc-900">
                        <div>
                        <div className="flex items-center gap-2 mb-4 text-purple-400">
                            <Rocket className="w-5 h-5" />
                            <h3 className="text-xl font-bold">Profissional</h3>
                        </div>
                        <p className="text-sm text-neutral-300">
                            Agendamentos ilimitados com todas as funcionalidades ativas.
                        </p>
                        </div>
                        <div className="mt-6">
                        <Link href="/checkout?plan=profissional">
                            <Button variant="default" className="w-full">R$ 19,90 / mês</Button>
                        </Link>
                        </div>
                    </li>
                    </ul>

            </IndexLayout>
        </AppLayout>
    );
}
