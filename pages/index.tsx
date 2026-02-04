import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import api from '../src/utils/api';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        await api.get('/api/auth/getMe');
        router.replace('/dashboard');
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Home;
