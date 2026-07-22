import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "design/ChatGPT Image 2026年7月10日 15_57_21 (1).png");

const titleAssets = [
  {
    output: "public/assets/titles/home_title.webp",
    crop: { left: 105, top: 136, width: 700, height: 142 },
    low: 46,
    high: 152,
  },
  {
    output: "public/assets/titles/home_subtitle.webp",
    crop: { left: 106, top: 300, width: 560, height: 38 },
    low: 28,
    high: 122,
  },
];

const smoothstep = (value) => value * value * (3 - 2 * value);

async function extractTextAsset({ output: outputPath, crop, low, high }) {
  const { data, info } = await sharp(source)
    .extract(crop)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 0; index < info.width * info.height; index += 1) {
    const offset = index * 4;
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
    const normalized = Math.max(0, Math.min(1, (luminance - low) / (high - low)));
    data[offset + 3] = Math.round(255 * smoothstep(normalized));
  }

  const output = resolve(root, outputPath);
  mkdirSync(dirname(output), { recursive: true });
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 2 })
    .extend({ top: 4, right: 4, bottom: 4, left: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 94, alphaQuality: 100, effort: 6 })
    .toFile(output);

  const metadata = await sharp(output).metadata();
  console.log(`${outputPath}: ${metadata.width}x${metadata.height}`);
}

for (const asset of titleAssets) {
  await extractTextAsset(asset);
}
