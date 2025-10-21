import type { Config } from "@react-router/dev/config";

// Bepaal de basispadnaam
const getBasename = (): string | undefined => {
  // Controleer of we in de 'production' omgeving zijn (d.w.z. na de build)
  // Vite stelt import.meta.env.PROD in op 'true' bij het bouwen voor productie
  if (import.meta.env.PROD) {
    // Voorbeeld: '/my-website' voor GitHub Pages
    return "/my-website"; 
  }
  
  // In development (npm run dev) of indien PROD false is, 
  // geven we 'undefined' terug, wat de basename uitschakelt (standaard is '/')
  return "/"; 
};

export default {
  // Config options...
  
  // Stel de basename dynamisch in
  basename: getBasename(),
  
  // We gebruiken ssr: false voor SPA mode, zoals in je originele config
  ssr: false, 
  
} satisfies Config;