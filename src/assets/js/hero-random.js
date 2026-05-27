(function () {
  var img = document.getElementById('hero-bg');
  if (!img) return;

  var lang = document.documentElement.lang || 'en';

  var heroes = [
    {
      src: '/images/hero/teng_ko_weng___a_plentiful_harvest___16x20___acrylic.webp',
      en: 'A Plentiful Harvest\u00a0\u00b7\u00a0Acrylic',
      zh: 'A Plentiful Harvest\u00a0\u00b7\u00a0Acrylic'
    },
    {
      src: '/images/hero/teng_ko_weng___be_of_one_mind___同心合意.webp',
      en: 'Be of One Mind',
      zh: '同心合意'
    },
    {
      src: '/images/hero/teng_ko_weng___carry_the_cross___揹十字架______116.70x90.90cm___acrylic.webp',
      en: 'Carry the Cross\u00a0\u00b7\u00a0Acrylic',
      zh: '揹十字架\u00a0\u00b7\u00a0壓克力'
    },
    {
      src: '/images/hero/teng_ko_weng___cornerstones___房角石.webp',
      en: 'Cornerstones',
      zh: '房角石'
    },
    {
      src: '/images/hero/teng_ko_weng___crown_of_thorn.webp',
      en: 'Crown of Thorn',
      zh: 'Crown of Thorn'
    },
    {
      src: '/images/hero/teng_ko_weng___cup_overflows___福杯滿溢___30x30___oil.webp',
      en: 'Cup Overflows\u00a0\u00b7\u00a0Oil',
      zh: '福杯滿溢\u00a0\u00b7\u00a0油畫'
    },
    {
      src: '/images/hero/teng_ko_weng___dragon_boat_festival_food___端節美食___oil.webp',
      en: 'Dragon Boat Festival Food\u00a0\u00b7\u00a0Oil',
      zh: '端節美食\u00a0\u00b7\u00a0油畫'
    },
    {
      src: '/images/hero/teng_ko_weng___light_of_the_world___39x31.5___acrylic.webp',
      en: 'Light of the World\u00a0\u00b7\u00a0Acrylic',
      zh: 'Light of the World\u00a0\u00b7\u00a0Acrylic'
    },
    {
      src: '/images/hero/teng_ko_weng___love_follows___愛相隨___16x20___acrylic.webp',
      en: 'Love Follows\u00a0\u00b7\u00a0Acrylic',
      zh: '愛相隨\u00a0\u00b7\u00a0壓克力'
    },
    {
      src: '/images/hero/teng_ko_weng___prayer___祈求___91.30x72.80cm___acrylic.webp',
      en: 'Prayer\u00a0\u00b7\u00a0Acrylic',
      zh: '祈求\u00a0\u00b7\u00a0壓克力'
    },
    {
      src: '/images/hero/teng_ko_weng___the_aples_of_my_eye___30x30___acrylic.webp',
      en: 'The Apples of My Eye\u00a0\u00b7\u00a0Acrylic',
      zh: 'The Apples of My Eye\u00a0\u00b7\u00a0Acrylic'
    }
  ];

  var pick = heroes[Math.floor(Math.random() * heroes.length)];
  img.src = pick.src;

  var cap = document.getElementById('hero-cap');
  if (cap) cap.textContent = lang === 'zh' ? pick.zh : pick.en;
})();
