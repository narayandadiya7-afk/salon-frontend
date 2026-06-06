'use client';

import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import './Breadcrumbs.css';

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pathSnippets = pathname.split('/').filter((i) => i);

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      onClick: () => router.push('/admin/dashboard'),
      className: 'breadcrumb-home',
    },
    ...pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const isLast = index === pathSnippets.length - 1;
      const label = snippet
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        title: label,
        onClick: !isLast ? () => router.push(url) : undefined,
        className: isLast ? 'breadcrumb-current' : 'breadcrumb-link',
      };
    }),
  ];

  return (
    <div className="breadcrumbs-container">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumbs;
