'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, Typography } from 'antd';
import apiUtil from '../../../utils/api';
import { ApiSuperAdminTenants } from '../../../utils/api.constant';
import { eResultCode } from '../../../utils/enum';

export default function SuperAdminTenantsPage() {
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await apiUtil.get(ApiSuperAdminTenants);
      const returnCode = response?.dataResponse?.returnCode;
      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        setTenants(response.data?.salons || response.data || []);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <Typography.Title level={2}>Tenants</Typography.Title>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={tenants}
        columns={[
          { title: 'Salon', dataIndex: 'name' },
          { title: 'Slug', dataIndex: 'slug' },
          { title: 'Owner', render: (_, row) => row.owner?.email || row.owner?.name || '-' },
          { title: 'Plan', dataIndex: 'planType' },
          {
            title: 'Status',
            dataIndex: 'subscriptionStatus',
            render: (value) => <Tag color={value === 'ACTIVE' ? 'green' : value === 'SUSPENDED' ? 'red' : 'blue'}>{value}</Tag>,
          },
          {
            title: 'Actions',
            render: () => (
              <Button size="small" disabled>
                Manage
              </Button>
            ),
          },
        ]}
      />
    </main>
  );
}
