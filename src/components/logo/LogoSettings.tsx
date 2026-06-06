'use client';

import React, { useState } from 'react';
import { Form, Upload, Button, message } from 'antd';
import { UploadOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import styles from './LogoSettings.module.css';

interface LogoSettingsProps {
  onCloseDrawer: () => void;
  onSuccess: () => void;
}

const LogoSettings: React.FC<LogoSettingsProps> = ({ onCloseDrawer, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [smallLogoFile, setSmallLogoFile] = useState<UploadFile[]>([]);
  const [largeLogoFile, setLargeLogoFile] = useState<UploadFile[]>([]);

  const currentSmallLogo = typeof window !== 'undefined' ? localStorage.getItem('app-logo-small') : null;
  const currentLargeLogo = typeof window !== 'undefined' ? localStorage.getItem('app-logo-large') : null;

  const handleImageUpload = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onFinish = async () => {
    try {
      setLoading(true);
      if (smallLogoFile.length > 0 && smallLogoFile[0].originFileObj) {
        const base64 = await handleImageUpload(smallLogoFile[0].originFileObj);
        localStorage.setItem('app-logo-small', base64);
      }
      if (largeLogoFile.length > 0 && largeLogoFile[0].originFileObj) {
        const base64 = await handleImageUpload(largeLogoFile[0].originFileObj);
        localStorage.setItem('app-logo-large', base64);
      }
      message.success('Logos updated successfully!');
      onSuccess();
      setTimeout(() => onCloseDrawer(), 500);
    } catch {
      message.error('Failed to update logos');
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      message.error('You can only upload image files!');
      return false;
    }
    if (file.size / 1024 / 1024 >= 2) {
      message.error('Image must be smaller than 2MB!');
      return false;
    }
    return false; // prevent auto upload
  };

  const handleReset = () => {
    localStorage.removeItem('app-logo-small');
    localStorage.removeItem('app-logo-large');
    setSmallLogoFile([]);
    setLargeLogoFile([]);
    message.success('Logos reset to default!');
    onSuccess();
    setTimeout(() => onCloseDrawer(), 500);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Form
        form={form}
        name="logoSettings"
        onFinish={onFinish}
        layout="vertical"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 4, marginBottom: 16 }}>
          {/* Small Logo */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Small Logo (Collapsed Sidebar)</h3>
            <p className={styles.sectionDesc}>Recommended: Square image, 40x40px or larger</p>
            {currentSmallLogo && (
              <div className={styles.currentLogo}>
                <img src={currentSmallLogo} alt="Current small logo" className={styles.smallPreview} />
                <span className={styles.currentLabel}>Current Logo</span>
              </div>
            )}
            <Form.Item name="smallLogo">
              <Upload
                listType="picture"
                fileList={smallLogoFile}
                beforeUpload={beforeUpload}
                onChange={({ fileList }) => setSmallLogoFile(fileList)}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item>
          </div>

          {/* Large Logo */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Large Logo (Expanded Sidebar)</h3>
            <p className={styles.sectionDesc}>Recommended: Horizontal layout, text/logo combination</p>
            {currentLargeLogo && (
              <div className={styles.currentLogo}>
                <img src={currentLargeLogo} alt="Current large logo" className={styles.largePreview} />
                <span className={styles.currentLabel}>Current Logo</span>
              </div>
            )}
            <Form.Item name="largeLogo">
              <Upload
                listType="picture"
                fileList={largeLogoFile}
                beforeUpload={beforeUpload}
                onChange={({ fileList }) => setLargeLogoFile(fileList)}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item>
          </div>

          <div className={styles.resetSection}>
            <Button type="link" danger onClick={handleReset}>
              Reset to Default Logos
            </Button>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--theme-border-light)',
          paddingTop: 16,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
          flexShrink: 0,
        }}>
          <Button icon={<CloseOutlined />} onClick={onCloseDrawer} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
            disabled={smallLogoFile.length === 0 && largeLogoFile.length === 0}
          >
            {loading ? 'Saving...' : 'Save Logos'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LogoSettings;
