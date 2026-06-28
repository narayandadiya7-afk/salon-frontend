'use client';

import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import apiUtil from '../../../../utils/api';
import { ApiOwnerSalon } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

export default function OwnerDashboardRedirect() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await apiUtil.get(ApiOwnerSalon);
        const code = res?.dataResponse?.returnCode;
        if (code === eResultCode.SUCCESS || code === eResultCode.CREATED) {
          const slug = res.data?.slug;
          if (slug) {
            router.replace(`/${slug}/owner/dashboard`);
            return;
          }
        }
      } catch {}
      router.replace('/owner/services');
    };
    redirect();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Spin size="large" />
    </div>
  );
}
