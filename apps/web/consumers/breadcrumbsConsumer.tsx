'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setBreadcrumbs } from '@/redux/slices/configSlice';
import { Breadcrumb } from '@/types/breadcrumbs';

type BreadcrumbsProps = {
  breadcrumbs?: Breadcrumb[];
};

export function BreadcrumbsConsumer({ breadcrumbs }: BreadcrumbsProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (breadcrumbs) {
      dispatch(setBreadcrumbs(breadcrumbs));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
