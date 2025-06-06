import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { type PropsWithChildren } from 'react';

export default function IndexLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="px-4 py-6">
            <Heading title="Meus Agendamentos" description="Visualize seus agendamentos" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    {/* {children}
                    <section className="max-w-xl space-y-12">{children}</section> */}
                </div>
            </div>
            {children}
        </div>
    );
}
