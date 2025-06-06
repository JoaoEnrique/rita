import { AppointmentPagination, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

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

const iconMap = {
  Gift,
  Rocket,
  BadgeDollarSign,
} as const;

type IconName = keyof typeof iconMap;


export default function Index() {
    const { plans } = (usePage().props as unknown) as { plans: AppointmentPagination };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Planos" />

            <IndexLayout title='Planos' description='Escolha o plano que melhor se adapta às suas necessidades'>
                    {plans.data.length === 0 ? (
                        <p className="text-neutral-600">Nenhum plano encontrado.</p>
                    ) : (
                        <ul className="flex flex-wrap gap-4 items-stretch mt-4 ">
                            {plans.data.map((plan) => {
                                const IconComponent = iconMap[plan.icon as IconName];

                                return (
                                    <li key={plan.id} className="mb=4 flex flex-col justify-between border rounded-lg p-6 shadow-md w-full md:w-[calc(33.333%-1rem)] bg-zinc-900">
                                        <div>
                                            <div className={`flex items-center gap-2 mb-4 ${plan.color}`}>
                                                {IconComponent && <IconComponent className="w-5 h-5" />}
                                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                            </div>
                                            <p className="text-sm text-neutral-300">
                                                {plan.description}
                                            </p>
                                        </div>
                                        <div className="mt-6">
                                            <Link href={`/plans/details/${plan.id}`}>
                                                <Button variant="default" className="w-full">
                                                    {plan.value ? `R$ ${Number(plan.value).toFixed(2)} / mês` : 'Consultar'}
                                                </Button>
                                            </Link>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
            </IndexLayout>
        </AppLayout>
    );
}
