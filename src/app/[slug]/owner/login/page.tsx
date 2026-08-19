'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import { Surface } from '@/components/owner/owner-portal/primitives';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { notification } from '../../../../utils/notification';
import apiUtil from '../../../../utils/api';
import AuthUtil from '../../../../utils/auth';
import EncryptUtils from '../../../../utils/encrypt';
import { ApiAuthLogin } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

export default function PortalLoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const onFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const encryptedPassword = EncryptUtils.encrypt(password);
      const response = await apiUtil.post(ApiAuthLogin, {
        email,
        password: encryptedPassword,
        tenantSlug: slug,
      });

      const { dataResponse, data } = response || {};
      const returnCode = dataResponse?.returnCode;

      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        const token = data?.accessToken || data?.token;
        if (token) AuthUtil.setToken(token);
        const role = data?.user?.role;
        notification.success('Login successful!');
        if (role === 'SALON_OWNER' || role === 'SALON_STAFF') {
          router.push(`/${slug}/owner/dashboard`);
        } else {
          router.push(`/${slug}`);
        }
      } else {
        notification.error(dataResponse?.description || 'Invalid email or password.');
      }
    } catch {
      notification.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[400px] px-4 py-20">
      <Surface className="p-8">
        <div className="mb-8 text-center">
          <h1 className="text-display text-xl font-semibold">Owner Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your salon</p>
        </div>

        <form onSubmit={onFinish} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9"
              />
            </div>
          </div>

          <Button type="submit" variant="gold" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <a href={`/${slug}`} className="text-azure hover:underline">
            Back to salon website
          </a>
        </p>
      </Surface>
    </div>
  );
}
