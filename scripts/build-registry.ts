import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { components } from "./registry-config.js";

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "public", "registry");

// Ensure output directory exists
if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
}

// Transform the source code for registry distribution:
// 1. Replace @/lib/cn with @/lib/utils (standard convention)
// 2. For Table: remove @/store/token-store import and add density prop
function transformSource(content: string, name: string): string {
  // Replace import path for cn utility
  let transformed = content.replace(
    /import\s*{\s*cn\s*}\s*from\s*["']@\/lib\/cn["']/g,
    'import { cn } from "@/lib/utils"'
  );

  // For Table component: replace store-based density with a prop
  if (name === "table") {
    // Remove the store import
    transformed = transformed.replace(
      /import\s*{\s*useTokenStore\s*}\s*from\s*["']@\/store\/token-store["']\n?/g,
      ""
    );
    // Replace the store usage with a prop default
    transformed = transformed.replace(
      /const\s+density\s*=\s*useTokenStore\(\s*\(s\)\s*=>\s*s\.density\s*\)/g,
      '// density can be passed as a prop or default to "comfortable"\n  // To make this dynamic, wrap with your own context/store'
    );
    // Add density to the destructured props (after emptyMessage)
    transformed = transformed.replace(
      /emptyMessage\s*=\s*"No data"/,
      'emptyMessage = "No data",\n  density = "comfortable" as "compact" | "comfortable" | "spacious"'
    );
  }

  return transformed;
}

// Build individual component manifests
console.log("Building component registry...\n");

for (const comp of components) {
  const files = comp.files.map((f) => {
    const srcPath = join(ROOT, f.src);
    const raw = readFileSync(srcPath, "utf-8");
    const content = transformSource(raw, comp.name);
    return { path: f.dest, content };
  });

  const manifest = {
    name: comp.name,
    type: "component",
    description: comp.description,
    dependencies: comp.dependencies,
    peerDependencies: comp.peerDependencies,
    devDependencies: [] as string[],
    internalDependencies: comp.internalDependencies,
    files,
  };

  const outPath = join(OUT_DIR, `${comp.name}.json`);
  writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`  ✓ ${comp.name}.json`);
}

// Build master index
const index = {
  components: components.map((c) => ({
    name: c.name,
    description: c.description,
    dependencies: c.dependencies,
    internalDependencies: c.internalDependencies,
  })),
};

const indexPath = join(OUT_DIR, "index.json");
writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n");
console.log(`\n  ✓ index.json (${components.length} components)\n`);
console.log("Registry built successfully.");
