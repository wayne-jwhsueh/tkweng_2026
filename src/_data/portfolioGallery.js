const fs = require("node:fs");
const path = require("node:path");
const { imageSize } = require("image-size");
const legacyMeta = require("./portfolioLegacyMeta.json");

const legacyZhTitleMap = {
  realism: {
    R0001: "豐足甜果",
    R0002: "茶香果甜",
    R0003: "無題",
    R0004: "喜出望外",
    R0005: "富貴逢圓",
    R0006: "樂河的水",
    R0007: "智慧的泉源",
    R0008: "產業",
    R0009: "新歌與讚美",
    R0010: "美恩路徑",
    R0011: "生命的道路",
    R0012: "座位",
    R0013: "晨光",
    R0014: "安歇水邊",
    R0015: "天地映情",
    R0016: "以馬內利",
    R0017: "道路",
    R0018: "日出",
    R0019: "端節美食",
    R0020: "魚和餅",
    R0021: "餅和杯",
    R0022: "古情蜜萄",
    R0023: "眼中瞳仁",
    R0024: "豐盛",
    R0025: "五餅二魚",
    R0026: "愛相隨",
    R0027: "福杯滿溢",
    R0028: "同心合意",
    R0029: "房角石",
    R0030: "精神食糧",
    R0031: "葡萄",
    R0032: "外婆",
    R0033: "鄰家女孩",
    R0034: "(畫家)愛妻",
    R0035: "房角石",
    R0036: "盼望的光"
  },
  abstract: {
    A0001: "太初",
    A0002: "我必與你同在",
    A0003: "天空的厚雲",
    A0004: "恩典",
    A0005: "諸天述說",
    A0006: "海的衣服",
    A0007: "磐石流出活水",
    A0008: "遮蓋",
    A0009: "花和草",
    A0010: "花",
    A0011: "花園裡",
    A0012: "浪子",
    A0013: "祈禱",
    A0014: "揹十字架",
    A0015: "彼此洗腳",
    A0016: "世界的光",
    A0017: "穿越黑暗",
    A0018: "水鳥",
    A0019: "祈求",
    A0020: "重生",
    A0021: "秋色",
    A0022: "生命火窯",
    A0023: "海的污染",
    A0024: "客西馬尼園的祈禱",
    A0025: "救贖",
    A0026: "永不衰殘的榮耀冠冕",
    A0027: "鞭傷",
    A0028: "失落",
    A0029: "十字架",
    A0030: "背負十字架",
    A0031: "溫暖的擁抱",
    A0032: "疑惑",
    A0033: "地球暖化(這個世界將要過去)",
    A0034: "內心的波浪"
  }
};

const PORTFOLIO_ROOT = path.join(process.cwd(), "public", "images", "portfolio");

// Images excluded from every image randomizer on the site (hero, portfolio
// hub thumbs, about inspiration parallax) — still shown in the full gallery listings.
const RANDOM_EXCLUDE_IDS = new Set([
  "R0032",
  "R0033",
  "R0034",
  "A0031",
  "A0028",
  "A0009",
  "A0004",
  "A0005",
  "A0006"
]);

function fileId(fileName) {
  return path.parse(fileName).name.toUpperCase();
}

function sortByFileName(files) {
  return files.sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }));
}

function parseDescription(description, fallbackTitle) {
  const parts = String(description || "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  const title = parts[0] || fallbackTitle;
  const tail = parts.slice(1);

  let year = "";
  let size = "";
  let medium = "";

  tail.forEach((token) => {
    if (!year && /^\d{4}$/.test(token)) {
      year = token;
      return;
    }

    if (!size && /(x|cm|"|\d+f$|\d+p$)/i.test(token)) {
      size = token;
      return;
    }

    if (!medium) {
      medium = token;
    }
  });

  return {
    title,
    year,
    size,
    medium
  };
}

function loadCategory(category, labels) {
  const categoryDir = path.join(PORTFOLIO_ROOT, category);
  const thumbsDir = path.join(categoryDir, "thumbs");
  const categoryMeta = legacyMeta[category] || {};
  const zhTitles = legacyZhTitleMap[category] || {};

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const imageFiles = sortByFileName(
    fs
      .readdirSync(categoryDir)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
  );

  return imageFiles.map((fileName, index) => {
    const thumbFileName = `${path.parse(fileName).name}.webp`;
    const thumbPath = path.join(thumbsDir, thumbFileName);
    const hasThumb = fs.existsSync(thumbPath);
    const id = fileId(fileName);
    const meta = categoryMeta[id] || {};
    const details = parseDescription(meta.description, `${labels.en} ${String(index + 1).padStart(2, "0")}`);
    const sequence = String(index + 1).padStart(2, "0");
    const zhTitle = zhTitles[id] || details.title || `${labels.zh} ${sequence}`;

     let imgWidth = 0;
     let imgHeight = 0;
     try {
       const buf = fs.readFileSync(path.join(categoryDir, fileName));
       const dims = imageSize(buf);
       imgWidth = dims.width || 0;
       imgHeight = dims.height || 0;
     } catch (_) {
       // unreadable or unsupported format – PhotoSwipe will skip the zoom animation
     }

     return {
       id,
       src: `/images/portfolio/${category}/${fileName}`,
       thumb: hasThumb
         ? `/images/portfolio/${category}/thumbs/${thumbFileName}`
         : `/images/portfolio/${category}/${fileName}`,
      titleEn: details.title || `${labels.en} ${sequence}`,
      titleZh: zhTitle,
      year: details.year,
      size: details.size,
      medium: details.medium,
      legacyDescription: meta.description || "",
      descEn: meta.descEn || "",
      descZh: meta.descZh || "",
      saleStatus: meta.saleStatus || "N",
      width: imgWidth,
      height: imgHeight
    };
  });
}

// Builds an id -> description lookup containing only artworks that have one,
// so the emitted per-page JSON stays small and templates need no conditional logic.
function buildDescMap(items, field) {
  const map = {};
  items.forEach((art) => {
    if (art[field]) map[art.id] = art[field];
  });
  return map;
}

const realism = loadCategory("realism", { en: "Realism", zh: "寫實" });
const abstract = loadCategory("abstract", { en: "Abstract", zh: "抽象" });

module.exports = {
  realism,
  abstract,
  realismForRandom: realism.filter((art) => !RANDOM_EXCLUDE_IDS.has(art.id)),
  abstractForRandom: abstract.filter((art) => !RANDOM_EXCLUDE_IDS.has(art.id)),
  realismDescEn: buildDescMap(realism, "descEn"),
  realismDescZh: buildDescMap(realism, "descZh"),
  abstractDescEn: buildDescMap(abstract, "descEn"),
  abstractDescZh: buildDescMap(abstract, "descZh")
};
