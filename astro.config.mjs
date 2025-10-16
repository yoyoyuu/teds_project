// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), db()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});