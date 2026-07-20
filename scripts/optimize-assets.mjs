import { existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");

const uiAssets = [
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_47 (1).png", "public/assets/ui/input_frame_default.webp"],
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_48 (2).png", "public/assets/ui/input_frame_focus.webp"],
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_48 (3).png", "public/assets/ui/input_frame_filled.webp"],
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_49 (4).png", "public/assets/ui/btn_primary_default.webp"],
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_50 (5).png", "public/assets/ui/btn_primary_hover.webp"],
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_51 (6).png", "public/assets/ui/btn_primary_pressed.webp"],
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_51 (7).png", "public/assets/ui/btn_primary_loading.webp"],
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_52 (8).png", "public/assets/ui/btn_secondary_default.webp"],
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_53 (9).png", "public/assets/ui/btn_secondary_hover.webp"],
  ["design/new/输入框和按钮底板/ChatGPT Image 2026年7月16日 19_19_53 (10).png", "public/assets/ui/btn_secondary_pressed.webp"],
];

const iconAssets = [
  ["design/new/左上角双骰图标.png", "public/assets/icons/icon_dice_pair.webp"],
  ["design/new/功能图标/ChatGPT Image 2026年7月16日 19_16_10 (1).png", "public/assets/icons/icon_history.webp"],
  ["design/new/功能图标/ChatGPT Image 2026年7月16日 19_16_10 (2).png", "public/assets/icons/icon_retry.webp"],
  ["design/new/功能图标/ChatGPT Image 2026年7月16日 19_16_11 (3).png", "public/assets/icons/icon_shuffle.webp"],
  ["design/new/功能图标/ChatGPT Image 2026年7月16日 19_16_12 (4).png", "public/assets/icons/icon_share.webp"],
  ["design/new/功能图标/ChatGPT Image 2026年7月16日 19_16_12 (5).png", "public/assets/icons/icon_back.webp"],
  ["design/new/功能图标/ChatGPT Image 2026年7月16日 19_16_13 (6).png", "public/assets/icons/icon_expand.webp"],
  ["design/new/功能图标/ChatGPT Image 2026年7月16日 19_16_14 (7).png", "public/assets/icons/icon_info.webp"],
  ["design/new/功能图标/ChatGPT Image 2026年7月16日 19_16_14 (8).png", "public/assets/icons/icon_close.webp"],
];

const diceAssets = [
  ["design/new/dice_ivory/ChatGPT Image 2026年7月16日 20_01_28 (1).png", "public/assets/dice/dice_ivory_1.webp"],
  ["design/new/dice_ivory/ChatGPT Image 2026年7月16日 20_01_28 (3).png", "public/assets/dice/dice_ivory_2.webp"],
  ["design/new/dice_ivory/ChatGPT Image 2026年7月16日 20_01_28 (2).png", "public/assets/dice/dice_ivory_3.webp"],
  ["design/new/dice_ivory/ChatGPT Image 2026年7月16日 20_01_28 (6).png", "public/assets/dice/dice_ivory_4.webp"],
  ["design/new/dice_ivory/ChatGPT Image 2026年7月16日 20_01_28 (4).png", "public/assets/dice/dice_ivory_5.webp"],
  ["design/new/dice_ivory/ChatGPT Image 2026年7月16日 20_01_28 (5).png", "public/assets/dice/dice_ivory_6.webp"],
  ["design/new/dice_red/ChatGPT Image 2026年7月17日 15_55_07 (6).png", "public/assets/dice/dice_red_1.webp"],
  ["design/new/dice_red/ChatGPT Image 2026年7月17日 15_55_07 (1).png", "public/assets/dice/dice_red_2.webp"],
  ["design/new/dice_red/ChatGPT Image 2026年7月17日 15_55_07 (2).png", "public/assets/dice/dice_red_3.webp"],
  ["design/new/dice_red/ChatGPT Image 2026年7月17日 15_55_07 (3).png", "public/assets/dice/dice_red_4.webp"],
  ["design/new/dice_red/ChatGPT Image 2026年7月17日 15_55_07 (5).png", "public/assets/dice/dice_red_5.webp"],
  ["design/new/dice_red/ChatGPT Image 2026年7月17日 15_55_07 (4).png", "public/assets/dice/dice_red_6.webp"],
];

const portraitAssets = [
  ["Portrait_logic.png", "logic.webp"],
  ["Portrait_encyclopedia.png", "encyclopedia.webp"],
  ["Portrait_rhetoric.png", "rhetoric.webp"],
  ["Portrait_drama_rank1.png", "drama.webp"],
  ["Portrait_conceptualization_rank1.png", "conceptualization.webp"],
  ["Portrait_visual-calculus_rank1.png", "visual-calculus.webp"],
  ["Portrait_volition (1).png", "volition.webp"],
  ["Portrait_inland-empire.png", "inland-empire.webp"],
  ["Portrait_empathy.png", "empathy.webp"],
  ["Portrait_authority.png", "authority.webp"],
  ["Portrait_esprit-de-Corps.png", "esprit-de-corps.webp"],
  ["Portrait_suggestion.png", "suggestion.webp"],
  ["Portrait_endurance.png", "endurance.webp"],
  ["Portrait_pain-threshold.png", "pain-threshold.webp"],
  ["Portrait_physical-instrument.png", "physical-instrument.webp"],
  ["Portrait_electrochemistry.png", "electrochemistry.webp"],
  ["Portrait_shivers.png", "shivers.webp"],
  ["Portrait_half-light.png", "half-light.webp"],
  ["Portrait_he_coordination.png", "hand-eye-coordination.webp"],
  ["Portrait_perception.png", "perception.webp"],
  ["Portrait_reaction.png", "reaction-speed.webp"],
  ["Portrait_savoir-faire.png", "savoir-faire.webp"],
  ["Portrait_interfacing.png", "interfacing.webp"],
  ["Portrait_composure.png", "composure.webp"],
].map(([source, output]) => [
  `design/new/Portrait/${source}`,
  `public/assets/skills/original/${output}`,
]);

function connectedDarkMask(pixels, width, height, threshold) {
  const count = width * height;
  const mask = new Uint8Array(count);
  const queue = new Int32Array(count);
  let head = 0;
  let tail = 0;

  const add = (index) => {
    if (mask[index]) return;
    const offset = index * 4;
    const brightness = Math.max(pixels[offset], pixels[offset + 1], pixels[offset + 2]);
    if (brightness > threshold) return;
    mask[index] = 1;
    queue[tail++] = index;
  };

  for (let x = 0; x < width; x += 1) {
    add(x);
    add((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    add(y * width);
    add(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    const y = (index - x) / width;
    if (x > 0) add(index - 1);
    if (x + 1 < width) add(index + 1);
    if (y > 0) add(index - width);
    if (y + 1 < height) add(index + width);
  }

  return mask;
}

function addTransparentBackground(pixels, width, height, low, high) {
  const lowMask = connectedDarkMask(pixels, width, height, low);
  const highMask = connectedDarkMask(pixels, width, height, high);
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let index = 0; index < width * height; index += 1) {
    const offset = index * 4;
    let alpha = pixels[offset + 3];
    if (lowMask[index]) {
      alpha = 0;
    } else if (highMask[index]) {
      const brightness = Math.max(pixels[offset], pixels[offset + 1], pixels[offset + 2]);
      alpha = Math.round(((brightness - low) / (high - low)) * alpha);
    }
    pixels[offset + 3] = Math.max(0, Math.min(255, alpha));

    if (pixels[offset + 3] > 6) {
      const x = index % width;
      const y = (index - x) / width;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < minX || maxY < minY) throw new Error("No foreground content remained");
  return { minX, minY, maxX, maxY };
}

async function optimizeTransparentAsset(sourcePath, outputPath, options) {
  const source = resolve(root, sourcePath);
  const output = resolve(root, outputPath);
  if (!existsSync(source)) throw new Error(`Missing source: ${sourcePath}`);

  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const bounds = addTransparentBackground(data, info.width, info.height, options.low, options.high);
  const left = Math.max(0, bounds.minX - options.padding);
  const top = Math.max(0, bounds.minY - options.padding);
  const right = Math.min(info.width - 1, bounds.maxX + options.padding);
  const bottom = Math.min(info.height - 1, bounds.maxY + options.padding);
  const width = right - left + 1;
  const height = bottom - top + 1;

  mkdirSync(dirname(output), { recursive: true });
  let pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).extract({ left, top, width, height });

  if (options.maxWidth && width > options.maxWidth) {
    pipeline = pipeline.resize({ width: options.maxWidth, withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality: options.quality, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(output);

  const metadata = await sharp(output).metadata();
  return {
    asset: outputPath,
    source: `${info.width}x${info.height}`,
    output: `${metadata.width}x${metadata.height}`,
    before: statSync(source).size,
    after: statSync(output).size,
  };
}

async function optimizePortrait(sourcePath, outputPath) {
  const source = resolve(root, sourcePath);
  const output = resolve(root, outputPath);
  if (!existsSync(source)) throw new Error(`Missing source: ${sourcePath}`);
  mkdirSync(dirname(output), { recursive: true });
  await sharp(source)
    .webp({ quality: 90, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(output);
  const sourceMeta = await sharp(source).metadata();
  const outputMeta = await sharp(output).metadata();
  return {
    asset: outputPath,
    source: `${sourceMeta.width}x${sourceMeta.height}`,
    output: `${outputMeta.width}x${outputMeta.height}`,
    before: statSync(source).size,
    after: statSync(output).size,
  };
}

const results = [];
for (const [source, output] of uiAssets) {
  results.push(await optimizeTransparentAsset(source, output, {
    low: 8,
    high: 32,
    padding: 8,
    maxWidth: output.includes("input_frame") ? 1320 : 720,
    quality: 88,
  }));
}
for (const [source, output] of diceAssets) {
  results.push(await optimizeTransparentAsset(source, output, {
    low: 30,
    high: 58,
    padding: 24,
    maxWidth: 384,
    quality: 88,
  }));
}
for (const [source, output] of iconAssets) {
  results.push(await optimizeTransparentAsset(source, output, {
    low: 8,
    high: 40,
    padding: 14,
    maxWidth: 192,
    quality: 90,
  }));
}
for (const [source, output] of portraitAssets) {
  results.push(await optimizePortrait(source, output));
}

const totalBefore = results.reduce((sum, item) => sum + item.before, 0);
const totalAfter = results.reduce((sum, item) => sum + item.after, 0);
const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

console.table(
  results.map(({ asset, source, output, before, after }) => ({
    asset,
    source,
    output,
    reduction: `${Math.round((1 - after / before) * 100)}%`,
  })),
);
console.log(`Optimized ${results.length} assets: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller).`);
