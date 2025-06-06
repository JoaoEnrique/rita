import { AppointmentPagination, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import IndexLayout from '@/layouts/appointments/index';
import { AlertNotification } from '@/components/ui/alert-notification';
import { BadgeDollarSign, Gift, Pencil, Rocket } from 'lucide-react';
import DeletePlan from '@/components/delete-plan';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Planos',
        href: '/plans/manage',
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
    const { props } = usePage();

    return (
        
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Planos" />
                <AlertNotification success={props.success as string | undefined} error={props.error as string | undefined}/>

                <IndexLayout title='Planos' description='Visualize os planos'>
                    <Link href={route('plans.register')}>
                        <Button className='text-sm mb-4'>
                            Adicionar Plano
                        </Button>
                    </Link>
                    
                    {plans.data.length === 0 ? (
                        <p className="text-neutral-600">Nenhum plano encontrado.</p>
                    ) : (
                        <ul className="flex flex-wrap gap-4 items-stretch">
                            {plans.data.map((plan) => {
                                const IconComponent = iconMap[plan.icon as IconName];

                                return (
                                    <li
                                    key={plan.id}
                                    className="border rounded-md p-4 shadow-sm flex flex-col justify-between w-full md:w-[calc(33.333%-1rem)]"
                                    >
                                    <div>
                                        <div className={`flex items-center gap-2 mb-4 ${plan.color}`}>
                                                    {IconComponent && <IconComponent className="w-5 h-5" />}
                                                    <h3 className="text-xl font-bold">{plan.name}</h3>
                                                </div>
                                        <p className="text-sm text-neutral-700">{plan.description}</p>
                                        <p className="text-sm text-neutral-500">
                                            Preço: R$ {Number(plan.value).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Link href={route('plans.edit', plan.id)}>
                                            <Button variant="outline">
                                                <Pencil/>
                                            </Button>
                                        </Link>

                                        <DeletePlan id={plan.id} />
                                    </div>
                                    </li>
                            )})}
                        </ul>
                    )}

                    {plans.per_page < plans.total && (
                        <div className="flex gap-2 mt-4">
                            {plans.links.map((link, index) => (
                                <Link key={index} href={link.url ?? ''} className={"..."}>
                                    {link.label.replace(/&laquo;|&raquo;/g, '').trim() || '...'}
                                </Link>
                            ))}
                        </div>
                    )}
            </IndexLayout>
        </AppLayout>
    );
}
