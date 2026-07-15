const fs = require('fs');
const files = [
  'src/app/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/products/page.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/layout/WhatsAppButton.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Replace <MessageCircle to <FaWhatsapp
  content = content.replace(/<MessageCircle/g, '<FaWhatsapp');
  
  // Remove MessageCircle from lucide-react imports
  content = content.replace(/,\s*MessageCircle/g, '');
  content = content.replace(/MessageCircle,\s*/g, '');
  content = content.replace(/{\s*MessageCircle\s*}/g, '{}');
  content = content.replace(/import\s*{\s*}\s*from\s*['"]lucide-react['"];\s*\n/g, '');
  
  // Add import { FaWhatsapp } from 'react-icons/fa'; if not present
  if (!content.includes('FaWhatsapp') || content.includes('<FaWhatsapp')) {
    if (content.includes('react-icons/fa')) {
       // if react-icons/fa is there, add FaWhatsapp to it
       content = content.replace(/import\s*{(.*?)}\s*from\s*['"]react-icons\/fa['"]/, (match, p1) => {
         if (!p1.includes('FaWhatsapp')) {
           return `import {${p1}, FaWhatsapp} from "react-icons/fa"`;
         }
         return match;
       });
    } else {
       // add import at top after other imports
       content = content.replace(/(import .*;\n)/, `$1import { FaWhatsapp } from "react-icons/fa";\n`);
    }
  }
  
  fs.writeFileSync(f, content);
});
console.log('Done');
