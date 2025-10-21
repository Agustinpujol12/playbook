// src/auth.ts

import NextAuth, { getServerSession } from 'next-auth';
import { authOptions } from './auth.config'; 
import { signIn as nextSignIn, signOut as nextSignOut } from 'next-auth/react';

// Handler para las rutas API (route.ts)
const { handlers } = NextAuth(authOptions); 
export { handlers };

// Funciones para el Server Side (Server Components)
export const auth = () => getServerSession(authOptions); 

// Funciones para el Client Side (componentes 'use client')
export const signIn = nextSignIn;
export const signOut = nextSignOut;