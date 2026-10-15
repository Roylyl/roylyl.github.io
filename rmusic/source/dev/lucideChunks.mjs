import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// Keep the UI's named imports separate from the full, optional theme-icon set.
// Read the installed package's aliases so names such as ListMusic stay accurate
// across lucide updates without maintaining a second icon list by hand.
export function createLucideChunkSelector(sourceRoot) {
    const usedNames = new Set();
    const visit = directory => {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            const file = path.join(directory, entry.name);
            if (entry.isDirectory()) visit(file);
            else if (/\.[cm]?[jt]sx?$/.test(entry.name)) {
                const source = fs.readFileSync(file, 'utf8');
                for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g)) {
                    for (const name of match[1].split(',')) {
                        const binding = name.trim();
                        if (!binding.startsWith('type ')) usedNames.add(binding.split(/\s+/)[0]);
                    }
                }
            }
        }
    };
    visit(sourceRoot);
    const require = createRequire(import.meta.url);
    const esmRoot = path.resolve(path.dirname(require.resolve('lucide-react')), '../esm');
    const exports = fs.readFileSync(path.join(esmRoot, 'lucide-react.mjs'), 'utf8');
    const uiFiles = new Set();
    for (const match of exports.matchAll(/export\s*\{([^}]+)\}\s*from\s*['"]\.\/icons\/([^'"]+)['"]/g)) {
        const aliases = [...match[1].matchAll(/\bas\s+(\w+)/g)].map(alias => alias[1]);
        if (aliases.some(alias => usedNames.has(alias))) uiFiles.add(match[2]);
    }
    return id => {
        if (!id.includes('/node_modules/') || !id.includes('/lucide-react/')) return;
        if (id.includes('dynamicIconImports') || id.includes('/DynamicIcon.')) return 'optional-icons';
        const icon = id.match(/\/icons\/([^/?]+)$/)?.[1];
        return icon && icon !== 'index.mjs' && !uiFiles.has(icon) ? 'optional-icons' : 'icons';
    };
}
