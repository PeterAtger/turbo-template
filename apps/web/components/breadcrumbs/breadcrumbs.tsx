'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';
import { useAppSelector } from '@/redux/hooks';

export function Breadcrumbs() {
  const breadcrumbs = useAppSelector((state) => state.config.breadcrumbs);

  if (!breadcrumbs) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={crumb.link}>
                {crumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index + 1 < breadcrumbs.length && <BreadcrumbSeparator className="hidden md:block" /> }
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
