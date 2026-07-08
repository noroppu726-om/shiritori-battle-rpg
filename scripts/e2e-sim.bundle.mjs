// src/data/enemies.ts
var STAGE_1_ENEMY = {
  name: "\u3053\u3068\u3070\u30B9\u30E9\u30A4\u30E0",
  maxHp: 20,
  attack: 3,
  description: "\u6700\u521D\u306B\u51FA\u4F1A\u3046\u5C0F\u3055\u306A\u3053\u3068\u3070\u30E2\u30F3\u30B9\u30BF\u30FC",
  icon: "\u{1F7E2}"
};
var ENEMIES = [
  STAGE_1_ENEMY,
  {
    name: "\u3082\u3058\u30B4\u30D6\u30EA\u30F3",
    maxHp: 30,
    attack: 4,
    description: "\u77ED\u3044\u8A00\u8449\u3067\u653B\u3081\u3066\u304F\u308B\u3044\u305F\u305A\u3089\u597D\u304D",
    icon: "\u{1F47A}"
  },
  {
    name: "\u304B\u306A\u30C9\u30E9\u30AD\u30FC",
    maxHp: 40,
    attack: 5,
    description: "\u7A7A\u304B\u3089\u8A00\u8449\u3092\u596A\u3046\u3059\u3070\u3057\u3063\u3053\u3044\u6575",
    icon: "\u{1F987}"
  },
  {
    name: "\u3057\u308A\u3068\u308A\u30CA\u30A4\u30C8",
    maxHp: 55,
    attack: 6,
    description: "\u3057\u308A\u3068\u308A\u306E\u639F\u3092\u5B88\u308B\u5F37\u6575",
    icon: "\u{1F6E1}\uFE0F"
  },
  {
    name: "\u3053\u3068\u3070\u30C9\u30E9\u30B4\u30F3",
    maxHp: 75,
    attack: 8,
    description: "\u3053\u3068\u3070\u306E\u738B\u56FD\u3092\u6C88\u9ED9\u3055\u305B\u305F\u6700\u5F8C\u306E\u30DC\u30B9",
    icon: "\u{1F409}"
  }
];

// src/data/words.ts
var WORDS = [
  // animal
  { word: "ねこ", category: "animal" },
  { word: "いぬ", category: "animal" },
  { word: "うさぎ", category: "animal" },
  { word: "きつね", category: "animal" },
  { word: "たぬき", category: "animal" },
  { word: "こあら", category: "animal" },
  { word: "らくだ", category: "animal" },
  { word: "ごりら", category: "animal" },
  { word: "しまうま", category: "animal" },
  { word: "かえる", category: "animal" },
  { word: "とかげ", category: "animal" },
  { word: "くじら", category: "animal" },
  { word: "いるか", category: "animal" },
  { word: "めだか", category: "animal" },
  { word: "ひつじ", category: "animal" },
  { word: "やぎ", category: "animal" },
  { word: "すずめ", category: "animal" },
  { word: "つばめ", category: "animal" },
  { word: "あり", category: "animal" },
  { word: "ほたる", category: "animal" },
  { word: "ろば", category: "animal" },
  { word: "うま", category: "animal" },
  { word: "うし", category: "animal" },
  { word: "ぶた", category: "animal" },
  { word: "にわとり", category: "animal" },
  { word: "かも", category: "animal" },
  { word: "あひる", category: "animal" },
  { word: "からす", category: "animal" },
  { word: "はと", category: "animal" },
  { word: "わし", category: "animal" },
  { word: "たか", category: "animal" },
  { word: "ふくろう", category: "animal" },
  { word: "かもめ", category: "animal" },
  { word: "さぎ", category: "animal" },
  { word: "つる", category: "animal" },
  { word: "きじ", category: "animal" },
  { word: "うぐいす", category: "animal" },
  { word: "ひばり", category: "animal" },
  { word: "とんび", category: "animal" },
  { word: "こうもり", category: "animal" },
  { word: "ねずみ", category: "animal" },
  { word: "りす", category: "animal" },
  { word: "しか", category: "animal" },
  { word: "くま", category: "animal" },
  { word: "さる", category: "animal" },
  { word: "いのしし", category: "animal" },
  { word: "おおかみ", category: "animal" },
  { word: "いたち", category: "animal" },
  { word: "かわうそ", category: "animal" },
  { word: "あらいぐま", category: "animal" },
  { word: "はむすたあ", category: "animal" },
  { word: "もるもっと", category: "animal" },
  { word: "もぐら", category: "animal" },
  { word: "はりねずみ", category: "animal" },
  { word: "かば", category: "animal" },
  { word: "さい", category: "animal" },
  { word: "ぞう", category: "animal" },
  { word: "ひょう", category: "animal" },
  { word: "とら", category: "animal" },
  { word: "ちいたあ", category: "animal" },
  { word: "やまあらし", category: "animal" },
  { word: "おこじょ", category: "animal" },
  { word: "なまけもの", category: "animal" },
  { word: "あるぱか", category: "animal" },
  { word: "かんがるう", category: "animal" },
  { word: "わらびい", category: "animal" },
  { word: "おっとせい", category: "animal" },
  { word: "あざらし", category: "animal" },
  { word: "あしか", category: "animal" },
  { word: "らっこ", category: "animal" },
  { word: "かものはし", category: "animal" },
  { word: "はくちょう", category: "animal" },
  { word: "あまがえる", category: "animal" },
  { word: "いもり", category: "animal" },
  { word: "やもり", category: "animal" },
  { word: "へび", category: "animal" },
  { word: "わに", category: "animal" },
  { word: "かめ", category: "animal" },
  { word: "えび", category: "animal" },
  { word: "かに", category: "animal" },
  { word: "いか", category: "animal" },
  { word: "たこ", category: "animal" },
  { word: "あさり", category: "animal" },
  { word: "しじみ", category: "animal" },
  { word: "くらげ", category: "animal" },
  { word: "ひとで", category: "animal" },
  { word: "うに", category: "animal" },
  { word: "さんご", category: "animal" },
  { word: "のみ", category: "animal" },
  { word: "しらみ", category: "animal" },
  { word: "だに", category: "animal" },
  { word: "か", category: "animal" },
  { word: "はえ", category: "animal" },
  { word: "あぶ", category: "animal" },
  { word: "はち", category: "animal" },
  { word: "せみ", category: "animal" },
  { word: "ばった", category: "animal" },
  { word: "こおろぎ", category: "animal" },
  { word: "かまきり", category: "animal" },
  { word: "とんぼ", category: "animal" },
  { word: "ちょう", category: "animal" },
  { word: "が", category: "animal" },
  { word: "あげは", category: "animal" },
  { word: "しじゅうから", category: "animal" },
  { word: "めじろ", category: "animal" },

  // food
  { word: "りんご", category: "food" },
  { word: "かき", category: "food" },
  { word: "いちご", category: "food" },
  { word: "すいか", category: "food" },
  { word: "もも", category: "food" },
  { word: "なし", category: "food" },
  { word: "ぶどう", category: "food" },
  { word: "ばなな", category: "food" },
  { word: "たまご", category: "food" },
  { word: "とうふ", category: "food" },
  { word: "おこめ", category: "food" },
  { word: "おすし", category: "food" },
  { word: "そば", category: "food" },
  { word: "もち", category: "food" },
  { word: "おにぎり", category: "food" },
  { word: "せんべい", category: "food" },
  { word: "れたす", category: "food" },
  { word: "きゅうり", category: "food" },
  { word: "とまと", category: "food" },
  { word: "しいたけ", category: "food" },
  { word: "ぎゅうにゅう", category: "food" },
  { word: "べんとう", category: "food" },
  { word: "びわ", category: "food" },
  { word: "みそ", category: "food" },
  { word: "しょうゆ", category: "food" },
  { word: "しお", category: "food" },
  { word: "さとう", category: "food" },
  { word: "す", category: "food" },
  { word: "あぶら", category: "food" },
  { word: "ごま", category: "food" },
  { word: "のり", category: "food" },
  { word: "わかめ", category: "food" },
  { word: "こんぶ", category: "food" },
  { word: "ひじき", category: "food" },
  { word: "だいず", category: "food" },
  { word: "あずき", category: "food" },
  { word: "えだまめ", category: "food" },
  { word: "なっとう", category: "food" },
  { word: "おかゆ", category: "food" },
  { word: "ぞうすい", category: "food" },
  { word: "ちゃづけ", category: "food" },
  { word: "みそしる", category: "food" },
  { word: "すきやき", category: "food" },
  { word: "しゃぶしゃぶ", category: "food" },
  { word: "てんぷら", category: "food" },
  { word: "からあげ", category: "food" },
  { word: "やきとり", category: "food" },
  { word: "さしみ", category: "food" },
  { word: "にもの", category: "food" },
  { word: "つけもの", category: "food" },
  { word: "やさい", category: "food" },
  { word: "くだもの", category: "food" },
  { word: "ごぼう", category: "food" },
  { word: "かぼちゃ", category: "food" },
  { word: "じゃがいも", category: "food" },
  { word: "さつまいも", category: "food" },
  { word: "さといも", category: "food" },
  { word: "ながいも", category: "food" },
  { word: "やまいも", category: "food" },
  { word: "たまねぎ", category: "food" },
  { word: "ねぎ", category: "food" },
  { word: "なす", category: "food" },
  { word: "きゃべつ", category: "food" },
  { word: "はくさい", category: "food" },
  { word: "こまつな", category: "food" },
  { word: "ほうれんそう", category: "food" },
  { word: "とうもろこし", category: "food" },
  { word: "えんどう", category: "food" },
  { word: "そらまめ", category: "food" },
  { word: "おくら", category: "food" },
  { word: "しそ", category: "food" },
  { word: "みょうが", category: "food" },
  { word: "しょうが", category: "food" },
  { word: "にら", category: "food" },
  { word: "ぱせり", category: "food" },
  { word: "せろり", category: "food" },
  { word: "ばじる", category: "food" },
  { word: "ちいず", category: "food" },
  { word: "よおぐると", category: "food" },
  { word: "ばたあ", category: "food" },
  { word: "くりいむ", category: "food" },
  { word: "あいす", category: "food" },
  { word: "けえき", category: "food" },
  { word: "くっきい", category: "food" },
  { word: "だんご", category: "food" },
  { word: "うめぼし", category: "food" },
  { word: "がんもどき", category: "food" },
  { word: "ぐみ", category: "food" },
  { word: "げそ", category: "food" },
  { word: "ずんだもち", category: "food" },
  { word: "ぜりい", category: "food" },
  { word: "でんがく", category: "food" },
  { word: "どらやき", category: "food" },
  { word: "ぬかづけ", category: "food" },
  { word: "ふりかけ", category: "food" },
  { word: "ぷらむ", category: "food" },
  { word: "まぐろ", category: "food" },
  { word: "むぎめし", category: "food" },
  { word: "めかぶ", category: "food" },
  { word: "らっきょう", category: "food" },
  { word: "るいべ", category: "food" },
  { word: "ろおす", category: "food" },
  { word: "ゆば", category: "food" },
  { word: "ぼたもち", category: "food" },
  { word: "ぽてと", category: "food" },

  // nature
  { word: "やま", category: "nature" },
  { word: "かわ", category: "nature" },
  { word: "うみ", category: "nature" },
  { word: "そら", category: "nature" },
  { word: "もり", category: "nature" },
  { word: "はやし", category: "nature" },
  { word: "いけ", category: "nature" },
  { word: "たき", category: "nature" },
  { word: "しま", category: "nature" },
  { word: "はな", category: "nature" },
  { word: "くさ", category: "nature" },
  { word: "きり", category: "nature" },
  { word: "あめ", category: "nature" },
  { word: "ゆき", category: "nature" },
  { word: "かぜ", category: "nature" },
  { word: "つき", category: "nature" },
  { word: "ほし", category: "nature" },
  { word: "ひかり", category: "nature" },
  { word: "こかげ", category: "nature" },
  { word: "あさひ", category: "nature" },
  { word: "ぬま", category: "nature" },
  { word: "ちきゅう", category: "nature" },
  { word: "みなと", category: "nature" },
  { word: "たいよう", category: "nature" },
  { word: "くも", category: "nature" },
  { word: "にじ", category: "nature" },
  { word: "いわ", category: "nature" },
  { word: "いし", category: "nature" },
  { word: "すな", category: "nature" },
  { word: "つち", category: "nature" },
  { word: "どろ", category: "nature" },
  { word: "たに", category: "nature" },
  { word: "おか", category: "nature" },
  { word: "みね", category: "nature" },
  { word: "ふもと", category: "nature" },
  { word: "のはら", category: "nature" },
  { word: "さばく", category: "nature" },
  { word: "みずうみ", category: "nature" },
  { word: "せせらぎ", category: "nature" },
  { word: "なぎさ", category: "nature" },
  { word: "はま", category: "nature" },
  { word: "みさき", category: "nature" },
  { word: "うら", category: "nature" },
  { word: "いりえ", category: "nature" },
  { word: "おき", category: "nature" },
  { word: "なみ", category: "nature" },
  { word: "うず", category: "nature" },
  { word: "しぶき", category: "nature" },
  { word: "あらし", category: "nature" },
  { word: "かみなり", category: "nature" },
  { word: "いなずま", category: "nature" },
  { word: "つゆ", category: "nature" },
  { word: "しも", category: "nature" },
  { word: "こおり", category: "nature" },
  { word: "あられ", category: "nature" },
  { word: "かすみ", category: "nature" },
  { word: "もや", category: "nature" },
  { word: "あさやけ", category: "nature" },
  { word: "ゆうやけ", category: "nature" },
  { word: "よぞら", category: "nature" },
  { word: "あおぞら", category: "nature" },
  { word: "くもり", category: "nature" },
  { word: "はれ", category: "nature" },
  { word: "しんりょく", category: "nature" },
  { word: "もみじ", category: "nature" },
  { word: "わかば", category: "nature" },
  { word: "このは", category: "nature" },
  { word: "おちば", category: "nature" },
  { word: "こえだ", category: "nature" },
  { word: "えだ", category: "nature" },
  { word: "みき", category: "nature" },
  { word: "ね", category: "nature" },
  { word: "たね", category: "nature" },
  { word: "め", category: "nature" },
  { word: "つぼみ", category: "nature" },
  { word: "さくら", category: "nature" },
  { word: "うめ", category: "nature" },
  { word: "まつ", category: "nature" },
  { word: "すぎ", category: "nature" },
  { word: "ひのき", category: "nature" },
  { word: "たけ", category: "nature" },
  { word: "ささ", category: "nature" },
  { word: "こけ", category: "nature" },
  { word: "しだ", category: "nature" },
  { word: "つた", category: "nature" },
  { word: "ふじ", category: "nature" },
  { word: "すすき", category: "nature" },
  { word: "よもぎ", category: "nature" },
  { word: "たんぽぽ", category: "nature" },
  { word: "すみれ", category: "nature" },
  { word: "ひまわり", category: "nature" },
  { word: "あじさい", category: "nature" },
  { word: "あやめ", category: "nature" },
  { word: "つばき", category: "nature" },
  { word: "きく", category: "nature" },
  { word: "ゆり", category: "nature" },
  { word: "ばら", category: "nature" },
  { word: "はす", category: "nature" },
  { word: "れんげ", category: "nature" },
  { word: "なのはな", category: "nature" },
  { word: "なずな", category: "nature" },
  { word: "つくし", category: "nature" },
  { word: "さざなみ", category: "nature" },
  { word: "こもれび", category: "nature" },
  { word: "しらなみ", category: "nature" },

  // tool
  { word: "かさ", category: "tool" },
  { word: "はさみ", category: "tool" },
  { word: "えんぴつ", category: "tool" },
  { word: "けしごむ", category: "tool" },
  { word: "ものさし", category: "tool" },
  { word: "つくえ", category: "tool" },
  { word: "いす", category: "tool" },
  { word: "かがみ", category: "tool" },
  { word: "とけい", category: "tool" },
  { word: "でんわ", category: "tool" },
  { word: "くるま", category: "tool" },
  { word: "ふね", category: "tool" },
  { word: "じてんしゃ", category: "tool" },
  { word: "ほうき", category: "tool" },
  { word: "やすり", category: "tool" },
  { word: "なべ", category: "tool" },
  { word: "さら", category: "tool" },
  { word: "まくら", category: "tool" },
  { word: "こたつ", category: "tool" },
  { word: "かなづち", category: "tool" },
  { word: "げた", category: "tool" },
  { word: "ぜんまい", category: "tool" },
  { word: "はし", category: "tool" },
  { word: "ふぉおく", category: "tool" },
  { word: "ないふ", category: "tool" },
  { word: "きゅうす", category: "tool" },
  { word: "おたま", category: "tool" },
  { word: "しゃもじ", category: "tool" },
  { word: "まないた", category: "tool" },
  { word: "ほうちょう", category: "tool" },
  { word: "ざる", category: "tool" },
  { word: "ぼうる", category: "tool" },
  { word: "おろしがね", category: "tool" },
  { word: "すりばち", category: "tool" },
  { word: "すりこぎ", category: "tool" },
  { word: "たわし", category: "tool" },
  { word: "ばけつ", category: "tool" },
  { word: "ちりとり", category: "tool" },
  { word: "ごみばこ", category: "tool" },
  { word: "せんたくばさみ", category: "tool" },
  { word: "ものほし", category: "tool" },
  { word: "はんがあ", category: "tool" },
  { word: "かぎ", category: "tool" },
  { word: "じょうぎ", category: "tool" },
  { word: "ぶんどき", category: "tool" },
  { word: "こんぱす", category: "tool" },
  { word: "のこぎり", category: "tool" },
  { word: "かんな", category: "tool" },
  { word: "くぎ", category: "tool" },
  { word: "ねじ", category: "tool" },
  { word: "とんかち", category: "tool" },
  { word: "どらいばあ", category: "tool" },
  { word: "ぺんち", category: "tool" },
  { word: "すぱな", category: "tool" },
  { word: "れんち", category: "tool" },
  { word: "おの", category: "tool" },
  { word: "なた", category: "tool" },
  { word: "くわ", category: "tool" },
  { word: "すこっぷ", category: "tool" },
  { word: "じょうろ", category: "tool" },
  { word: "かま", category: "tool" },
  { word: "はたき", category: "tool" },
  { word: "もっぷ", category: "tool" },
  { word: "ぶらし", category: "tool" },
  { word: "くし", category: "tool" },
  { word: "かみそり", category: "tool" },
  { word: "はぶらし", category: "tool" },
  { word: "たおる", category: "tool" },
  { word: "てぬぐい", category: "tool" },
  { word: "ふろしき", category: "tool" },
  { word: "ふで", category: "tool" },
  { word: "すみ", category: "tool" },
  { word: "えのぐ", category: "tool" },
  { word: "ぱれっと", category: "tool" },
  { word: "てえぷ", category: "tool" },
  { word: "かめら", category: "tool" },
  { word: "らじお", category: "tool" },
  { word: "てれび", category: "tool" },
  { word: "りゅっく", category: "tool" },
  { word: "さいふ", category: "tool" },
  { word: "でんち", category: "tool" },
  { word: "らいと", category: "tool" },
  { word: "らんぷ", category: "tool" },
  { word: "まっち", category: "tool" },
  { word: "ろうそく", category: "tool" },
  { word: "はしご", category: "tool" },
  { word: "ろおぷ", category: "tool" },
  { word: "つえ", category: "tool" },
  { word: "くつ", category: "tool" },
  { word: "ながぐつ", category: "tool" },
  { word: "ぼうし", category: "tool" },
  { word: "めがね", category: "tool" },
  { word: "ますく", category: "tool" },
  { word: "てぶくろ", category: "tool" },
  { word: "うちわ", category: "tool" },
  { word: "せんす", category: "tool" },
  { word: "ふえ", category: "tool" },
  { word: "たいこ", category: "tool" },
  { word: "つづみ", category: "tool" },
  { word: "こづち", category: "tool" },
  { word: "ものおき", category: "tool" },
  { word: "かなばさみ", category: "tool" },
  { word: "めざまし", category: "tool" },
  { word: "ておけ", category: "tool" },
  { word: "ひしゃく", category: "tool" },

  // emotion
  { word: "えがお", category: "emotion" },
  { word: "よろこび", category: "emotion" },
  { word: "かなしみ", category: "emotion" },
  { word: "いかり", category: "emotion" },
  { word: "おどろき", category: "emotion" },
  { word: "たのしみ", category: "emotion" },
  { word: "しあわせ", category: "emotion" },
  { word: "ためらい", category: "emotion" },
  { word: "きぼう", category: "emotion" },
  { word: "ゆうき", category: "emotion" },
  { word: "おだやか", category: "emotion" },
  { word: "どきどき", category: "emotion" },
  { word: "わくわく", category: "emotion" },
  { word: "うっとり", category: "emotion" },
  { word: "さびしさ", category: "emotion" },
  { word: "やさしさ", category: "emotion" },
  { word: "あこがれ", category: "emotion" },
  { word: "ほこり", category: "emotion" },
  { word: "なごみ", category: "emotion" },
  { word: "ときめき", category: "emotion" },
  { word: "あせり", category: "emotion" },
  { word: "いらだち", category: "emotion" },
  { word: "くやしさ", category: "emotion" },
  { word: "せつなさ", category: "emotion" },
  { word: "うれしさ", category: "emotion" },
  { word: "たのしさ", category: "emotion" },
  { word: "おかしみ", category: "emotion" },
  { word: "おそれ", category: "emotion" },
  { word: "こわさ", category: "emotion" },
  { word: "おびえ", category: "emotion" },
  { word: "はじらい", category: "emotion" },
  { word: "てれ", category: "emotion" },
  { word: "まよい", category: "emotion" },
  { word: "なやみ", category: "emotion" },
  { word: "きづかい", category: "emotion" },
  { word: "おもいやり", category: "emotion" },
  { word: "いたわり", category: "emotion" },
  { word: "あい", category: "emotion" },
  { word: "こい", category: "emotion" },
  { word: "すき", category: "emotion" },
  { word: "きらい", category: "emotion" },
  { word: "いやけ", category: "emotion" },
  { word: "むなしさ", category: "emotion" },
  { word: "むねさわぎ", category: "emotion" },
  { word: "かんげき", category: "emotion" },
  { word: "かんどう", category: "emotion" },
  { word: "まんぞく", category: "emotion" },
  { word: "たいくつ", category: "emotion" },
  { word: "たいせつ", category: "emotion" },
  { word: "しんぱい", category: "emotion" },
  { word: "けいかい", category: "emotion" },
  { word: "しょうき", category: "emotion" },
  { word: "げんき", category: "emotion" },
  { word: "きらめき", category: "emotion" },
  { word: "ひらめき", category: "emotion" },
  { word: "あきらめ", category: "emotion" },
  { word: "ねたみ", category: "emotion" },
  { word: "そねみ", category: "emotion" },
  { word: "うらみ", category: "emotion" },
  { word: "はげみ", category: "emotion" },
  { word: "はずみ", category: "emotion" },
  { word: "ゆとり", category: "emotion" },
  { word: "やるき", category: "emotion" },
  { word: "ぬくもり", category: "emotion" },
  { word: "あたたかみ", category: "emotion" },
  { word: "したしみ", category: "emotion" },
  { word: "さみしさ", category: "emotion" },
  { word: "すなお", category: "emotion" },
  { word: "まじめ", category: "emotion" },
  { word: "よくばり", category: "emotion" },
  { word: "あまえ", category: "emotion" },
  { word: "いじわる", category: "emotion" },
  { word: "わびしさ", category: "emotion" },
  { word: "かなしさ", category: "emotion" },
  { word: "けだるさ", category: "emotion" },
  { word: "ここちよさ", category: "emotion" },
  { word: "きまずさ", category: "emotion" },
  { word: "きづまり", category: "emotion" },
  { word: "もどかしさ", category: "emotion" },
  { word: "はずかしさ", category: "emotion" },
  { word: "すがすがしさ", category: "emotion" },
  { word: "さわやか", category: "emotion" },
  { word: "ほがらか", category: "emotion" },
  { word: "にこやか", category: "emotion" },
  { word: "しずけさ", category: "emotion" },
  { word: "やすらぎ", category: "emotion" },
  { word: "いきがい", category: "emotion" },
  { word: "なつかしさ", category: "emotion" },
  { word: "あわれみ", category: "emotion" },
  { word: "めぐみ", category: "emotion" },
  { word: "かんしゃ", category: "emotion" },
  { word: "しっと", category: "emotion" },
  { word: "あきれ", category: "emotion" },
  { word: "あわれ", category: "emotion" },
  { word: "ほほえみ", category: "emotion" },
  { word: "むじゃき", category: "emotion" },
  { word: "いとしさ", category: "emotion" },
  { word: "うしろめたさ", category: "emotion" },
  { word: "うらやましさ", category: "emotion" },
  { word: "さみだれごころ", category: "emotion" },
  { word: "こころづよさ", category: "emotion" },
  { word: "こころぼそさ", category: "emotion" },
  { word: "うれい", category: "emotion" },
  { word: "とまどい", category: "emotion" },
  { word: "はればれ", category: "emotion" },

  // normal
  { word: "あさ", category: "normal" },
  { word: "ひる", category: "normal" },
  { word: "よる", category: "normal" },
  { word: "きょう", category: "normal" },
  { word: "あした", category: "normal" },
  { word: "むかし", category: "normal" },
  { word: "なまえ", category: "normal" },
  { word: "ことば", category: "normal" },
  { word: "こころ", category: "normal" },
  { word: "からだ", category: "normal" },
  { word: "あたま", category: "normal" },
  { word: "てがみ", category: "normal" },
  { word: "おはなし", category: "normal" },
  { word: "まつり", category: "normal" },
  { word: "あそび", category: "normal" },
  { word: "うた", category: "normal" },
  { word: "おどり", category: "normal" },
  { word: "ひみつ", category: "normal" },
  { word: "たから", category: "normal" },
  { word: "なかま", category: "normal" },
  { word: "だるま", category: "normal" },
  { word: "るす", category: "normal" },
  { word: "いえ", category: "normal" },
  { word: "へや", category: "normal" },
  { word: "まち", category: "normal" },
  { word: "むら", category: "normal" },
  { word: "みち", category: "normal" },
  { word: "かど", category: "normal" },
  { word: "にわ", category: "normal" },
  { word: "たび", category: "normal" },
  { word: "しごと", category: "normal" },
  { word: "やすみ", category: "normal" },
  { word: "くらし", category: "normal" },
  { word: "いのち", category: "normal" },
  { word: "ゆめ", category: "normal" },
  { word: "ねがい", category: "normal" },
  { word: "ちから", category: "normal" },
  { word: "こえ", category: "normal" },
  { word: "おと", category: "normal" },
  { word: "いろ", category: "normal" },
  { word: "かたち", category: "normal" },
  { word: "かず", category: "normal" },
  { word: "もじ", category: "normal" },
  { word: "え", category: "normal" },
  { word: "ふみ", category: "normal" },
  { word: "えにっき", category: "normal" },
  { word: "にっき", category: "normal" },
  { word: "きおく", category: "normal" },
  { word: "れきし", category: "normal" },
  { word: "とき", category: "normal" },
  { word: "ひと", category: "normal" },
  { word: "こども", category: "normal" },
  { word: "おとな", category: "normal" },
  { word: "ともだち", category: "normal" },
  { word: "かぞく", category: "normal" },
  { word: "おや", category: "normal" },
  { word: "こ", category: "normal" },
  { word: "まご", category: "normal" },
  { word: "きょうだい", category: "normal" },
  { word: "せかい", category: "normal" },
  { word: "くに", category: "normal" },
  { word: "ところ", category: "normal" },
  { word: "ばしょ", category: "normal" },
  { word: "ひろば", category: "normal" },
  { word: "がっこう", category: "normal" },
  { word: "べんきょう", category: "normal" },
  { word: "あいさつ", category: "normal" },
  { word: "へんじ", category: "normal" },
  { word: "こたえ", category: "normal" },
  { word: "やくそく", category: "normal" },
  { word: "しらせ", category: "normal" },
  { word: "たより", category: "normal" },
  { word: "きまり", category: "normal" },
  { word: "るうる", category: "normal" },
  { word: "けいこ", category: "normal" },
  { word: "れんしゅう", category: "normal" },
  { word: "じゅんび", category: "normal" },
  { word: "あと", category: "normal" },
  { word: "まえ", category: "normal" },
  { word: "うしろ", category: "normal" },
  { word: "よこ", category: "normal" },
  { word: "となり", category: "normal" },
  { word: "なか", category: "normal" },
  { word: "そと", category: "normal" },
  { word: "うえ", category: "normal" },
  { word: "した", category: "normal" },
  { word: "みぎ", category: "normal" },
  { word: "ひだり", category: "normal" },
  { word: "はじめ", category: "normal" },
  { word: "おわり", category: "normal" },
  { word: "つづき", category: "normal" },
  { word: "つぎ", category: "normal" },
  { word: "さき", category: "normal" },
  { word: "のち", category: "normal" },
  { word: "むこう", category: "normal" },
  { word: "こちら", category: "normal" },
  { word: "あちら", category: "normal" },
  { word: "どちら", category: "normal" },
  { word: "いつも", category: "normal" },
  { word: "ときどき", category: "normal" },
  { word: "たまに", category: "normal" },
  { word: "すぐ", category: "normal" },
  { word: "こよみ", category: "normal" },
  { word: "まど", category: "normal" },
  { word: "とびら", category: "normal" },
];
var WORD_INDEX = new Map(WORDS.map((entry) => [entry.word, entry]));
var WORDS_BY_INITIAL = /* @__PURE__ */ new Map();
for (const entry of WORDS) {
  const initial = entry.word[0];
  const candidates = WORDS_BY_INITIAL.get(initial);
  if (candidates) {
    candidates.push(entry);
  } else {
    WORDS_BY_INITIAL.set(initial, [entry]);
  }
}
function findWord(word) {
  return WORD_INDEX.get(word);
}
function getWordsByInitial(initial) {
  return WORDS_BY_INITIAL.get(initial) ?? [];
}

// src/logic/battle.ts
var ANIMAL_DAMAGE_BONUS = 2;
var TOOL_DAMAGE_BONUS = 1;
var FOOD_HEAL_AMOUNT = 2;
var NATURE_DEFENSE_REDUCTION = 2;
var EMOTION_COMBO_STEP = 0.5;
var CHANCE_DAMAGE = 3;
var DEFAULT_PLAYER_MAX_HP = 100;
function round1(value) {
  return Math.round(value * 10) / 10;
}
function createInitialBattleState(enemy, playerMaxHp = DEFAULT_PLAYER_MAX_HP, playerHp = playerMaxHp) {
  return {
    playerHp: playerMaxHp,
    playerMaxHp,
    enemyHp: enemy.maxHp,
    enemyMaxHp: enemy.maxHp,
    pendingDefense: 0,
    comboMultiplier: 1
  };
}
function applyPlayerAttack(state, entry, skills = {}) {
  const messages = [];
  let comboMultiplier = state.comboMultiplier;
  if (entry.category === "emotion") {
    comboMultiplier = round1(comboMultiplier + EMOTION_COMBO_STEP);
  }
  const baseDamage = entry.word.length;
  let bonusDamage = skills.bonusDamage ?? 0;
  if (entry.category === "animal") {
    bonusDamage += ANIMAL_DAMAGE_BONUS + (skills.bonusAnimalDamage ?? 0);
  } else if (entry.category === "tool") {
    bonusDamage += TOOL_DAMAGE_BONUS;
  }
  if (entry.word.length >= 4) {
    bonusDamage += skills.bonusVocabDamage ?? 0;
  }
  let damageDealt = baseDamage + bonusDamage;
  if (entry.category === "emotion") {
    damageDealt = Math.floor(damageDealt * comboMultiplier);
  }
  messages.push(`\u30C0\u30E1\u30FC\u30B8${damageDealt}\uFF01`);
  const enemyHp = Math.max(0, state.enemyHp - damageDealt);
  let playerHp = state.playerHp;
  if (entry.category === "food") {
    const healAmount = FOOD_HEAL_AMOUNT + (skills.bonusHeal ?? 0);
    playerHp = Math.min(state.playerMaxHp, playerHp + healAmount);
    messages.push(`\u30D7\u30EC\u30A4\u30E4\u30FC\u306EHP\u304C${healAmount}\u56DE\u5FA9\u3057\u305F\uFF01`);
  }
  let pendingDefense = state.pendingDefense;
  if (entry.category === "nature") {
    pendingDefense += NATURE_DEFENSE_REDUCTION + (skills.bonusDefense ?? 0);
    messages.push("\u3064\u304E\u306E\u6575\u306E\u653B\u6483\u30C0\u30E1\u30FC\u30B8\u304C2\u3084\u308F\u3089\u3050\uFF01");
  }
  const outcome = enemyHp <= 0 ? "stageClear" : "ongoing";
  if (outcome === "stageClear") {
    messages.push("\u30B9\u30C6\u30FC\u30B8\u30AF\u30EA\u30A2\uFF01");
  }
  return {
    state: {
      ...state,
      enemyHp,
      playerHp,
      pendingDefense,
      comboMultiplier
    },
    damageDealt,
    messages,
    outcome
  };
}
function applyEnemyAttack(state, enemy, word, skills = {}) {
  const messages = [];
  const rawDamage = enemy.attack + Math.floor(word.length / 3);
  const totalDefense = state.pendingDefense;
  const damageTaken = Math.max(0, rawDamage - totalDefense);
  if (state.pendingDefense > 0) {
    messages.push(`\u3057\u305C\u3093\u306E\u52B9\u679C\u3067\u6575\u306E\u653B\u6483\u3092${state.pendingDefense}\u3084\u308F\u3089\u3052\u305F\uFF01`);
  }
  messages.push(`\u6575\u306E\u653B\u6483\uFF01\u30C0\u30E1\u30FC\u30B8${damageTaken}\uFF01`);
  const playerHp = Math.max(0, state.playerHp - damageTaken);
  const outcome = playerHp <= 0 ? "gameOver" : "ongoing";
  if (outcome === "gameOver") {
    messages.push("\u30B2\u30FC\u30E0\u30AA\u30FC\u30D0\u30FC...");
  }
  return {
    state: {
      ...state,
      playerHp,
      pendingDefense: 0,
      // R11: mitigation is consumed whether or not it was used
      comboMultiplier: 1
      // R13: combo resets after the enemy's turn
    },
    damageTaken,
    messages,
    outcome
  };
}
function applyChanceDamage(state) {
  const enemyHp = Math.max(0, state.enemyHp - CHANCE_DAMAGE);
  const outcome = enemyHp <= 0 ? "stageClear" : "ongoing";
  const messages = ["\u6575\u304C\u8A00\u8449\u306B\u3064\u307E\u3063\u305F\uFF01\u30C1\u30E3\u30F3\u30B9\u30C0\u30E1\u30FC\u30B8\uFF01"];
  if (outcome === "stageClear") {
    messages.push("\u30B9\u30C6\u30FC\u30B8\u30AF\u30EA\u30A2\uFF01");
  }
  return {
    state: { ...state, enemyHp },
    damageDealt: CHANCE_DAMAGE,
    messages,
    outcome
  };
}

// src/logic/shiritori.ts
var HIRAGANA_ONLY = /^[ぁ-ん]+$/;
function isHiragana(word) {
  return HIRAGANA_ONLY.test(word) && !word.includes("\u30FC");
}
var SMALL_KANA_MAP = {
  \u3041: "\u3042",
  \u3043: "\u3044",
  \u3045: "\u3046",
  \u3047: "\u3048",
  \u3049: "\u304A",
  \u3083: "\u3084",
  \u3085: "\u3086",
  \u3087: "\u3088",
  \u3063: "\u3064",
  \u308E: "\u308F"
};
function getLastChar(word) {
  const raw = word.slice(-1);
  return SMALL_KANA_MAP[raw] ?? raw;
}
function isConnected(word, lastChar) {
  if (lastChar === null) {
    return true;
  }
  return word.charAt(0) === lastChar;
}
function isWordUsed(word, usedWords) {
  return usedWords.has(word);
}
function isInDictionary(word) {
  return findWord(word) !== void 0;
}
function endsWithN(word) {
  return getLastChar(word) === "\u3093";
}
function validatePlayerWord(word, state) {
  if (!isHiragana(word)) {
    return { ok: false, reason: "notHiragana" };
  }
  const effectiveLastChar = state.lastChar && getWordsByInitial(state.lastChar).some(
    (entry) => !state.usedWords.has(entry.word) && !endsWithN(entry.word)
  ) ? state.lastChar : null;
  if (!isConnected(word, effectiveLastChar)) {
    return { ok: false, reason: "notConnected" };
  }
  if (isWordUsed(word, state.usedWords)) {
    return { ok: false, reason: "alreadyUsed" };
  }
  if (!isInDictionary(word)) {
    return { ok: false, reason: "notInDict" };
  }
  if (endsWithN(word)) {
    return { ok: false, reason: "endsWithN", isGameOver: true };
  }
  return { ok: true };
}
function pickEnemyWord(startChar, usedWords) {
  const candidates = getWordsByInitial(startChar).filter(
    (entry) => !usedWords.has(entry.word) && !endsWithN(entry.word)
  );
  if (candidates.length === 0) {
    return null;
  }
  const playableCandidates = candidates.filter((entry) => {
    const usedAfterReply = new Set(usedWords);
    usedAfterReply.add(entry.word);
    return getWordsByInitial(getLastChar(entry.word)).some(
      (nextEntry) => !usedAfterReply.has(nextEntry.word) && !endsWithN(nextEntry.word)
    );
  });
  const pool = playableCandidates.length > 0 ? playableCandidates : candidates;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index].word;
}
function resolveEnemyTurn(startChar, usedWords) {
  const word = pickEnemyWord(startChar, usedWords);
  return word ? { type: "word", word } : { type: "stuck" };
}

// src/data/skills.ts
var SKILLS = [
  { id: "wordPower", name: "\u6587\u5B57\u306E\u529B", description: "\u3059\u3079\u3066\u306E\u5358\u8A9E\u30C0\u30E1\u30FC\u30B8+1" },
  { id: "foodHealBoost", name: "\u305F\u3079\u3082\u306E\u56DE\u5FA9\u5F37\u5316", description: "food\u306E\u56DE\u5FA9\u91CF+2" },
  { id: "animalBonus", name: "\u3069\u3046\u3076\u3064\u7279\u653B", description: "animal\u306E\u8FFD\u52A0\u30C0\u30E1\u30FC\u30B8+2" },
  { id: "natureShield", name: "\u81EA\u7136\u306E\u5B88\u308A", description: "nature\u306E\u8EFD\u6E1B\u91CF+2" },
  { id: "inspiration", name: "\u3072\u3089\u3081\u304D", description: "1\u30D0\u30C8\u30EB\u306B1\u56DE\u3060\u3051\u6642\u9593\u5207\u308C\u3092\u7121\u52B9\u5316" },
  { id: "vocabulary", name: "\u8A9E\u5F59\u529B", description: "4\u6587\u5B57\u4EE5\u4E0A\u306E\u5358\u8A9E\u30C0\u30E1\u30FC\u30B8+2" }
];
var SKILL_BY_ID = new Map(SKILLS.map((skill) => [skill.id, skill]));
function countSkill(ownedSkills, id) {
  return ownedSkills.filter((skillId) => skillId === id).length;
}
function computeSkillMods(ownedSkills) {
  return {
    bonusDamage: countSkill(ownedSkills, "wordPower") * 1,
    // R27
    bonusHeal: countSkill(ownedSkills, "foodHealBoost") * 2,
    // R28
    bonusAnimalDamage: countSkill(ownedSkills, "animalBonus") * 2,
    // R29
    bonusDefense: countSkill(ownedSkills, "natureShield") * 2,
    // R30
    bonusVocabDamage: countSkill(ownedSkills, "vocabulary") * 2
    // R32 (word.length >= 4 only, enforced in battle.ts)
  };
}
function rollSkillChoices() {
  const pool = SKILLS.map((skill) => skill.id);
  const choices = [];
  for (let i = 0; i < 3 && pool.length > 0; i += 1) {
    const index = Math.floor(Math.random() * pool.length);
    choices.push(pool[index]);
    pool.splice(index, 1);
  }
  return choices;
}

// scripts/e2e-sim.ts
function installRng(s) {
  let seed = s >>> 0 || 1;
  Math.random = () => {
    seed = seed * 1103515245 + 12345 & 2147483647;
    return seed / 2147483647;
  };
}
var SKILL_PRIORITY = ["foodHealBoost", "wordPower", "vocabulary", "animalBonus", "natureShield", "inspiration"];
function pickSkill(choices) {
  for (const pref of SKILL_PRIORITY) if (choices.includes(pref)) return pref;
  return choices[0];
}
function damageOf(entry, mods, combo) {
  let bonus = mods.bonusDamage ?? 0;
  if (entry.category === "animal") bonus += 2 + (mods.bonusAnimalDamage ?? 0);
  else if (entry.category === "tool") bonus += 1;
  if (entry.word.length >= 4) bonus += mods.bonusVocabDamage ?? 0;
  let dmg = entry.word.length + bonus;
  if (entry.category === "emotion") dmg = Math.floor(dmg * (combo + 0.5));
  return dmg;
}
function healOf(entry, mods) {
  return entry.category === "food" ? 2 + (mods.bonusHeal ?? 0) : 0;
}
var startsWith = (ch, used) => WORDS.filter((w) => getLastChar(w.word) !== "\u3093" && w.word.charAt(0) === ch && !used.has(w.word));
function isSafe(w, used) {
  const afterMe = new Set(used);
  afterMe.add(w.word);
  const enemyReplies = startsWith(getLastChar(w.word), afterMe);
  if (enemyReplies.length === 0) return true;
  return enemyReplies.some((r) => {
    const afterEnemy = new Set(afterMe);
    afterEnemy.add(r.word);
    return startsWith(getLastChar(r.word), afterEnemy).length > 0;
  });
}
function choosePlayerWord(shiritori, state, mods) {
  const legal = WORDS.filter((e) => validatePlayerWord(e.word, shiritori).ok);
  if (legal.length === 0) return null;
  const safe = legal.filter((w) => isSafe(w, shiritori.usedWords));
  const pool = safe.length > 0 ? safe : legal;
  const lethal = pool.filter((w) => damageOf(w, mods, state.comboMultiplier) >= state.enemyHp);
  if (lethal.length > 0) return lethal.sort((a, b) => a.word.length - b.word.length)[0];
  if (state.playerHp <= 12) {
    const food = pool.filter((w) => w.category === "food");
    if (food.length > 0)
      return food.sort(
        (a, b) => healOf(b, mods) - healOf(a, mods) || damageOf(b, mods, state.comboMultiplier) - damageOf(a, mods, state.comboMultiplier)
      )[0];
  }
  return pool.sort((a, b) => damageOf(b, mods, state.comboMultiplier) - damageOf(a, mods, state.comboMultiplier))[0];
}
function playStage(stageIndex, carriedHp, owned) {
  const enemy = ENEMIES[stageIndex];
  const mods = computeSkillMods(owned);
  let state = createInitialBattleState(enemy, DEFAULT_PLAYER_MAX_HP, carriedHp);
  const used = /* @__PURE__ */ new Set();
  let lastChar = null;
  let wordCount = 0;
  for (let turns = 0; turns < 2e3; turns++) {
    const choice = choosePlayerWord({ lastChar, usedWords: used }, state, mods);
    if (!choice) return { cleared: false, hp: state.playerHp, words: wordCount, reason: "player stuck (no legal word)" };
    const atk = applyPlayerAttack(state, choice, mods);
    state = atk.state;
    used.add(choice.word);
    lastChar = getLastChar(choice.word);
    wordCount++;
    if (atk.outcome === "stageClear") return { cleared: true, hp: state.playerHp, words: wordCount };
    const enemyTurn = resolveEnemyTurn(lastChar, used);
    if (enemyTurn.type === "stuck") {
      const chance = applyChanceDamage(state);
      state = chance.state;
      if (chance.outcome === "stageClear") return { cleared: true, hp: state.playerHp, words: wordCount };
      continue;
    }
    used.add(enemyTurn.word);
    lastChar = getLastChar(enemyTurn.word);
    const eatk = applyEnemyAttack(state, enemy, enemyTurn.word, mods);
    state = eatk.state;
    if (eatk.outcome === "gameOver") return { cleared: false, hp: 0, words: wordCount, reason: `defeated by ${enemy.name}` };
  }
  return { cleared: false, hp: state.playerHp, words: wordCount, reason: "turn cap" };
}
function playGame(verbose) {
  let hp = DEFAULT_PLAYER_MAX_HP;
  let totalWords = 0;
  const owned = [];
  for (let i = 0; i < ENEMIES.length; i++) {
    const r = playStage(i, hp, owned);
    totalWords += r.words;
    if (!r.cleared) {
      if (verbose) console.log(`Stage ${i + 1} FAILED (${ENEMIES[i].name}): ${r.reason} (HP ${r.hp})`);
      return { won: false, reason: `stage ${i + 1}: ${r.reason}`, totalWords, hp: r.hp, owned };
    }
    hp = i < ENEMIES.length - 1 ? DEFAULT_PLAYER_MAX_HP : r.hp;
    if (verbose)
      console.log(
        `Stage ${i + 1} CLEAR  ${ENEMIES[i].icon} ${ENEMIES[i].name.padEnd(10)} (HP ${ENEMIES[i].maxHp}) -> player HP ${hp}, words ${r.words}`
      );
    if (i < ENEMIES.length - 1) {
      const skill = pickSkill(rollSkillChoices());
      owned.push(skill);
      if (verbose) console.log(`         + skill: ${skill}`);
    }
  }
  return { won: true, totalWords, hp, owned };
}
var args = process.argv.slice(2);
var monteIdx = args.indexOf("--monte");
if (monteIdx >= 0) {
  const n = Number(args[monteIdx + 1] ?? 200);
  let wins = 0;
  const fails = /* @__PURE__ */ new Map();
  for (let seed = 1; seed <= n; seed++) {
    installRng(seed * 2654435761);
    const res = playGame(false);
    if (res.won) wins++;
    else fails.set(res.reason, (fails.get(res.reason) ?? 0) + 1);
  }
  console.log(`Monte-Carlo full-game clear rate: ${wins}/${n} (${(wins / n * 100).toFixed(1)}%)`);
  if (fails.size > 0) {
    console.log("Failure breakdown:");
    for (const [r, c] of [...fails.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${c}x  ${r}`);
  }
} else {
  installRng(12345);
  console.log("=== Shiritori Battle RPG \u2014 full 5-stage E2E completability proof ===");
  console.log(`Dictionary size: ${WORDS.length} words | starting HP: ${DEFAULT_PLAYER_MAX_HP}
`);
  const res = playGame(true);
  if (res.won) {
    console.log(`
\u2705 GAME CLEAR \u2014 all ${ENEMIES.length} stages beaten. Words: ${res.totalWords}, final HP: ${res.hp}, skills: [${res.owned.join(", ")}]`);
    process.exit(0);
  } else {
    console.log(`
\u274C Not cleared: ${res.reason}`);
    process.exit(1);
  }
}
