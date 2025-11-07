import { AuthProvider } from '@/context/AuthContext';
import AppLayout from '@/components/AppLayout';

export default function AppPagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AppLayout>{children}</AppLayout>
        </AuthProvider>
    );
}
