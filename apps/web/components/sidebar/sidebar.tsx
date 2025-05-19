'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@repo/ui/components/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProjectSwitcher } from '@/components/projectSwitcher';
import { useAppSelector } from '@/redux/hooks';
import { currentProjects, currentSelectedProject } from '@/redux/slices/projectSlice';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          isActive: true,
        },
      ],
    },
    {
      title: 'Workspace',
      url: '#',
      items: [
        {
          title: 'Settings',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Admin',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const projects = useAppSelector(currentProjects);
  const selectedProject = useAppSelector(currentSelectedProject);
  const pathname = usePathname();
  // TODO : This is only a temp solution to get the active path, fix this later
  const activePath = `/${pathname.split('/')[3]}`;

  const getProjectUrl = (baseUrl: string) => {
    if (!selectedProject) return baseUrl;
    return `/projects/${selectedProject.identifier}${baseUrl}`;
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Sidebar {...props}>
      <SidebarHeader>
        <ProjectSwitcher
          projects={projects}
        />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((itm) => (
                  <SidebarMenuItem key={itm.title}>
                    <SidebarMenuButton asChild isActive={itm.url === activePath}>
                      <Link href={getProjectUrl(itm.url)}>{itm.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
