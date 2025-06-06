import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import IndexLayout from '@/layouts/appointments/index';

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
                    <ul className="flex flex-wrap gap-4 items-stretch">
                        <li
                            className="h-50 border rounded-md p-4 shadow-sm flex flex-col align-center justify-center w-full md:w-[calc(33.333%-1rem)]"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">10 por mês</h3>
                                    <p className="text-sm">
                                        Receba até 10 agendamentos por mês, com notificações automáticas.
                                    </p>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Link href={`/appointments`}>
                                    <Button variant="outline">Contatar Plano</Button>
                                    </Link>
                                </div>
                        </li>
                        <li
                            className="h-50 border rounded-md p-4 shadow-sm flex flex-col align-center justify-center w-full md:w-[calc(33.333%-1rem)]"
                            >
                            <div>
                                <h3 className="text-lg font-semibold">50 por mês</h3>
                                <p className="text-sm">
                                    Receba até 10 agendamentos por mês, com notificações automáticas.
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Link href={`/appointments`}>
                                <Button variant="outline">Contatar Plano</Button>
                                </Link>
                            </div>
                        </li>
                        <li
                            className="h-50 border rounded-md p-4 shadow-sm flex flex-col align-center justify-center w-full md:w-[calc(33.333%-1rem)]"
                            >
                            <div>
                                <h3 className="text-lg font-semibold">100 por mês</h3>
                                <p className="text-sm">
                                    Receba até 10 agendamentos por mês, com notificações automáticas.
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Link href={`/appointments`}>
                                <Button variant="outline">Contatar Plano</Button>
                                </Link>
                            </div>
                        </li>
                    </ul>
            </IndexLayout>
        </AppLayout>
    );
}
