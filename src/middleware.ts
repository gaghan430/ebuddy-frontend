import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyJwtToken } from './utils/auth';


const authRoutes = ['/dashboard/*'];

function matchesWildcard(path: string, pattern: string): boolean {
    if (pattern.endsWith('/*')) {
        const basePattern = pattern.slice(0, -2);
        return path.startsWith(basePattern);
    }
    return path === pattern;
}

export async function middleware(request: NextRequest) {
    const LOGIN = `${process.env.NEXT_PUBLIC_BASE_URL}?redirect=${request.nextUrl.pathname + request.nextUrl.search
        }`;

    if (authRoutes.some(pattern => matchesWildcard(request.nextUrl.pathname, pattern))) {
        const token = request.cookies.get('ebuddyToken');

        if (!token) {
            return NextResponse.redirect(LOGIN);
        }

        try {
            const payload = await verifyJwtToken(token.value);

            if (!payload) {
                // Delete token
                request.cookies.delete('ebuddyToken');
                return NextResponse.redirect(LOGIN);
            }
        } catch (error) {
            // Delete token
            request.cookies.delete('ebuddyToken');
            return NextResponse.redirect(LOGIN);
        }
    }

    let redirectToApp = false;
    // Redirect login to app if already logged in
    if (request.nextUrl.pathname === '/') {
        const token = request.cookies.get('ebuddyToken');

        if (token) {
            try {
                const payload = await verifyJwtToken(token.value);

                if (payload) {
                    redirectToApp = true;
                } else {
                    // Delete token
                    request.cookies.delete('ebuddyToken');
                }
            } catch (error) {
                // Delete token
                request.cookies.delete('ebuddyToken');
            }
        }
    }

    if (redirectToApp) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
    } else {
        return NextResponse.next();
    }
}