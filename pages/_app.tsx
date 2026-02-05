import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import theme from '@/theme/themeConfig';
import AppLayout from '@/components/Layout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <ConfigProvider theme={theme}>
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      )}
    </ConfigProvider>
  );
}
