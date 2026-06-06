'use client';

import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Typography } from 'antd';
import apiUtil from '../../utils/api';
import { ApiAuthProfile } from '../../utils/api.constant';
import { eResultCode } from '../../utils/enum';

export default function AccountPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const response = await apiUtil.get(ApiAuthProfile);
      const returnCode = response?.dataResponse?.returnCode;
      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        setProfile(response.data);
      }
    };
    load();
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: '0 auto' }}>
      <Typography.Title level={2}>My Account</Typography.Title>
      <Card>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Name">{profile?.name || '-'}</Descriptions.Item>
          <Descriptions.Item label="Email">{profile?.email || '-'}</Descriptions.Item>
          <Descriptions.Item label="Role">{profile?.role || '-'}</Descriptions.Item>
          <Descriptions.Item label="Tenant">{profile?.tenant?.name || profile?.salon?.name || '-'}</Descriptions.Item>
        </Descriptions>
      </Card>
    </main>
  );
}
