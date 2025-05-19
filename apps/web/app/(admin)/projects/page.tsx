import { BreadcrumbsConsumer } from '@/consumers/breadcrumbsConsumer';
import { Breadcrumb } from '@/types/breadcrumbs';

const breadCrumbs: Breadcrumb[] = [{
  label: 'Projects',
  link: '/projects',
}];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <BreadcrumbsConsumer breadcrumbs={breadCrumbs} />
    </div>
  );
}
