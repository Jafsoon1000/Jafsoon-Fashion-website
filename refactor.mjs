import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'frontend/src/pages');
const srcDir = path.join(__dirname, 'frontend/src');

const map = {
  Auth: ['Login.jsx', 'Register.jsx', 'VerifyPhone.jsx', 'Profile.jsx'],
  Admin: ['AdminDashboard.jsx', 'AdminOrders.jsx', 'AdminProducts.jsx', 'AdminUsers.jsx'],
  Shop: ['Shop.jsx', 'ProductDetails.jsx', 'Cart.jsx', 'Checkout.jsx', 'OrderSuccess.jsx', 'Wishlist.jsx', 'Categories.jsx', 'Lookbook.jsx'],
  Static: ['Home.jsx', 'About.jsx', 'Contact.jsx', 'Blog.jsx', 'NotFound.jsx']
};

// 1. Create directories and Move
for (const [folder, files] of Object.entries(map)) {
  const dirPath = path.join(pagesDir, folder);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  for (const file of files) {
    const oldPath = path.join(pagesDir, file);
    const newPath = path.join(dirPath, file);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
    }
  }
}

// 2. Refactor all files in src recursively
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      if(file.endsWith('.jsx') || file.endsWith('.js')) results.push(file);
    }
  });
  return results;
}

const allFiles = getFiles(srcDir);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // App.jsx mappings
  if (file.includes('App.jsx')) {
      for (const [folder, files] of Object.entries(map)) {
          for(const f of files) {
              const name = f.replace('.jsx', '');
              content = content.replace(`from "./pages/${name}"`, `from "./pages/${folder}/${name}"`);
          }
      }
      content = content.replace(/from "\.\/context/g, 'from "./store');
  }

  // If the file is inside a new nested pages directory
  if (file.includes(path.join('pages', 'Auth')) || 
      file.includes(path.join('pages', 'Admin')) || 
      file.includes(path.join('pages', 'Shop')) || 
      file.includes(path.join('pages', 'Static'))) {
      
      content = content.replace(/from "\.\.\/components/g, 'from "../../components');
      content = content.replace(/from "\.\.\/context/g, 'from "../../store');
  } else if (file.includes('components')) {
      content = content.replace(/from "\.\.\/context/g, 'from "../store');
  }

  // Refactor Context -> Store imports globally
  content = content.replace(/import\s*\{\s*useAuth\s*\}\s*from\s*['"].*AuthContext['"];?/g, 'import { useAuthStore } from "path-placeholder/useAuthStore";');
  content = content.replace(/import\s*\{\s*useCart\s*\}\s*from\s*['"].*CartContext['"];?/g, 'import { useCartStore } from "path-placeholder/useCartStore";');
  content = content.replace(/import\s*\{\s*useWishlist\s*\}\s*from\s*['"].*WishlistContext['"];?/g, 'import { useWishlistStore } from "path-placeholder/useWishlistStore";');
  content = content.replace(/import\s*\{\s*useTheme\s*\}\s*from\s*['"].*ThemeContext['"];?/g, 'import { useThemeStore } from "path-placeholder/useThemeStore";');

  // Fix path-placeholder
  let depthPath = '../store';
  if (file.includes(path.join('pages', 'Auth')) || 
      file.includes(path.join('pages', 'Admin')) || 
      file.includes(path.join('pages', 'Shop')) || 
      file.includes(path.join('pages', 'Static'))) {
      depthPath = '../../store';
  } else if (file.includes('App.jsx') || file.includes('main.jsx')) {
      depthPath = './store';
  }
  content = content.replace(/path-placeholder/g, depthPath);

  // Replace usage
  content = content.replace(/useAuth\(\)/g, 'useAuthStore()');
  content = content.replace(/useCart\(\)/g, 'useCartStore()');
  content = content.replace(/useWishlist\(\)/g, 'useWishlistStore()');
  content = content.replace(/useTheme\(\)/g, 'useThemeStore()');

  fs.writeFileSync(file, content);
});

// Remove context folder
if (fs.existsSync(path.join(srcDir, 'context'))) {
  fs.rmSync(path.join(srcDir, 'context'), { recursive: true, force: true });
}
console.log("Refactoring complete");
