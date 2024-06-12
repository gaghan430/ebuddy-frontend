import StoreProvider from '@/provider/store.provider';
import MuiTheme from '@/theme/mui';
import type { Metadata } from 'next';
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: 'Ebuddy Front',
  description: 'Ebuddy front site test',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <MuiTheme>
            <main className={styles.main}>
              {children}
            </main>
          </MuiTheme>
        </StoreProvider>
      </body>
    </html>
  );
}