// ═══════════════════════════════════════════════════════════════════
// petquest.js — PetQuest Virtual Pet Game (Vanilla JS)
// ═══════════════════════════════════════════════════════════════════

(function () {
  "use strict";

  // ═══════════════════════════════════════ DATA ═══════════════════════════════════════

  const PETS = [
    { id: "dog", name: "Dog", emoji: "🐕", color: "#C4813A", bg: "park" },
    { id: "cat", name: "Cat", emoji: "🐈", color: "#888", bg: "apartment" },
    { id: "fish", name: "Fish", emoji: "🐠", color: "#2196F3", bg: "aquarium" },
    { id: "dragon", name: "Dragon", emoji: "🐉", color: "#E64A19", bg: "cave" },
  ];

  const FOOD_MENUS = {
    dog: [
      { name: "Kibble", icon: "🥣", cost: 2, boost: 15, desc: "Standard dry food" },
      { name: "Steak", icon: "🥩", cost: 8, boost: 35, desc: "Premium cut" },
      { name: "Bone", icon: "🦴", cost: 3, boost: 18, desc: "Crunchy treat" },
      { name: "Dog Biscuit", icon: "🍪", cost: 1, boost: 10, desc: "Light snack" },
      { name: "Chicken", icon: "🍗", cost: 5, boost: 25, desc: "Grilled & juicy" },
      { name: "Wet Food", icon: "🥫", cost: 4, boost: 22, desc: "Savory blend" },
    ],
    cat: [
      { name: "Tuna", icon: "🐟", cost: 4, boost: 25, desc: "Fresh catch" },
      { name: "Cat Kibble", icon: "🥣", cost: 2, boost: 15, desc: "Crunchy bites" },
      { name: "Salmon", icon: "🍣", cost: 7, boost: 32, desc: "Premium fillet" },
      { name: "Milk", icon: "🥛", cost: 1, boost: 8, desc: "Warm & creamy" },
      { name: "Chicken Pâté", icon: "🍖", cost: 5, boost: 28, desc: "Smooth blend" },
      { name: "Treat Stick", icon: "🥢", cost: 2, boost: 12, desc: "Chewy delight" },
    ],
    fish: [
      { name: "Fish Flakes", icon: "✨", cost: 1, boost: 12, desc: "Daily staple" },
      { name: "Bloodworms", icon: "🪱", cost: 3, boost: 22, desc: "Protein rich" },
      { name: "Brine Shrimp", icon: "🦐", cost: 4, boost: 28, desc: "Live & fresh" },
      { name: "Algae Wafer", icon: "🟢", cost: 2, boost: 15, desc: "Plant-based" },
      { name: "Tubifex", icon: "🧬", cost: 5, boost: 30, desc: "Premium worms" },
      { name: "Daphnia", icon: "🫧", cost: 3, boost: 20, desc: "Micro crustacean" },
    ],
    dragon: [
      { name: "Fire Pepper", icon: "🌶️", cost: 3, boost: 20, desc: "Spicy & hot" },
      { name: "Raw Meat", icon: "🥩", cost: 6, boost: 30, desc: "Fresh game" },
      { name: "Lava Cake", icon: "🍰", cost: 8, boost: 35, desc: "Molten treat" },
      { name: "Crystal Fruit", icon: "💎", cost: 10, boost: 40, desc: "Magical energy" },
      { name: "Charcoal", icon: "⬛", cost: 2, boost: 12, desc: "Fire starter" },
      { name: "Phoenix Egg", icon: "🥚", cost: 12, boost: 45, desc: "Legendary meal" },
    ],
  };

  /* game: hoops | hoopsGems | gemRush | bubblePop | laserChase | tapOrder | gateRun | sparkleHunt | treasureTap */
  const PLAY_ITEMS = {
    dog: [
      { name: "Fetch Ball", icon: "🎾", cost: 2, boost: 20, game: "hoops" },
      { name: "Frisbee", icon: "🥏", cost: 3, boost: 25, game: "hoopsGems" },
      { name: "Tug Rope", icon: "🪢", cost: 2, boost: 18, game: "gemRush" },
      { name: "Squeaky Toy", icon: "🧸", cost: 4, boost: 30, game: "bubblePop" },
    ],
    cat: [
      { name: "Laser Pointer", icon: "🔴", cost: 2, boost: 22, game: "laserChase" },
      { name: "Yarn Ball", icon: "🧶", cost: 1, boost: 15, game: "gemRush" },
      { name: "Feather Wand", icon: "🪶", cost: 3, boost: 25, game: "hoops" },
      { name: "Cat Tower", icon: "🏰", cost: 5, boost: 35, game: "tapOrder" },
    ],
    fish: [
      { name: "Bubble Ring", icon: "🫧", cost: 2, boost: 18, game: "bubblePop" },
      { name: "Mirror", icon: "🪞", cost: 1, boost: 12, game: "gemRush" },
      { name: "Swim Tunnel", icon: "🌀", cost: 4, boost: 28, game: "gateRun" },
      { name: "Floating Log", icon: "🪵", cost: 3, boost: 22, game: "hoops" },
    ],
    dragon: [
      { name: "Fire Ring", icon: "🔥", cost: 3, boost: 22, game: "sparkleHunt" },
      { name: "Gem Puzzle", icon: "💎", cost: 5, boost: 30, game: "gemRush" },
      { name: "Flight Course", icon: "🌪️", cost: 6, boost: 35, game: "hoopsGems" },
      { name: "Treasure Hunt", icon: "🗺️", cost: 4, boost: 28, game: "treasureTap" },
    ],
  };

  const CLEAN_SERVICE = { name: "Clean", icon: "🛁", cost: 4, boost: 35, desc: "Scrub-a-dub bath" };

  const VET_TREATMENTS = [
    { name: "Basic Checkup", icon: "🩺", cost: 5, boost: 15, desc: "Routine physical exam" },
    { name: "Vaccination", icon: "💉", cost: 10, boost: 25, desc: "Immunity booster" },
    { name: "Full Treatment", icon: "🏥", cost: 20, boost: 40, desc: "Comprehensive care package" },
    { name: "Emergency Care", icon: "🚑", cost: 35, boost: 60, desc: "Intensive treatment" },
  ];

  const QA_QUESTIONS = [
    { q: "How often should you feed most dogs?", opts: ["Once a week", "Twice a day", "Once a month", "Every hour"], ans: 1, pts: 10 },
    { q: "What is the average annual cost of owning a dog?", opts: ["$200", "$500", "$1,500", "$5,000"], ans: 2, pts: 15 },
    { q: "How often should cats visit the vet for checkups?", opts: ["Never", "Once every 5 years", "Once a year", "Every week"], ans: 2, pts: 10 },
    { q: "Which of these is toxic to dogs?", opts: ["Carrots", "Chocolate", "Rice", "Chicken"], ans: 1, pts: 15 },
    { q: "What should you budget for pet emergencies?", opts: ["$0", "$50", "$500-$1000", "Unlimited"], ans: 2, pts: 20 },
    { q: "How long do goldfish typically live?", opts: ["1 year", "5-10 years", "1 month", "20 years"], ans: 1, pts: 10 },
    { q: "What's the best way to bond with a new pet?", opts: ["Ignore it", "Yell at it", "Spend quality time daily", "Feed only"], ans: 2, pts: 10 },
    { q: "Pet insurance typically costs how much per month?", opts: ["$1", "$30-$50", "$500", "$1,000"], ans: 1, pts: 15 },
    { q: "How many hours do cats sleep per day?", opts: ["2-4", "6-8", "12-16", "24"], ans: 2, pts: 10 },
    { q: "What pH level is ideal for freshwater fish?", opts: ["2-3", "6.5-7.5", "10-12", "Any pH"], ans: 1, pts: 15 },
    { q: "What is the biggest cost of pet ownership?", opts: ["Toys", "Food over lifetime", "Collar", "Name tag"], ans: 1, pts: 10 },
    { q: "Why do cats scratch furniture?", opts: ["To be mean", "Mark territory & sharpen claws", "They're bored", "No reason"], ans: 1, pts: 10 },
    { q: "What does microchipping a pet do?", opts: ["Makes them smart", "Helps identify lost pets", "Gives WiFi", "Tracks exercise"], ans: 1, pts: 15 },
    { q: "What is a sign a pet might be sick?", opts: ["Eating normally", "Playing a lot", "Not eating or drinking", "Wagging tail"], ans: 2, pts: 10 },
    { q: "How often should a fish tank be cleaned?", opts: ["Every day", "Every 1-2 weeks", "Once a year", "Never"], ans: 1, pts: 10 },
    { q: "What vitamin do fish get from tank lighting?", opts: ["Vitamin A", "Vitamin D", "Vitamin C", "B12"], ans: 1, pts: 15 },
  ];

  const STAT_DEFS = [
    { key: "hunger", label: "Hunger", color: "#FF9800", icon: "🍖" },
    { key: "happiness", label: "Happiness", color: "#4CAF50", icon: "😊" },
    { key: "energy", label: "Energy", color: "#9C27B0", icon: "⚡" },
    { key: "health", label: "Health", color: "#F44336", icon: "❤️" },
    { key: "cleanliness", label: "Cleanliness", color: "#2196F3", icon: "🫧" },
  ];

  const ACTIONS = [
    { id: "feed", label: "Feed", icon: "🍖", color: "#FF9800", desc: "Kitchen" },
    { id: "play", label: "Play", icon: "🎾", color: "#4CAF50", desc: "Play Area" },
    { id: "rest", label: "Rest", icon: "💤", color: "#9C27B0", desc: "Bedroom" },
    { id: "clean", label: "Clean", icon: "🛁", color: "#2196F3", desc: "Bathroom" },
    { id: "vet", label: "Vet", icon: "💊", color: "#F44336", desc: "Clinic" },
  ];

  const WORK_JOBS = [
    { id: "chores", label: "House Chores", icon: "🧹", pay: 6, desc: "Dishes, sweeping, and tidying up", game: "dirtSweep" },
    { id: "yard", label: "Yard Work", icon: "🌿", pay: 12, desc: "Mow, rake leaves, water plants", game: "leafRake" },
    { id: "walk", label: "Dog Walking", icon: "🐕", pay: 10, desc: "Walk a neighbor’s pet", game: "pawTrace" },
    { id: "tutor", label: "Tutoring", icon: "📚", pay: 18, desc: "Help someone with homework", game: "mathQuiz" },
    { id: "babysit", label: "Babysitting", icon: "👶", pay: 22, desc: "Watch kids for a few hours", game: "babyCatch" },
    { id: "deliver", label: "Delivery & Errands", icon: "🚲", pay: 8, desc: "Pick up groceries or packages", game: "deliveryRun" },
    { id: "garage", label: "Garage Sale Help", icon: "📦", pay: 14, desc: "Set up tables and sell items", game: "garageSort" },
    { id: "tech", label: "Tech Help", icon: "💻", pay: 16, desc: "Fix Wi‑Fi or set up a device", game: "bugSquash" },
  ];

  const ROOM_BG = {
    feed: { dog: "linear-gradient(180deg,#FFF8E1 0%,#FFECB3 60%,#8D6E63 60%,#6D4C41 100%)", cat: "linear-gradient(180deg,#FCE4EC 0%,#F8BBD0 50%,#D7CCC8 50%,#BCAAA4 100%)", fish: "linear-gradient(180deg,#0D47A1 0%,#1565C0 40%,#1B5E20 70%,#0D47A1 100%)", dragon: "linear-gradient(180deg,#1a0a2e 0%,#4A148C 30%,#BF360C 70%,#E65100 100%)" },
    play: { dog: "linear-gradient(180deg,#81D4FA 0%,#4FC3F7 40%,#66BB6A 40%,#43A047 100%)", cat: "linear-gradient(180deg,#F3E5F5 0%,#E1BEE7 40%,#FFCCBC 40%,#FFAB91 100%)", fish: "linear-gradient(180deg,#0097A7 0%,#00838F 50%,#004D40 100%)", dragon: "linear-gradient(180deg,#311B92 0%,#4527A0 50%,#1A237E 100%)" },
    rest: { dog: "linear-gradient(180deg,#1A237E 0%,#283593 40%,#5D4037 40%,#4E342E 100%)", cat: "linear-gradient(180deg,#1A237E 0%,#283593 30%,#4E342E 30%,#3E2723 100%)", fish: "linear-gradient(180deg,#0D47A1 0%,#01579B 50%,#002f6c 100%)", dragon: "linear-gradient(180deg,#0D0221 0%,#1a0533 50%,#261447 100%)" },
    clean: { dog: "linear-gradient(180deg,#E3F2FD 0%,#BBDEFB 50%,#90CAF9 50%,#64B5F6 100%)", cat: "linear-gradient(180deg,#F3E5F5 0%,#E1BEE7 50%,#CE93D8 50%,#BA68C8 100%)", fish: "linear-gradient(180deg,#E0F7FA 0%,#80DEEA 40%,#00ACC1 100%)", dragon: "linear-gradient(180deg,#E8EAF6 0%,#C5CAE9 50%,#7986CB 100%)" },
    vet: { dog: "linear-gradient(180deg,#ECEFF1 0%,#CFD8DC 50%,#B0BEC5 100%)", cat: "linear-gradient(180deg,#ECEFF1 0%,#CFD8DC 50%,#B0BEC5 100%)", fish: "linear-gradient(180deg,#ECEFF1 0%,#CFD8DC 50%,#B0BEC5 100%)", dragon: "linear-gradient(180deg,#ECEFF1 0%,#CFD8DC 50%,#B0BEC5 100%)" },
  };

  const HOME_BG = {
    dog: "linear-gradient(180deg,#64B5F6 0%,#90CAF9 35%,#7CB342 55%,#558B2F 100%)",
    cat: "linear-gradient(180deg,#FFF8E1 0%,#FFECB3 40%,#D7CCC8 40%,#BCAAA4 100%)",
    fish: "linear-gradient(180deg,#0277BD 0%,#01579B 25%,#0D47A1 50%,#0a3d6b 80%,#1B5E20 92%,#2E7D32 100%)",
    dragon: "linear-gradient(180deg,#0D0221 0%,#1a0533 30%,#2d1b4e 60%,#4a1a1a 100%)",
  };

  const HOME_DECOR = {
    dog: `<div style="position:absolute;top:5%;left:15%;width:70px;height:35px;background:rgba(255,255,255,0.7);border-radius:20px"></div><div style="position:absolute;top:8%;right:20%;width:90px;height:40px;background:rgba(255,255,255,0.5);border-radius:25px"></div><div style="position:absolute;top:3%;right:8%;font-size:28px">☀️</div><div style="position:absolute;bottom:42%;left:3%;font-size:42px">🌳</div><div style="position:absolute;bottom:42%;right:5%;font-size:38px">🌳</div><div style="position:absolute;bottom:42%;left:45%;font-size:22px">🌻</div><div style="position:absolute;bottom:38%;right:10%;width:60px;height:45px;background:#8D6E63;border-radius:8px 8px 0 0"></div>`,
    cat: `<div style="position:absolute;bottom:60%;left:3%;width:60px;height:45px;background:#87CEEB;border:5px solid #795548"></div><div style="position:absolute;bottom:35%;left:2%;width:110px;height:55px;background:#8D6E63;border-radius:12px 12px 0 0"></div><div style="position:absolute;bottom:42%;left:8%;width:90px;height:25px;background:#A1887F;border-radius:8px"></div><div style="position:absolute;bottom:35%;right:5%;width:45px;height:80px;background:#795548;border-radius:6px 6px 0 0"></div><div style="position:absolute;top:20%;right:30%;font-size:22px">📚</div><div style="position:absolute;bottom:42%;left:50%;font-size:18px">🧶</div>`,
    fish: `<div style="position:absolute;bottom:0;left:0;right:0;height:8%;background:linear-gradient(180deg,#5D4037,#4E342E)"></div><div style="position:absolute;bottom:7%;left:10%;width:40px;height:28px;background:#78909C;border-radius:8px;opacity:0.7"></div><div style="position:absolute;bottom:7%;right:15%;width:50px;height:35px;background:#90A4AE;border-radius:12px 12px 4px 4px;opacity:0.6"></div><div style="position:absolute;bottom:7%;right:35%;font-size:24px">🪸</div><div style="position:absolute;bottom:5%;left:48%;font-size:14px">🐚</div><div style="position:absolute;bottom:8%;left:35%;font-size:28px">🗝️</div><div style="position:absolute;top:0;left:20%;width:40px;height:60%;background:linear-gradient(180deg,rgba(255,255,255,0.08),transparent);transform:skewX(-5deg)"></div>` + [3,10,18,26,34,42,50,58,66,74,82,90].map((l,i) => `<div style="position:absolute;bottom:6%;left:${l}%;width:${[8,12,9,14,10,11,8,13,10,9,12,8][i]}px;height:${[60,80,50,90,70,55,65,85,45,75,60,50][i]}px;background:${["#2E7D32","#388E3C","#1B5E20","#43A047","#2E7D32","#388E3C","#1B5E20","#43A047","#2E7D32","#388E3C","#1B5E20","#2E7D32"][i]};border-radius:50% 50% 5% 5%;opacity:${[0.9,0.8,0.85,0.9,0.75,0.9,0.8,0.85,0.9,0.8,0.75,0.9][i]}"></div>`).join("") + [8,18,30,45,60,72,85].map((l,i) => `<div style="position:absolute;left:${l}%;top:${8+i*10}%;width:${[5,4,6,4,5,3,5][i]}px;height:${[14,10,16,12,14,10,12][i]}px;background:rgba(255,255,255,0.25);border-radius:10px;animation:rise ${2+i*0.4}s ease-in infinite"></div>`).join(""),
    dragon: `<div style="position:absolute;bottom:0;left:0;right:0;height:20%;background:linear-gradient(180deg,#3E2723,#1a0a00)"></div><div style="position:absolute;bottom:18%;left:10%;width:50px;height:40px;background:#5D4037;border-radius:40% 40% 10% 10%"></div><div style="position:absolute;bottom:18%;right:15%;width:60px;height:50px;background:#4E342E;border-radius:50% 50% 10% 10%"></div><div style="position:absolute;top:8%;left:10%;font-size:16px;opacity:0.6">⭐</div><div style="position:absolute;top:5%;left:30%;font-size:12px;opacity:0.4">✨</div><div style="position:absolute;top:12%;right:15%;font-size:14px;opacity:0.5">⭐</div><div style="position:absolute;bottom:22%;left:35%;font-size:24px">💎</div><div style="position:absolute;bottom:25%;left:60%;font-size:22px">🔥</div>`,
  };

  const ROOM_DECOR = {
    feed: {
      dog: `<div style="position:absolute;bottom:40%;left:5%;width:90px;height:60px;background:#795548;border-radius:8px 8px 0 0"></div><div style="position:absolute;top:15%;left:8%;font-size:32px">🍖</div><div style="position:absolute;bottom:42%;right:10%;font-size:36px">🥣</div><div style="position:absolute;top:10%;right:10%;width:60px;height:40px;background:#BDBDBD;border-radius:6px;border:3px solid #9E9E9E"></div><div style="position:absolute;bottom:42%;left:45%;font-size:28px">🦴</div>`,
      cat: `<div style="position:absolute;bottom:50%;left:5%;width:70px;height:50px;background:#EFEBE9;border-radius:8px;border:2px solid #D7CCC8"></div><div style="position:absolute;top:12%;right:8%;font-size:30px">🐟</div><div style="position:absolute;bottom:52%;left:40%;font-size:32px">🥛</div><div style="position:absolute;top:20%;left:15%;font-size:26px">🍣</div>`,
      fish: `<div style="position:absolute;bottom:0;left:0;right:0;height:25%;background:linear-gradient(180deg,#33691E,#1B5E20)"></div><div style="position:absolute;top:10%;left:15%;font-size:28px">✨</div><div style="position:absolute;top:20%;right:20%;font-size:24px">🦐</div><div style="position:absolute;bottom:28%;left:30%;font-size:26px">🪱</div>` + [15,35,55,75].map((l,i)=>`<div style="position:absolute;left:${l}%;top:${15+i*12}%;width:5px;height:14px;background:rgba(255,255,255,0.25);border-radius:10px;animation:rise ${2+i*0.5}s ease-in infinite"></div>`).join(""),
      dragon: `<div style="position:absolute;bottom:0;left:0;right:0;height:30%;background:linear-gradient(180deg,#D84315,#BF360C)"></div><div style="position:absolute;bottom:28%;left:15%;width:50px;height:35px;background:#424242;border-radius:8px"></div><div style="position:absolute;top:10%;left:10%;font-size:30px">🌶️</div><div style="position:absolute;top:15%;right:15%;font-size:28px">🥩</div><div style="position:absolute;bottom:32%;left:50%;font-size:32px">🍰</div><div style="position:absolute;top:30%;left:40%;font-size:24px">🔥</div>`,
    },
    play: {
      dog: `<div style="position:absolute;bottom:40%;right:10%;font-size:36px">🎾</div><div style="position:absolute;top:12%;left:15%;font-size:30px">🥏</div><div style="position:absolute;top:20%;right:20%;font-size:40px;opacity:0.6">☀️</div>`,
      cat: `<div style="position:absolute;top:15%;right:10%;font-size:30px">🧶</div><div style="position:absolute;bottom:25%;left:15%;width:50px;height:70px;background:#A1887F;border-radius:8px 8px 0 0"></div><div style="position:absolute;top:30%;left:45%;font-size:28px">🪶</div><div style="position:absolute;bottom:40%;right:20%;font-size:24px">🔴</div>`,
      fish: `<div style="position:absolute;top:15%;left:20%;font-size:32px">🫧</div><div style="position:absolute;bottom:20%;left:10%;width:60px;height:30px;background:#00695C;border-radius:20px"></div><div style="position:absolute;top:35%;right:15%;font-size:28px">🪞</div><div style="position:absolute;bottom:25%;right:20%;font-size:26px">🌀</div>`,
      dragon: `<div style="position:absolute;top:12%;left:15%;font-size:36px">🔥</div><div style="position:absolute;bottom:20%;right:15%;font-size:30px">💎</div><div style="position:absolute;top:40%;left:45%;font-size:28px">🌪️</div><div style="position:absolute;top:15%;right:10%;font-size:20px">⭐</div>`,
    },
    rest: {
      dog: `<div style="position:absolute;bottom:15%;left:15%;width:100px;height:40px;background:#8D6E63;border-radius:20px"></div><div style="position:absolute;top:10%;right:10%;font-size:24px">🌙</div><div style="position:absolute;top:8%;left:20%;font-size:18px;opacity:0.5">⭐</div><div style="position:absolute;bottom:40%;right:20%;font-size:28px">💤</div>`,
      cat: `<div style="position:absolute;bottom:10%;left:10%;width:120px;height:50px;background:#5D4037;border-radius:10px 10px 0 0"></div><div style="position:absolute;bottom:20%;left:15%;width:80px;height:25px;background:#BCAAA4;border-radius:12px"></div><div style="position:absolute;top:8%;right:15%;font-size:28px">🌙</div><div style="position:absolute;bottom:45%;left:50%;font-size:24px">💤</div>`,
      fish: `<div style="position:absolute;bottom:0;left:0;right:0;height:30%;background:#1B5E20;opacity:0.6"></div><div style="position:absolute;top:8%;right:15%;font-size:22px;opacity:0.6">🌙</div><div style="position:absolute;bottom:32%;left:35%;width:60px;height:20px;background:rgba(139,195,74,0.4);border-radius:20px"></div><div style="position:absolute;top:25%;left:40%;font-size:28px;opacity:0.5">💤</div>`,
      dragon: `<div style="position:absolute;bottom:0;left:0;right:0;height:25%;background:#1a0533"></div><div style="position:absolute;bottom:20%;left:20%;width:80px;height:30px;background:#4A148C;border-radius:16px"></div><div style="position:absolute;top:5%;right:10%;font-size:22px">🌙</div><div style="position:absolute;bottom:35%;left:45%;font-size:30px;opacity:0.5">💤</div>`,
    },
    clean: {
      dog: `<div style="position:absolute;bottom:20%;left:15%;width:100px;height:50px;background:#E3F2FD;border-radius:30px 30px 0 0;border:4px solid #BBDEFB"></div><div style="position:absolute;top:10%;right:10%;font-size:28px">🛁</div><div style="position:absolute;top:25%;left:10%;font-size:24px">🧴</div><div style="position:absolute;bottom:35%;right:25%;font-size:22px">🫧</div><div style="position:absolute;bottom:30%;left:45%;font-size:20px">🧼</div>`,
      cat: `<div style="position:absolute;bottom:15%;left:20%;width:90px;height:45px;background:#F3E5F5;border-radius:25px 25px 0 0;border:3px solid #CE93D8"></div><div style="position:absolute;top:12%;left:15%;font-size:28px">🧴</div><div style="position:absolute;top:20%;right:15%;font-size:26px">🛁</div><div style="position:absolute;bottom:38%;left:50%;font-size:22px">✨</div>`,
      fish: `<div style="position:absolute;top:10%;left:20%;font-size:28px">🫧</div><div style="position:absolute;top:25%;right:15%;font-size:24px">✨</div><div style="position:absolute;bottom:20%;left:35%;font-size:22px">💧</div>` + [5,20,35,50,65,80].map((l,i)=>`<div style="position:absolute;left:${l}%;top:${10+i*8}%;width:6px;height:16px;background:rgba(255,255,255,0.35);border-radius:10px;animation:rise ${1.5+i*0.4}s ease-in infinite"></div>`).join(""),
      dragon: `<div style="position:absolute;bottom:20%;left:15%;width:100px;height:45px;background:rgba(255,255,255,0.15);border-radius:30px 30px 0 0"></div><div style="position:absolute;top:15%;right:10%;font-size:28px">🛁</div><div style="position:absolute;top:25%;left:15%;font-size:24px">🧴</div><div style="position:absolute;bottom:35%;left:50%;font-size:20px">🫧</div>`,
    },
    vet: {
      _all: `<div style="position:absolute;bottom:0;left:0;right:0;height:30%;background:#ECEFF1"></div><div style="position:absolute;top:8%;left:10%;width:60px;height:40px;background:white;border-radius:8px;border:2px solid #90A4AE;display:flex;align-items:center;justify-content:center"><span style="font-size:28px">➕</span></div><div style="position:absolute;bottom:32%;left:10%;width:90px;height:30px;background:white;border-radius:6px;border:2px solid #B0BEC5"></div><div style="position:absolute;top:15%;right:10%;font-size:36px">🩺</div><div style="position:absolute;bottom:35%;right:15%;font-size:28px">💊</div><div style="position:absolute;top:45%;left:40%;font-size:22px">🏥</div>`,
    },
  };

  const ROOM_TITLES = { feed: "Kitchen", play: "Play Area", rest: "Bedroom", clean: "Bathroom", vet: "Vet Clinic" };

  // ═══════════════════════════════════════ PET SVG BUILDER ═══════════════════════════════════════

  function petSVG(id, mood, size) {
    size = size || 80;
    const h = mood === "happy";
    const s = mood === "sad";
    const svgs = {
      dog: `<svg viewBox="0 0 80 80" width="${size}" height="${size}"><ellipse cx="40" cy="55" rx="22" ry="18" fill="#C4813A"/><circle cx="40" cy="32" r="18" fill="#C4813A"/><ellipse cx="32" cy="20" rx="7" ry="10" fill="#C4813A" transform="rotate(-15 32 20)"/><ellipse cx="48" cy="20" rx="7" ry="10" fill="#C4813A" transform="rotate(15 48 20)"/><circle cx="34" cy="30" r="3" fill="#222"/><circle cx="46" cy="30" r="3" fill="#222"/><circle cx="35" cy="29" r="1" fill="white"/><circle cx="47" cy="29" r="1" fill="white"/><ellipse cx="40" cy="38" rx="7" ry="5" fill="#A0522D"/>${h?'<path d="M34 41 Q40 46 46 41" stroke="#222" stroke-width="1.5" fill="none" stroke-linecap="round"/>':s?'<path d="M34 44 Q40 40 46 44" stroke="#222" stroke-width="1.5" fill="none" stroke-linecap="round"/>':'<line x1="35" y1="42" x2="45" y2="42" stroke="#222" stroke-width="1.5" stroke-linecap="round"/>'}<ellipse cx="40" cy="72" rx="8" ry="5" fill="#A0522D"/></svg>`,
      cat: `<svg viewBox="0 0 80 80" width="${size}" height="${size}"><ellipse cx="40" cy="55" rx="20" ry="17" fill="#888"/><circle cx="40" cy="33" r="17" fill="#888"/><polygon points="28,20 22,8 33,18" fill="#888"/><polygon points="52,20 58,8 47,18" fill="#888"/><circle cx="34" cy="31" r="3" fill="#1a1a1a"/><circle cx="46" cy="31" r="3" fill="#1a1a1a"/><circle cx="35" cy="30" r="1" fill="white"/><circle cx="47" cy="30" r="1" fill="white"/><ellipse cx="40" cy="37" rx="4" ry="3" fill="#FF8FAB"/>${h?'<path d="M35 40 Q40 45 45 40" stroke="#333" stroke-width="1.5" fill="none"/>':''}<line x1="26" y1="35" x2="36" y2="37" stroke="#555" stroke-width="1"/><line x1="44" y1="37" x2="54" y2="35" stroke="#555" stroke-width="1"/><path d="M30 65 Q40 72 50 65" stroke="#888" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
      fish: `<svg viewBox="0 0 80 60" width="${size}" height="${size*0.75}"><ellipse cx="38" cy="30" rx="22" ry="14" fill="#FF8C42"/><polygon points="60,30 72,20 72,40" fill="#FF6B35"/><polygon points="30,18 22,10 28,22" fill="#FF8C42" opacity="0.7"/><polygon points="30,42 22,50 28,38" fill="#FF8C42" opacity="0.7"/><circle cx="24" cy="27" r="4" fill="#222"/><circle cx="23" cy="26" r="1.5" fill="white"/>${h?'<path d="M26 32 Q30 36 34 32" stroke="#222" stroke-width="1.5" fill="none"/>':''}<line x1="35" y1="18" x2="35" y2="42" stroke="rgba(255,255,255,0.4)" stroke-width="1"/><line x1="45" y1="18" x2="45" y2="42" stroke="rgba(255,255,255,0.3)" stroke-width="1"/></svg>`,
      dragon: `<svg viewBox="0 0 90 90" width="${size}" height="${size}"><ellipse cx="45" cy="58" rx="22" ry="20" fill="#E64A19"/><circle cx="45" cy="35" r="18" fill="#E64A19"/><polygon points="35,18 28,4 38,16" fill="#FF8F00"/><polygon points="55,18 62,4 52,16" fill="#FF8F00"/><path d="M30 22 Q20 14 18 24" stroke="#E64A19" stroke-width="4" fill="none"/><path d="M60 22 Q70 14 72 24" stroke="#E64A19" stroke-width="4" fill="none"/><circle cx="38" cy="33" r="3.5" fill="#FDD835"/><circle cx="52" cy="33" r="3.5" fill="#FDD835"/><circle cx="38" cy="33" r="1.5" fill="#222"/><circle cx="52" cy="33" r="1.5" fill="#222"/><ellipse cx="45" cy="42" rx="3" ry="2" fill="#BF360C"/>${h?'<path d="M39 45 Q45 50 51 45" stroke="#BF360C" stroke-width="1.5" fill="none"/>':''}<ellipse cx="45" cy="75" rx="14" ry="6" fill="#E64A19"/><polygon points="35,54 20,50 22,56" fill="#E64A19" opacity="0.5"/><polygon points="55,54 70,50 68,56" fill="#E64A19" opacity="0.5"/></svg>`,
    };
    return svgs[id] || svgs.dog;
  }

  // ═══════════════════════════════════════ STATE ═══════════════════════════════════════

  let state = {
    screen: "setup",
    petName: "",
    petId: null,
    stats: { hunger: 80, happiness: 80, energy: 80, health: 80, cleanliness: 80 },
    coins: 50,
    expenses: [],
    activeTab: "home",
    activeRoom: null,
    // chat
    chatHistory: [],
    // evolution system
    level: 1,
    activityCounts: { feed: 0, play: 0, rest: 0, clean: 0, vet: 0 },
  };

  let decayTimer = null;
  let homeMoveTimer = null;
  let roomMoveTimer = null;
  let minigameDecayTimer = null;
  let minigameContext = null;

  const MINIGAME_DECAY_MULT = 3;
  const FEED_ING_POOL = ["🥕", "🥩", "🧂", "🧈", "🥬", "🌽", "🍳", "🥛", "🧄", "🫒"];

  // ═══════════════════════════════════════ HELPERS ═══════════════════════════════════════

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  function getMood() {
    const avg = Object.values(state.stats).reduce((a, b) => a + b, 0) / 5;
    if (avg > 75) return { key: "happy", emoji: "😄", label: "Thriving!" };
    if (avg > 55) return { key: "neutral", emoji: "😊", label: "Happy" };
    if (avg > 35) return { key: "sad", emoji: "😐", label: "Okay" };
    return { key: "sick", emoji: "😢", label: "Needs Care!" };
  }

  function pet() { return PETS.find(p => p.id === state.petId); }

  // ═══════════════════════════════════════ EVOLUTION SYSTEM ═══════════════════════════════════════

  // Level milestones: each level requires cumulative activity counts
  const LEVEL_MILESTONES = [
    { level: 1,  feed: 0,  play: 0,  rest: 0,  clean: 0, vet: 0 },
    { level: 2,  feed: 3,  play: 2,  rest: 2,  clean: 1, vet: 0 },
    { level: 3,  feed: 6,  play: 4,  rest: 4,  clean: 3, vet: 1 },
    { level: 4,  feed: 10, play: 7,  rest: 6,  clean: 5, vet: 2 },
    { level: 5,  feed: 15, play: 10, rest: 9,  clean: 7, vet: 3 },
    { level: 6,  feed: 21, play: 14, rest: 12, clean: 10, vet: 5 },
    { level: 7,  feed: 28, play: 18, rest: 16, clean: 13, vet: 7 },
    { level: 8,  feed: 36, play: 23, rest: 20, clean: 17, vet: 9 },
    { level: 9,  feed: 45, play: 28, rest: 25, clean: 21, vet: 12 },
    { level: 10, feed: 55, play: 34, rest: 30, clean: 26, vet: 15 },
  ];

  function getPetSize() {
    // Level 1 = 50px, Level 10 = 130px, linear interpolation
    return 50 + (state.level - 1) * (80 / 9);
  }

  function getRoomPetSize() {
    return 40 + (state.level - 1) * (40 / 9);
  }

  function checkLevelUp() {
    if (state.level >= 10) return;
    const next = LEVEL_MILESTONES[state.level]; // next milestone (0-indexed: level2 is at index 1)
    if (!next) return;
    const ac = state.activityCounts;
    if (ac.feed >= next.feed && ac.play >= next.play && ac.rest >= next.rest && ac.clean >= next.clean && ac.vet >= next.vet) {
      state.level = next.level;
      updateLevelDisplays();
      renderHomeEnv();
      showLevelUpPopup(state.level);
      // Check if we jumped multiple levels
      checkLevelUp();
    }
  }

  function trackActivity(room) {
    if (state.activityCounts[room] !== undefined) {
      state.activityCounts[room]++;
      checkLevelUp();
    }
  }

  function updateLevelDisplays() {
    const badge = $("#top-level-badge");
    if (badge) badge.textContent = "Lv " + state.level;
    const hBadge = $("#habitat-level-badge");
    if (hBadge) hBadge.textContent = "⭐ Lv " + state.level;
  }

  function showPopup(icon, title, subtitle, bodyHTML, btnText, extraClass) {
    const ov = $("#popup-overlay");
    ov.innerHTML = `
      <div class="popup-panel ${extraClass || ''}">
        <div class="popup-icon">${icon}</div>
        <div class="popup-title">${title}</div>
        ${subtitle ? `<div class="popup-subtitle">${subtitle}</div>` : ''}
        <div class="popup-body">${bodyHTML}</div>
        <button class="popup-btn" id="popup-close-btn">${btnText}</button>
      </div>`;
    ov.classList.remove("hidden");
    document.getElementById("popup-close-btn").addEventListener("click", () => {
      ov.classList.add("hidden");
      ov.innerHTML = "";
    });
  }

  function showWelcomePopup() {
    const p = pet();
    showPopup(
      p.emoji,
      "Welcome to PetQuest!",
      `You've adopted ${state.petName} the ${p.name}! (Level 1)`,
      `<b>How to care for your pet:</b><br><br>
      🍖 <b>Feed</b> — Visit the kitchen to buy food and keep your pet well fed.<br>
      🎾 <b>Play</b> — Buy toys and play minigames to boost happiness.<br>
      💤 <b>Rest</b> — Let your pet sleep to restore energy (free!).<br>
      🛁 <b>Clean</b> — Give baths to keep cleanliness high.<br>
      💊 <b>Vet</b> — Visit the clinic when health drops.<br>
      💼 <b>Work</b> — Complete jobs to earn money for pet care.<br><br>
      <b>⭐ Evolution:</b> As you feed, play, rest, clean, and visit the vet, your pet will level up and <b>grow bigger</b> — all the way to <b>Level 10!</b>`,
      "Let's Go! 🎉",
      ""
    );
  }

  function showLevelUpPopup(newLevel) {
    const p = pet();
    const sizeLabel = newLevel <= 3 ? "Small" : newLevel <= 6 ? "Medium" : newLevel <= 9 ? "Large" : "Maximum";
    showPopup(
      "🎉",
      `Level ${newLevel}!`,
      `${state.petName} evolved and grew bigger!`,
      `${p.emoji} <b>${state.petName}</b> is now <b>Level ${newLevel}</b>!<br><br>
      Size: <b>${sizeLabel}</b> ${newLevel >= 10 ? "— Fully grown! 🏆" : ""}<br><br>
      <b>Activity Progress:</b><br>
      🍖 Fed: ${state.activityCounts.feed} times<br>
      🎾 Played: ${state.activityCounts.play} times<br>
      💤 Rested: ${state.activityCounts.rest} times<br>
      🛁 Cleaned: ${state.activityCounts.clean} times<br>
      💊 Vet visits: ${state.activityCounts.vet} times`,
      newLevel >= 10 ? "Amazing! 🏆" : "Keep Going! ⭐",
      "level-up"
    );
  }

  // ═══════════════════════════════════════ SCREEN MANAGEMENT ═══════════════════════════════════════

  function showScreen(id) {
    $$(".screen").forEach(s => s.classList.remove("active"));
    $(`#${id}`).classList.add("active");
  }

  // ═══════════════════════════════════════ SETUP ═══════════════════════════════════════

  function setTheme(isDark) {
    const g = $("#game-screen");
    const r = $("#room-screen");
    if (g) g.classList.toggle("theme-dark", isDark);
    if (r) r.classList.toggle("theme-dark", isDark);
    try { localStorage.setItem("petquest-theme", isDark ? "dark" : "light"); } catch (e) { /* ignore */ }
    const btn = $("#theme-toggle");
    if (btn) {
      btn.textContent = isDark ? "☀️" : "🌙";
      btn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    }
    requestAnimationFrame(() => requestAnimationFrame(fitSidebarMoney));
  }

  function applyStoredThemeToGameScreens() {
    let dark = false;
    try { dark = localStorage.getItem("petquest-theme") === "dark"; } catch (e) { /* ignore */ }
    setTheme(dark);
  }

  function fitSidebarMoney() {
    const amount = $("#sidebar-balance-amount");
    const wrap = $("#sidebar-balance");
    if (!amount || !wrap) return;
    amount.textContent = "$" + state.coins;
    const maxW = wrap.clientWidth - 2;
    if (maxW <= 0) {
      amount.style.fontSize = "100px";
      return;
    }
    let low = 100;
    let high = 320;
    for (let i = 0; i < 26; i++) {
      const mid = (low + high) / 2;
      amount.style.fontSize = mid + "px";
      if (amount.scrollWidth <= maxW) low = mid;
      else high = mid;
    }
    amount.style.fontSize = Math.round(Math.max(100, Math.min(318, low))) + "px";
  }

  function resetAppToHome() {
    if (!confirm("Are you sure? This will reset your pet and all progress and return to the start screen.")) return;
    if (decayTimer) clearInterval(decayTimer);
    if (homeMoveTimer) clearInterval(homeMoveTimer);
    if (roomMoveTimer) clearInterval(roomMoveTimer);
    decayTimer = homeMoveTimer = roomMoveTimer = null;
    state = {
      screen: "setup",
      petName: "",
      petId: null,
      stats: { hunger: 80, happiness: 80, energy: 80, health: 80, cleanliness: 80 },
      coins: 50,
      expenses: [],
      activeTab: "home",
      activeRoom: null,
      chatHistory: [],
      level: 1,
      activityCounts: { feed: 0, play: 0, rest: 0, clean: 0, vet: 0 },
    };
    state._gameUIBound = false;
    const inp = $("#pet-name-input");
    if (inp) inp.value = "";
    $$(".pet-select-btn").forEach((b) => b.classList.remove("selected"));
    const ne = $("#name-error");
    if (ne) { ne.textContent = ""; ne.style.display = "none"; }
    showScreen("setup-screen");
  }

  function initSetup() {
    const grid = $("#pet-select-grid");
    grid.innerHTML = PETS.map(p => `<button class="pet-select-btn" data-pet="${p.id}"><span class="emoji">${p.emoji}</span><span class="label">${p.name}</span></button>`).join("");
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".pet-select-btn");
      if (!btn) return;
      $$(".pet-select-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      state.petId = btn.dataset.pet;
    });
    $("#start-btn").addEventListener("click", startGame);
    $("#pet-name-input").addEventListener("input", () => { $("#name-error").style.display = "none"; });
    $("#top-home-btn").addEventListener("click", resetAppToHome);
    $("#theme-toggle").addEventListener("click", () => {
      const isDark = $("#game-screen").classList.contains("theme-dark");
      setTheme(!isDark);
    });
    window.addEventListener("resize", () => {
      const gs = $("#game-screen");
      if (gs && gs.classList.contains("active")) fitSidebarMoney();
    });
  }

  function startGame() {
    const name = $("#pet-name-input").value.trim();
    const err = $("#name-error");
    if (!name) { err.textContent = "Please enter a name!"; err.style.display = "block"; return; }
    if (name.length > 20) { err.textContent = "Max 20 characters"; err.style.display = "block"; return; }
    if (!state.petId) { err.textContent = "Please choose a pet!"; err.style.display = "block"; return; }
    state.petName = name;
    state.screen = "game";
    showScreen("game-screen");
    applyStoredThemeToGameScreens();
    renderGame();
    bindGameUIClicksOnce();
    startDecay();
    startHomeMove();
    updateLevelDisplays();
    requestAnimationFrame(() => requestAnimationFrame(fitSidebarMoney));
    // Show welcome popup after a brief delay so the game screen renders first
    setTimeout(() => showWelcomePopup(), 400);
  }

  // ═══════════════════════════════════════ STAT DECAY ═══════════════════════════════════════

  function startDecay() {
    if (decayTimer) clearInterval(decayTimer);
    decayTimer = setInterval(() => {
      const s = state.stats;
      s.hunger = Math.max(0, s.hunger - 0.3);
      s.happiness = Math.max(0, s.happiness - 0.2);
      s.energy = Math.max(0, s.energy - 0.15);
      s.health = Math.max(0, s.health - (s.hunger < 20 ? 0.3 : 0.05));
      s.cleanliness = Math.max(0, s.cleanliness - 0.1);
      updateStats();
      updateTopBar();
    }, 2000);
  }

  // ═══════════════════════════════════════ HOME PET MOVEMENT ═══════════════════════════════════════

  function startHomeMove() {
    if (homeMoveTimer) clearInterval(homeMoveTimer);
    const el = $("#home-pet");
    homeMoveTimer = setInterval(() => {
      el.style.left = (10 + Math.random() * 70) + "%";
      el.style.top = (20 + Math.random() * 50) + "%";
    }, 2800);
  }

  function startRoomMove() {
    if (roomMoveTimer) clearInterval(roomMoveTimer);
    const el = $("#room-pet");
    roomMoveTimer = setInterval(() => {
      el.style.left = (20 + Math.random() * 55) + "%";
      el.style.top = (40 + Math.random() * 30) + "%";
    }, 2500);
  }

  // ═══════════════════════════════════════ RENDER GAME ═══════════════════════════════════════

  function renderGame() {
    renderTopBar();
    renderHomeEnv();
    renderStats();
    renderActions();
    renderTip();
    renderBottomNav();
    renderChat();
    renderWork();
    renderReports();
  }

  function bindGameUIClicksOnce() {
    if (state._gameUIBound) return;
    state._gameUIBound = true;

    $("#bottom-nav").addEventListener("click", (e) => {
      const btn = e.target.closest(".nav-btn");
      if (!btn) return;
      state.activeTab = btn.dataset.tab;
      $$(".tab-pane").forEach((p) => p.classList.remove("active"));
      const pane = $(`#tab-${state.activeTab}`);
      if (pane) pane.classList.add("active");
      $$(".nav-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (state.activeTab === "reports") renderReports();
      if (state.activeTab === "work") renderWork();
    });

    $("#actions-grid").addEventListener("click", (e) => {
      const actBtn = e.target.closest(".action-btn");
      if (!actBtn) return;
      openRoom(actBtn.dataset.action);
    });

    $("#work-container").addEventListener("click", (e) => {
      const jobBtn = e.target.closest(".work-job-card");
      if (!jobBtn) return;
      const job = WORK_JOBS.find((j) => j.id === jobBtn.dataset.job);
      if (!job) return;
      openWorkMinigame(job);
    });
  }

  function renderTopBar() { updateTopBar(); }

  function updateTopBar() {
    const m = getMood();
    $("#top-pet-name").textContent = state.petName;
    $("#top-pet-type").textContent = pet().name + " · " + m.label;
    $("#top-coins").textContent = "💵 $" + state.coins;
    $("#top-mood").textContent = m.emoji;
    updateLevelDisplays();
    fitSidebarMoney();
    const wb = $("#work-balance-display");
    if (wb) wb.textContent = "$" + state.coins;
  }

  function renderHomeEnv() {
    const id = state.petId;
    const m = getMood();
    $("#home-bg").style.background = HOME_BG[id];
    $("#home-decorations").innerHTML = HOME_DECOR[id] || "";
    $("#home-speech").textContent = m.key === "happy" ? "I'm so happy! 😊" : m.key === "sad" ? "I need care 💙" : m.key === "sick" ? "I feel sick 🤒" : "Hi! I'm " + state.petName + " 👋";
    $("#home-pet").innerHTML = petSVG(id, m.key, Math.round(getPetSize()));
    $("#home-pet").onclick = () => showHomeReaction("❤️");
    updateLevelDisplays();
  }

  function showHomeReaction(emoji) {
    const el = $("#home-pet");
    const r = document.createElement("div");
    r.className = "reaction";
    r.textContent = emoji;
    el.appendChild(r);
    setTimeout(() => r.remove(), 1000);
  }

  function updateStats() {
    STAT_DEFS.forEach(sd => {
      const fill = $(`#stat-fill-${sd.key}`);
      const val = $(`#stat-val-${sd.key}`);
      if (fill) fill.style.width = state.stats[sd.key] + "%";
      if (val) val.textContent = Math.round(state.stats[sd.key]) + "%";
    });
  }

  function renderStats() {
    $("#stats-container").innerHTML = STAT_DEFS.map(sd => `
      <div class="stat-row">
        <span class="icon">${sd.icon}</span>
        <div class="bar-wrap">
          <div class="bar-labels"><span class="bar-label">${sd.label}</span><span class="bar-value" id="stat-val-${sd.key}">${Math.round(state.stats[sd.key])}%</span></div>
          <div class="bar-track"><div class="bar-fill" id="stat-fill-${sd.key}" style="width:${state.stats[sd.key]}%;background:linear-gradient(90deg,${sd.color}AA,${sd.color})"></div></div>
        </div>
      </div>`).join("");
  }

  function renderActions() {
    $("#actions-grid").innerHTML = ACTIONS.map(a => `
      <button class="action-btn" data-action="${a.id}" style="border-color:${a.color}30">
        <div class="act-icon">${a.icon}</div>
        <div class="act-label" style="color:${a.color}">${a.label}</div>
        <div class="act-desc">${a.desc}</div>
      </button>`).join("");
  }

  function renderTip() {
    const s = state.stats;
    const tip = s.hunger < 30 ? "⚠️ Your pet is hungry! Tap Feed to visit the kitchen." :
      s.health < 40 ? "🏥 Your pet needs a vet visit! Health is getting low." :
      s.energy < 30 ? "😴 Your pet is tired! Let them rest in the bedroom." :
      s.cleanliness < 30 ? "🛁 Time for a bath! Visit the bathroom." :
      "✅ Great job! Keep up with regular care to maintain happiness.";
    $("#care-tip").textContent = tip;
  }

  function renderBottomNav() {
    const p = pet();
    const tabs = [
      { id: "home", label: "Pet", icon: p.emoji },
      { id: "qa", label: "Chat", icon: "💬" },
      { id: "work", label: "Work", icon: "💼" },
      { id: "reports", label: "Reports", icon: "📊" },
    ];
    $("#bottom-nav").innerHTML = tabs.map(t => `
      <button class="nav-btn ${state.activeTab===t.id?'active':''}" data-tab="${t.id}">
        <span class="nav-icon">${t.icon}</span>
        <span class="nav-label">${t.label}</span>
        <div class="nav-dot"></div>
      </button>`).join("");
  }

  // ═══════════════════════════════════════ ACTION ROOM ═══════════════════════════════════════

  function openRoom(room) {
    state.activeRoom = room;
    showScreen("room-screen");
    renderRoom();
    startRoomMove();
  }

  function closeRoom() {
    const ov = $("#minigame-overlay");
    if (ov && !ov.classList.contains("hidden")) {
      closeMinigameOverlay(false);
    }
    if (roomMoveTimer) clearInterval(roomMoveTimer);
    state.activeRoom = null;
    showScreen("game-screen");
    renderGame();
    startHomeMove();
  }

  function renderRoom() {
    const room = state.activeRoom;
    const id = state.petId;
    const m = getMood();

    $("#room-title").textContent = ROOM_TITLES[room];
    $("#room-coins").textContent = "💵 $" + state.coins;
    $("#room-bg").style.background = ROOM_BG[room][id];
    $("#room-decorations").innerHTML = (ROOM_DECOR[room]?._all || ROOM_DECOR[room]?.[id]) || "";
    $("#room-pet").innerHTML = petSVG(id, m.key, Math.round(getRoomPetSize()));
    $("#room-back-btn").onclick = closeRoom;

    const container = $("#room-items");
    if (room === "rest") {
      container.innerHTML = `<div class="rest-panel"><div class="rest-icon">💤</div><div class="rest-title">Rest Time</div><div class="rest-desc">Let ${state.petName} sleep to restore energy. Resting is free!</div><button class="rest-btn" id="rest-action-btn">😴 Put ${state.petName} to Sleep</button></div>`;
      $("#rest-action-btn").onclick = () => { applyRoomAction(room, 0, 40, null); showRoomReaction("😴"); };
    } else {
      const items =
        room === "feed"
          ? FOOD_MENUS[id]
          : room === "play"
            ? PLAY_ITEMS[id]
            : room === "vet"
              ? VET_TREATMENTS
              : room === "clean"
                ? [CLEAN_SERVICE]
                : [];
      container.innerHTML = `<div class="items-grid">${items.map((item, i) => `
        <button type="button" class="item-card ${state.coins < item.cost ? "disabled" : ""}" data-idx="${i}">
          <div class="item-icon">${item.icon}</div>
          <div class="item-name">${item.name}</div>
          ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ""}
          <div class="item-meta"><span class="item-cost">$${item.cost}</span><span class="item-boost">+${item.boost}%</span></div>
        </button>`).join("")}</div>`;
      container.onclick = (e) => {
        const card = e.target.closest(".item-card");
        if (!card || card.classList.contains("disabled")) return;
        const item = items[parseInt(card.dataset.idx, 10)];
        if (!item || state.coins < item.cost) { showRoomReaction("💸"); return; }
        if (room === "feed") {
          openFeedMinigame(item, room, items, container);
        } else if (room === "play") {
          openPlayMinigame(item, room, items, container);
        } else if (room === "clean") {
          openCleanMinigame(item, room, items, container);
        } else {
          card.classList.add("active");
          const detail = item.name + " · " + ROOM_TITLES[room];
          applyRoomAction(room, item.cost, item.boost, detail);
          showRoomReaction(room === "vet" ? "💊" : "✨");
          setTimeout(() => card.classList.remove("active"), 800);
          refreshRoomItemCards(container, items);
        }
      };
    }
  }

  function refreshRoomItemCards(container, items) {
    $("#room-coins").textContent = "💵 $" + state.coins;
    if (!container || !items) return;
    container.querySelectorAll(".item-card").forEach((c, ci) => {
      c.classList.toggle("disabled", state.coins < items[ci].cost);
    });
  }

  function spendCoins(room, cost, label) {
    if (cost <= 0) return true;
    if (state.coins < cost) return false;
    state.coins -= cost;
    state.expenses.push({
      type: room,
      amount: cost,
      date: Date.now(),
      label: label || null,
      isIncome: false,
    });
    return true;
  }

  function grantRoomBoost(room, boost) {
    const map = {
      feed: { hunger: boost, health: Math.round(boost * 0.15) },
      play: { happiness: boost, energy: -Math.round(boost * 0.3) },
      rest: { energy: boost, happiness: Math.round(boost * 0.1) },
      clean: { cleanliness: boost, health: Math.round(boost * 0.1) },
      vet: { health: boost, cleanliness: Math.round(boost * 0.2) },
    };
    const b = map[room] || {};
    Object.entries(b).forEach(([k, v]) => {
      state.stats[k] = clamp((state.stats[k] || 0) + v, 0, 100);
    });
    updateStats();
    updateTopBar();
  }

  function applyRoomAction(room, cost, boost, expenseLabel) {
    if (!spendCoins(room, cost, expenseLabel || null)) return;
    grantRoomBoost(room, boost);
    trackActivity(room);
    updateTopBar();
  }

  function refundLastItemPurchase(room, cost) {
    state.coins += cost;
    const e = state.expenses[state.expenses.length - 1];
    if (e && !e.isIncome && e.type === room && e.amount === cost) {
      state.expenses.pop();
    }
    updateTopBar();
  }

  function startMinigameDecay() {
    if (minigameDecayTimer) clearInterval(minigameDecayTimer);
    if (decayTimer) {
      clearInterval(decayTimer);
      decayTimer = null;
    }
    minigameDecayTimer = setInterval(() => {
      const s = state.stats;
      const m = MINIGAME_DECAY_MULT;
      s.hunger = Math.max(0, s.hunger - 0.3 * m);
      s.happiness = Math.max(0, s.happiness - 0.2 * m);
      s.energy = Math.max(0, s.energy - 0.15 * m);
      s.health = Math.max(0, s.health - (s.hunger < 20 ? 0.3 * m : 0.05 * m));
      s.cleanliness = Math.max(0, s.cleanliness - 0.1 * m);
      updateStats();
      updateTopBar();
    }, 350);
  }

  function stopMinigameDecay() {
    if (minigameDecayTimer) {
      clearInterval(minigameDecayTimer);
      minigameDecayTimer = null;
    }
    startDecay();
  }

  function closeMinigameOverlay(success) {
    $("#minigame-overlay").classList.add("hidden");
    $("#minigame-overlay").setAttribute("aria-hidden", "true");
    $("#minigame-body").innerHTML = "";
    stopMinigameDecay();
    const ctx = minigameContext;
    minigameContext = null;
    if (!success && ctx) {
      refundLastItemPurchase(ctx.room, ctx.cost);
      refreshRoomItemCards(ctx.container, ctx.items);
    } else if (ctx) {
      refreshRoomItemCards(ctx.container, ctx.items);
    }
  }

  function openFeedMinigame(item, room, items, container) {
    const detail = item.name + " · " + ROOM_TITLES[room];
    if (!spendCoins(room, item.cost, detail)) {
      showRoomReaction("💸");
      return;
    }
    minigameContext = { type: "feed", item, room, items, container, cost: item.cost };
    $("#minigame-title").textContent = "Kitchen — prepare " + item.name;
    $("#minigame-body").innerHTML = "";
    mountFeedMinigame(item);
    $("#minigame-overlay").classList.remove("hidden");
    $("#minigame-overlay").setAttribute("aria-hidden", "false");
    $("#minigame-abort").onclick = () => {
      if (confirm("Leave the kitchen? Your purchase will be refunded.")) closeMinigameOverlay(false);
    };
    $("#room-coins").textContent = "💵 $" + state.coins;
    refreshRoomItemCards(container, items);
    startMinigameDecay();
  }

  function openPlayMinigame(item, room, items, container) {
    const detail = item.name + " · " + ROOM_TITLES[room];
    if (!spendCoins(room, item.cost, detail)) {
      showRoomReaction("💸");
      return;
    }
    minigameContext = { type: "play", item, room, items, container, cost: item.cost };
    $("#minigame-title").textContent = "Playtime — " + item.name;
    $("#minigame-body").innerHTML = "";
    mountPlayMinigame(item);
    $("#minigame-overlay").classList.remove("hidden");
    $("#minigame-overlay").setAttribute("aria-hidden", "false");
    $("#minigame-abort").onclick = () => {
      if (confirm("End playtime? Your purchase will be refunded.")) closeMinigameOverlay(false);
    };
    $("#room-coins").textContent = "💵 $" + state.coins;
    refreshRoomItemCards(container, items);
    startMinigameDecay();
  }

  function openCleanMinigame(item, room, items, container) {
    const detail = item.name + " · " + ROOM_TITLES[room];
    if (!spendCoins(room, item.cost, detail)) {
      showRoomReaction("💸");
      return;
    }
    minigameContext = { type: "clean", item, room, items, container, cost: item.cost };
    $("#minigame-title").textContent = "Bathroom — " + item.name;
    $("#minigame-body").innerHTML = "";
    mountCleanMinigame(item);
    $("#minigame-overlay").classList.remove("hidden");
    $("#minigame-overlay").setAttribute("aria-hidden", "false");
    $("#minigame-abort").onclick = () => {
      if (confirm("Leave the bath? Your purchase will be refunded.")) closeMinigameOverlay(false);
    };
    $("#room-coins").textContent = "💵 $" + state.coins;
    refreshRoomItemCards(container, items);
    startMinigameDecay();
  }

  function pointInRect(px, py, rect) {
    return px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom;
  }

  function centerOf(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  function attachDrag(el, onRelease) {
    let drag = null;
    const onDown = (e) => {
      e.preventDefault();
      try {
        el.setPointerCapture(e.pointerId);
      } catch (err) { /* ignore */ }
      const r = el.getBoundingClientRect();
      drag = { id: e.pointerId, ox: e.clientX - r.left, oy: e.clientY - r.top };
      el.style.position = "fixed";
      el.style.left = r.left + "px";
      el.style.top = r.top + "px";
      el.style.zIndex = "3000";
    };
    const onMove = (e) => {
      if (!drag || drag.id !== e.pointerId) return;
      el.style.left = e.clientX - drag.ox + "px";
      el.style.top = e.clientY - drag.oy + "px";
    };
    const onUp = (e) => {
      if (!drag || drag.id !== e.pointerId) return;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) { /* ignore */ }
      drag = null;
      onRelease(el);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  }

  /** Drag inside a positioned scene using pixel left/top (avoids fixed + broken % snap). */
  function attachDragInScene(el, scene, opts) {
    opts = opts || {};
    const onRelease = opts.onRelease;
    const onDrag = opts.onDrag;
    let drag = null;

    function sceneRect() {
      return scene.getBoundingClientRect();
    }

    function setPosPx(clientX, clientY, relOx, relOy) {
      const sr = sceneRect();
      const ew = el.offsetWidth || 48;
      const eh = el.offsetHeight || 48;
      let nx = clientX - sr.left - relOx;
      let ny = clientY - sr.top - relOy;
      nx = clamp(nx, 0, Math.max(0, sr.width - ew));
      ny = clamp(ny, 0, Math.max(0, sr.height - eh));
      el.style.position = "absolute";
      el.style.left = nx + "px";
      el.style.top = ny + "px";
      el.style.right = "auto";
      el.style.bottom = "auto";
      el.style.transform = "none";
    }

    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      try {
        el.setPointerCapture(e.pointerId);
      } catch (err) { /* ignore */ }
      const r = el.getBoundingClientRect();
      const relOx = e.clientX - r.left;
      const relOy = e.clientY - r.top;
      drag = { id: e.pointerId, relOx, relOy };
      el.style.zIndex = "3000";
      setPosPx(e.clientX, e.clientY, relOx, relOy);
    });
    el.addEventListener("pointermove", (e) => {
      if (!drag || drag.id !== e.pointerId) return;
      setPosPx(e.clientX, e.clientY, drag.relOx, drag.relOy);
      if (onDrag) onDrag(e);
    });
    function end(e) {
      if (!drag || drag.id !== e.pointerId) return;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) { /* ignore */ }
      drag = null;
      el.style.zIndex = el.classList.contains("mg-sponge") ? "24" : "15";
      if (onRelease) onRelease(el);
    }
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  }

  function playMinigameWin(scene, item, flashText) {
    if (scene._pqWon) return;
    scene._pqWon = true;
    const flash = document.createElement("div");
    flash.className = "mg-success-flash";
    flash.textContent = flashText || "Great! 🎉";
    scene.appendChild(flash);
    grantRoomBoost("play", item.boost);
    trackActivity("play");
    setTimeout(() => {
      closeMinigameOverlay(true);
      showRoomReaction("🎉");
    }, 450);
  }

  function cleanMinigameWin(scene, item) {
    if (scene._pqWon) return;
    scene._pqWon = true;
    const flash = document.createElement("div");
    flash.className = "mg-success-flash";
    flash.textContent = "Sparkling! ✨";
    scene.appendChild(flash);
    grantRoomBoost("clean", item.boost);
    trackActivity("clean");
    setTimeout(() => {
      closeMinigameOverlay(true);
      showRoomReaction("✨");
    }, 450);
  }

  function mountFeedMinigame(item) {
    const body = $("#minigame-body");
    const pool = [item.icon, ...FEED_ING_POOL.filter((x) => x !== item.icon)].slice(0, 8);
    const picks = [];
    for (let i = 0; i < 3; i++) {
      picks.push(pool[(i * 3 + item.name.length) % pool.length]);
    }
    body.innerHTML = `
      <div class="mg-scene mg-kitchen" id="mg-feed-scene">
        <div class="mg-hint" id="mg-feed-hint">Drag each ingredient into the bowl 🥣. Then drag your dish to ${state.petName} on the right!</div>
        <div class="mg-bowl-zone" id="mg-bowl">🥣</div>
        <div class="mg-pet-zone" id="mg-pet-zone">
          <div class="mg-feed-pet-wrap" id="mg-feed-pet">${petSVG(state.petId, "happy", 64)}</div>
        </div>
        <div class="mg-progress" id="mg-feed-progress">Ingredients: 0 / 3</div>
      </div>`;
    const scene = $("#mg-feed-scene");
    const bowl = $("#mg-bowl");
    const petZ = $("#mg-pet-zone");
    const prog = $("#mg-feed-progress");
    let placed = 0;

    const positions = [
      { l: 5, t: 62 },
      { l: 5, t: 42 },
      { l: 18, t: 52 },
    ];
    picks.forEach((emoji, i) => {
      const chip = document.createElement("div");
      chip.className = "mg-chip";
      chip.textContent = emoji;
      chip.dataset.sl = String(positions[i].l);
      chip.dataset.st = String(positions[i].t);
      chip.style.left = positions[i].l + "%";
      chip.style.top = positions[i].t + "%";
      chip.style.position = "absolute";
      scene.appendChild(chip);
      attachDrag(chip, (el) => {
        const c = centerOf(el);
        const br = bowl.getBoundingClientRect();
        if (pointInRect(c.x, c.y, br)) {
          placed++;
          el.remove();
          bowl.classList.add("filled");
          prog.textContent = "Ingredients: " + placed + " / 3";
          if (placed >= 3) {
            bowl.textContent = "";
            const dish = document.createElement("div");
            dish.className = "mg-dish";
            dish.textContent = item.icon;
            const sr = scene.getBoundingClientRect();
            const br2 = bowl.getBoundingClientRect();
            dish.style.position = "absolute";
            dish.style.left = (br2.left - sr.left + br2.width / 2 - 32) / sr.width * 100 + "%";
            dish.style.top = (br2.top - sr.top + br2.height / 2 - 32) / sr.height * 100 + "%";
            scene.appendChild(dish);
            petZ.classList.add("ready");
            $("#mg-feed-hint").textContent = "Great! Drag the meal to your pet!";
            attachDrag(dish, (dEl) => {
              const dc = centerOf(dEl);
              const pr = petZ.getBoundingClientRect();
              if (pointInRect(dc.x, dc.y, pr)) {
                dEl.remove();
                const flash = document.createElement("div");
                flash.className = "mg-success-flash";
                flash.textContent = "Yum! 😋";
                scene.appendChild(flash);
                grantRoomBoost("feed", item.boost);
                trackActivity("feed");
                setTimeout(() => {
                  closeMinigameOverlay(true);
                  showRoomReaction("😋");
                }, 450);
              } else {
                const srr = scene.getBoundingClientRect();
                const br3 = bowl.getBoundingClientRect();
                dEl.style.position = "absolute";
                dEl.style.left = (br3.left - srr.left + br3.width / 2 - 32) / srr.width * 100 + "%";
                dEl.style.top = (br3.top - srr.top + br3.height / 2 - 32) / srr.height * 100 + "%";
                dEl.style.zIndex = "12";
              }
            });
          }
        } else {
          el.style.position = "absolute";
          el.style.left = el.dataset.sl + "%";
          el.style.top = el.dataset.st + "%";
          el.style.zIndex = "10";
        }
      });
    });
  }

  function mountHoopPetGame(item, gemCount, gateVariant) {
    const body = $("#minigame-body");
    const hoopCls = gateVariant ? "mg-hoop mg-gate" : "mg-hoop";
    const tun = gateVariant ? "tunnel" : "hoop";
    const gems =
      gemCount > 0
        ? `<button type="button" class="mg-diamond-btn" id="mg-d1" style="left:12%;top:18%;">💎</button><button type="button" class="mg-diamond-btn" id="mg-d2" style="left:72%;top:20%;">💎</button><button type="button" class="mg-diamond-btn" id="mg-d3" style="left:48%;top:62%;">💎</button>`
        : "";
    const firstHint =
      gemCount > 0
        ? `Drag ${state.petName} through hoops <strong>1 → 2 → 3</strong>, then tap all <strong>💎</strong> diamonds!`
        : gateVariant
          ? `Drag ${state.petName} through swim <strong>tunnels 1 → 2 → 3</strong> in order!`
          : `Drag ${state.petName} through hoops <strong>1 → 2 → 3</strong> in order!`;
    body.innerHTML = `
      <div class="mg-scene mg-park" id="mg-play-scene">
        <div class="mg-hint" id="mg-play-hint">${firstHint}</div>
        <div class="${hoopCls}" id="mg-hoop-1" style="left:18%;top:38%;">1</div>
        <div class="${hoopCls}" id="mg-hoop-2" style="left:42%;top:22%;">2</div>
        <div class="${hoopCls}" id="mg-hoop-3" style="left:58%;top:48%;">3</div>
        ${gems}
        <div class="mg-play-pet" id="mg-play-pet">${petSVG(state.petId, "happy", 52)}</div>
        <div class="mg-progress" id="mg-play-progress"></div>
      </div>`;
    const scene = $("#mg-play-scene");
    const petEl = $("#mg-play-pet");
    const prog = $("#mg-play-progress");
    const hitR = gateVariant ? 52 : 42;
    let nextHoop = 1;
    let diamonds = 0;

    function hoopsDoneCount() {
      return [1, 2, 3].filter((h) => $("#mg-hoop-" + h).classList.contains("done")).length;
    }

    function progText() {
      const hd = hoopsDoneCount();
      if (gemCount > 0) return "Hoops: " + hd + "/3 · Gems: " + diamonds + "/3";
      return (gateVariant ? "Tunnels: " : "Hoops: ") + hd + "/3";
    }

    function checkWin() {
      if (scene._pqWon) return;
      if (nextHoop <= 3) return;
      if (gemCount > 0 && diamonds < gemCount) return;
      playMinigameWin(scene, item, "Amazing! 🎉");
    }

    prog.textContent = progText();
    petEl.style.left = "8%";
    petEl.style.top = "72%";

    if (gemCount > 0) {
      ["mg-d1", "mg-d2", "mg-d3"].forEach((id) => {
        $(`#${id}`).addEventListener("click", function () {
          if (this.classList.contains("collected") || scene._pqWon) return;
          this.classList.add("collected");
          diamonds++;
          prog.textContent = progText();
          checkWin();
        });
      });
    }

    attachDragInScene(petEl, scene, {
      onRelease() {
        if (scene._pqWon) return;
        const c = centerOf(petEl);
        for (let h = 1; h <= 3; h++) {
          const hoop = $("#mg-hoop-" + h);
          if (hoop.classList.contains("done")) continue;
          if (h !== nextHoop) break;
          const hr = hoop.getBoundingClientRect();
          const dist = Math.hypot(c.x - (hr.left + hr.width / 2), c.y - (hr.top + hr.height / 2));
          if (dist < hitR) {
            hoop.classList.add("done");
            nextHoop++;
            prog.textContent = progText();
            const hintEl = $("#mg-play-hint");
            if (gemCount > 0) {
              hintEl.innerHTML =
                nextHoop <= 3
                  ? `Nice! Through hoop <strong>${nextHoop}</strong> next, then tap every 💎!`
                  : "Hoops done! Tap all <strong>💎</strong> diamonds!";
            } else {
              hintEl.innerHTML =
                nextHoop <= 3 ? `Great! Next: <strong>${tun} ${nextHoop}</strong>.` : "Course complete — nice work! 🎉";
            }
          }
          break;
        }
        checkWin();
      },
    });
  }

  function mountPlayGemRush(item) {
    const body = $("#minigame-body");
    const positions = [
      [10, 20],
      [75, 15],
      [45, 35],
      [20, 55],
      [82, 48],
      [55, 70],
      [12, 78],
      [68, 82],
    ];
    body.innerHTML = `
      <div class="mg-scene mg-park" id="mg-play-scene">
        <div class="mg-hint">Gem rush! Tap every <strong>💎</strong> before time runs out (just tap all 8).</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId, "happy", 52)}</div>
        ${positions
          .map(
            (p, i) =>
              `<button type="button" class="mg-diamond-btn" data-gr="${i}" style="left:${p[0]}%;top:${p[1]}%;">💎</button>`
          )
          .join("")}
        <div class="mg-progress" id="mg-play-progress">💎 0 / 8</div>
      </div>`;
    const scene = $("#mg-play-scene");
    let got = 0;
    scene.querySelectorAll("[data-gr]").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (scene._pqWon || this.classList.contains("collected")) return;
        this.classList.add("collected");
        got++;
        $("#mg-play-progress").textContent = "💎 " + got + " / 8";
        if (got >= 8) playMinigameWin(scene, item, "Gem master! 💎");
      });
    });
  }

  function mountPlayBubblePop(item) {
    const body = $("#minigame-body");
    const spots = [
      [14, 22],
      [32, 18],
      [58, 28],
      [22, 52],
      [70, 48],
      [48, 68],
    ];
    body.innerHTML = `
      <div class="mg-scene mg-park" id="mg-play-scene">
        <div class="mg-hint">Pop every <strong>🫧</strong> bubble!</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId, "happy", 52)}</div>
        ${spots
          .map(
            (p, i) =>
              `<button type="button" class="mg-bubble-btn" data-bb="${i}" style="left:${p[0]}%;top:${p[1]}%;">🫧</button>`
          )
          .join("")}
        <div class="mg-progress" id="mg-play-progress">Popped: 0 / 6</div>
      </div>`;
    const scene = $("#mg-play-scene");
    let popped = 0;
    scene.querySelectorAll("[data-bb]").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (scene._pqWon || this.classList.contains("collected")) return;
        this.classList.add("collected");
        popped++;
        $("#mg-play-progress").textContent = "Popped: " + popped + " / 6";
        if (popped >= 6) playMinigameWin(scene, item, "Bubbly fun! 🫧");
      });
    });
  }

  function mountPlayLaserChase(item) {
    const body = $("#minigame-body");
    body.innerHTML = `
      <div class="mg-scene mg-park" id="mg-play-scene">
        <div class="mg-hint">Laser chase! Tap the moving <strong>🔴</strong> dot 5 times.</div>
        <button type="button" class="mg-laser-dot" id="mg-laser-dot" aria-label="Laser dot">🔴</button>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId, "happy", 52)}</div>
        <div class="mg-progress" id="mg-play-progress">Zaps: 0 / 5</div>
      </div>`;
    const scene = $("#mg-play-scene");
    const dot = $("#mg-laser-dot");
    function moveLaser() {
      dot.style.left = 12 + Math.random() * 74 + "%";
      dot.style.top = 16 + Math.random() * 56 + "%";
    }
    moveLaser();
    let zaps = 0;
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      if (scene._pqWon) return;
      zaps++;
      $("#mg-play-progress").textContent = "Zaps: " + zaps + " / 5";
      if (zaps >= 5) playMinigameWin(scene, item, "Light speed! 🔴");
      else moveLaser();
    });
  }

  function mountPlayTapOrder(item) {
    const body = $("#minigame-body");
    const pos = [
      [18, 28],
      [62, 22],
      [38, 52],
      [72, 58],
    ];
    const order = [1, 2, 3, 4];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = order[i];
      order[i] = order[j];
      order[j] = t;
    }
    body.innerHTML = `
      <div class="mg-scene mg-park" id="mg-play-scene">
        <div class="mg-hint">Tower climb! Tap pads in order: <strong>1 → 2 → 3 → 4</strong> (positions are shuffled).</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId, "happy", 48)}</div>
        ${pos
          .map(
            (p, i) =>
              `<button type="button" class="mg-tap-pad" data-step="${order[i]}" style="left:${p[0]}%;top:${p[1]}%;">${order[i]}</button>`
          )
          .join("")}
        <div class="mg-progress" id="mg-play-progress">Next: 1</div>
      </div>`;
    const scene = $("#mg-play-scene");
    let need = 1;
    scene.querySelectorAll(".mg-tap-pad").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (scene._pqWon || this.classList.contains("collected")) return;
        const n = parseInt(this.dataset.step, 10);
        if (n !== need) {
          this.classList.add("mg-tap-wrong");
          setTimeout(() => this.classList.remove("mg-tap-wrong"), 280);
          return;
        }
        this.classList.add("collected");
        need++;
        $("#mg-play-progress").textContent = need <= 4 ? "Next: " + need : "Done!";
        if (need > 4) playMinigameWin(scene, item, "You reached the top! 🏰");
      });
    });
  }

  function mountPlaySparkleHunt(item) {
    const body = $("#minigame-body");
    const spots = [
      [15, 18],
      [78, 22],
      [48, 32],
      [22, 62],
      [68, 55],
      [52, 78],
    ];
    body.innerHTML = `
      <div class="mg-scene mg-park" id="mg-play-scene">
        <div class="mg-hint">Sparkle hunt! Tap all <strong>✨</strong> sparkles (6).</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId, "happy", 52)}</div>
        ${spots
          .map(
            (p, i) =>
              `<button type="button" class="mg-sparkle-btn" data-sp="${i}" style="left:${p[0]}%;top:${p[1]}%;">✨</button>`
          )
          .join("")}
        <div class="mg-progress" id="mg-play-progress">✨ 0 / 6</div>
      </div>`;
    const scene = $("#mg-play-scene");
    let n = 0;
    scene.querySelectorAll("[data-sp]").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (scene._pqWon || this.classList.contains("collected")) return;
        this.classList.add("collected");
        n++;
        $("#mg-play-progress").textContent = "✨ " + n + " / 6";
        if (n >= 6) playMinigameWin(scene, item, "Magical! ✨");
      });
    });
  }

  function mountPlayTreasureTap(item) {
    const body = $("#minigame-body");
    const spots = [
      [20, 24],
      [55, 20],
      [38, 45],
      [72, 50],
      [28, 68],
    ];
    body.innerHTML = `
      <div class="mg-scene mg-park mg-treasure-map" id="mg-play-scene">
        <div class="mg-hint">Treasure map! Tap every <strong>❌</strong> mark (5).</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId, "happy", 50)}</div>
        ${spots
          .map(
            (p, i) =>
              `<button type="button" class="mg-treasure-x" data-tx="${i}" style="left:${p[0]}%;top:${p[1]}%;">❌</button>`
          )
          .join("")}
        <div class="mg-progress" id="mg-play-progress">Marks: 0 / 5</div>
      </div>`;
    const scene = $("#mg-play-scene");
    let n = 0;
    scene.querySelectorAll("[data-tx]").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (scene._pqWon || this.classList.contains("collected")) return;
        this.classList.add("collected");
        n++;
        $("#mg-play-progress").textContent = "Marks: " + n + " / 5";
        if (n >= 5) playMinigameWin(scene, item, "Treasure found! 🗺️");
      });
    });
  }

  function mountPlayMinigame(item) {
    const g = item.game || "hoopsGems";
    switch (g) {
      case "hoops":
        mountHoopPetGame(item, 0, false);
        break;
      case "hoopsGems":
        mountHoopPetGame(item, 3, false);
        break;
      case "gateRun":
        mountHoopPetGame(item, 0, true);
        break;
      case "gemRush":
        mountPlayGemRush(item);
        break;
      case "bubblePop":
        mountPlayBubblePop(item);
        break;
      case "laserChase":
        mountPlayLaserChase(item);
        break;
      case "tapOrder":
        mountPlayTapOrder(item);
        break;
      case "sparkleHunt":
        mountPlaySparkleHunt(item);
        break;
      case "treasureTap":
        mountPlayTreasureTap(item);
        break;
      default:
        mountHoopPetGame(item, 3, false);
    }
  }

  function mountCleanMinigame(item) {
    const body = $("#minigame-body");
    body.innerHTML = `
      <div class="mg-scene mg-bathroom" id="mg-clean-scene">
        <div class="mg-hint">Drag the sponge 🧽 over ${state.petName} and scrub until the dirt fades away.</div>
        <div class="mg-scrub-zone" id="mg-scrub-pet">
          <div class="mg-scrub-dirt" id="mg-scrub-dirt"></div>
          <div class="mg-scrub-pet-inner">${petSVG(state.petId, "happy", 72)}</div>
        </div>
        <div class="mg-sponge" id="mg-sponge">🧽</div>
        <div class="mg-progress" id="mg-clean-progress">Clean: 0%</div>
      </div>`;
    const scene = $("#mg-clean-scene");
    const sponge = $("#mg-sponge");
    const dirt = $("#mg-scrub-dirt");
    const petZone = $("#mg-scrub-pet");
    const prog = $("#mg-clean-progress");
    let scrub = 0;

    attachDragInScene(sponge, scene, {
      onDrag(e) {
        if (scene._pqWon) return;
        const sc = centerOf(sponge);
        const pr = petZone.getBoundingClientRect();
        if (!pointInRect(sc.x, sc.y, pr)) return;
        const mv = Math.abs(e.movementX) + Math.abs(e.movementY);
        if (mv < 0.25) return;
        scrub += mv * 0.4;
        const op = Math.max(0, 0.72 - scrub / 380);
        dirt.style.opacity = String(op);
        prog.textContent = "Clean: " + Math.min(100, Math.round((scrub / 340) * 100)) + "%";
        if (scrub >= 340 || op <= 0.04) cleanMinigameWin(scene, item);
      },
      onRelease() {},
    });

    requestAnimationFrame(() => {
      const sr = scene.getBoundingClientRect();
      sponge.style.left = Math.min(80, sr.width * 0.08) + "px";
      sponge.style.top = Math.max(8, sr.height - 96) + "px";
    });
  }

  function showRoomReaction(emoji) {
    const el = $("#room-pet");
    const r = document.createElement("div");
    r.className = "reaction";
    r.textContent = emoji;
    el.appendChild(r);
    setTimeout(() => r.remove(), 1200);
  }

  // ═══════════════════════════════════════ WORK MINIGAMES ═══════════════════════════════════════

  function openWorkMinigame(job) {
    minigameContext = { type: "work", job, cost: 0, room: null, items: null, container: null };
    $("#minigame-title").textContent = job.icon + "  " + job.label + "  — Earn $" + job.pay;
    $("#minigame-body").innerHTML = "";
    mountWorkMinigame(job);
    $("#minigame-overlay").classList.remove("hidden");
    $("#minigame-overlay").setAttribute("aria-hidden", "false");
    $("#minigame-abort").onclick = () => {
      if (confirm("Give up this job? You won't get paid.")) closeMinigameOverlay(false);
    };
    startMinigameDecay();
  }

  function workMinigameWin(scene, job) {
    if (scene._pqWon) return;
    scene._pqWon = true;
    const flash = document.createElement("div");
    flash.className = "mg-success-flash";
    flash.textContent = "Job done! +$" + job.pay + " 💵";
    scene.appendChild(flash);
    state.coins += job.pay;
    state.expenses.push({ type: "work", amount: job.pay, date: Date.now(), label: job.label, isIncome: true });
    updateTopBar();
    setTimeout(() => {
      closeMinigameOverlay(true);
      renderWork();
    }, 700);
  }

  function mountWorkMinigame(job) {
    switch (job.game) {
      case "dirtSweep":   mountWorkDirtSweep(job); break;
      case "leafRake":    mountWorkLeafRake(job); break;
      case "pawTrace":    mountWorkPawTrace(job); break;
      case "mathQuiz":    mountWorkMathQuiz(job); break;
      case "babyCatch":   mountWorkBabyCatch(job); break;
      case "deliveryRun": mountWorkDeliveryRun(job); break;
      case "garageSort":  mountWorkGarageSort(job); break;
      case "bugSquash":   mountWorkBugSquash(job); break;
      default:            mountWorkDirtSweep(job);
    }
  }

  /* ── 1. HOUSE CHORES: tap 7 mess spots ── */
  function mountWorkDirtSweep(job) {
    const spots = [[12,28],[55,22],[80,35],[28,55],[68,60],[42,72],[20,68]];
    const icons = ["🧺","💨","🗑️","🧻","🪣","💧","🥾"];
    $("#minigame-body").innerHTML = `
      <div class="mg-scene mg-house" id="mg-work-scene">
        <div class="mg-hint">House chores! Tap every mess to tidy up the place 🧹</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId,"happy",46)}</div>
        ${spots.map((p,i)=>`<button class="mg-sparkle-btn" data-ms="${i}" style="left:${p[0]}%;top:${p[1]}%;">${icons[i]}</button>`).join("")}
        <div class="mg-progress" id="mg-work-progress">Cleaned: 0 / 7</div>
      </div>`;
    const scene = $("#mg-work-scene"), prog = $("#mg-work-progress");
    let n = 0;
    scene.querySelectorAll("[data-ms]").forEach(btn => {
      btn.addEventListener("click", function() {
        if (scene._pqWon || this.classList.contains("collected")) return;
        this.classList.add("collected");
        n++;
        prog.textContent = "Cleaned: " + n + " / 7";
        if (n >= 7) workMinigameWin(scene, job);
      });
    });
  }

  /* ── 2. YARD WORK: tap 8 fallen leaves ── */
  function mountWorkLeafRake(job) {
    const spots = [[10,32],[30,22],[55,28],[78,35],[18,58],[42,65],[66,72],[85,60]];
    $("#minigame-body").innerHTML = `
      <div class="mg-scene mg-outdoor" id="mg-work-scene">
        <div class="mg-hint">Yard work! Rake up all the fallen leaves 🌿</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId,"happy",46)}</div>
        ${spots.map((p,i)=>`<button class="mg-sparkle-btn" data-lf="${i}" style="left:${p[0]}%;top:${p[1]}%;">🍂</button>`).join("")}
        <div class="mg-progress" id="mg-work-progress">Raked: 0 / 8</div>
      </div>`;
    const scene = $("#mg-work-scene"), prog = $("#mg-work-progress");
    let n = 0;
    scene.querySelectorAll("[data-lf]").forEach(btn => {
      btn.addEventListener("click", function() {
        if (scene._pqWon || this.classList.contains("collected")) return;
        this.classList.add("collected");
        n++;
        prog.textContent = "Raked: " + n + " / 8";
        if (n >= 8) workMinigameWin(scene, job);
      });
    });
  }

  /* ── 3. DOG WALKING: tap paw prints in order 1→5 ── */
  function mountWorkPawTrace(job) {
    const pos = [[15,32],[75,25],[50,48],[22,65],[80,62]];
    const order = [1,2,3,4,5];
    for (let i = order.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [order[i],order[j]]=[order[j],order[i]]; }
    $("#minigame-body").innerHTML = `
      <div class="mg-scene mg-outdoor" id="mg-work-scene">
        <div class="mg-hint">Dog walk! Tap paw prints in order <strong>1 → 2 → 3 → 4 → 5</strong> 🐕</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId,"happy",46)}</div>
        ${pos.map((p,i)=>`<button class="mg-tap-pad" data-step="${order[i]}" style="left:${p[0]}%;top:${p[1]}%;">${order[i]}</button>`).join("")}
        <div class="mg-progress" id="mg-work-progress">Next: 1</div>
      </div>`;
    const scene = $("#mg-work-scene"); let need = 1;
    scene.querySelectorAll(".mg-tap-pad").forEach(btn => {
      btn.addEventListener("click", function() {
        if (scene._pqWon || this.classList.contains("collected")) return;
        if (parseInt(this.dataset.step) !== need) {
          this.classList.add("mg-tap-wrong");
          setTimeout(()=>this.classList.remove("mg-tap-wrong"), 280);
          return;
        }
        this.classList.add("collected"); need++;
        $("#mg-work-progress").textContent = need <= 5 ? "Next: " + need : "Done!";
        if (need > 5) workMinigameWin(scene, job);
      });
    });
  }

  /* ── 4. TUTORING: solve a math problem ── */
  function mountWorkMathQuiz(job) {
    const problems = [
      { q:"12 × 4 = ?", a:48, opts:[42,44,48,52] },
      { q:"87 − 29 = ?", a:58, opts:[52,56,58,62] },
      { q:"6 × 9 = ?",   a:54, opts:[48,51,54,57] },
      { q:"144 ÷ 12 = ?",a:12, opts:[10,11,12,14] },
      { q:"17 + 28 = ?", a:45, opts:[43,44,45,46] },
      { q:"8 × 7 = ?",   a:56, opts:[54,56,58,63] },
      { q:"100 − 37 = ?",a:63, opts:[57,61,63,67] },
      { q:"9 × 8 = ?",   a:72, opts:[63,68,72,81] },
      { q:"36 ÷ 4 = ?",  a:9,  opts:[6,7,8,9]    },
      { q:"13 + 49 = ?", a:62, opts:[58,60,62,65] },
    ];
    const prob = problems[Math.floor(Math.random() * problems.length)];
    const shuffled = [...prob.opts].sort(() => Math.random() - 0.5);
    $("#minigame-body").innerHTML = `
      <div class="mg-scene mg-classroom" id="mg-work-scene">
        <div class="mg-hint">Tutoring session! Solve the math problem correctly 📚</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId,"happy",46)}</div>
        <div class="mg-math-question">${prob.q}</div>
        <div class="mg-math-opts" id="mg-math-opts">
          ${shuffled.map(n=>`<button class="mg-math-btn" data-val="${n}">${n}</button>`).join("")}
        </div>
      </div>`;
    const scene = $("#mg-work-scene");
    $("#mg-math-opts").addEventListener("click", e => {
      const btn = e.target.closest(".mg-math-btn");
      if (!btn || scene._pqWon) return;
      const val = parseInt(btn.dataset.val, 10);
      if (val === prob.a) {
        btn.classList.add("correct");
        workMinigameWin(scene, job);
      } else {
        btn.classList.add("wrong");
      }
    });
  }

  /* ── 5. BABYSITTING: tap floating toys before they disappear ── */
  function mountWorkBabyCatch(job) {
    const toys = ["🧸","🍼","🎀","⭐","🪀","🎈","🌟","🎁"];
    $("#minigame-body").innerHTML = `
      <div class="mg-scene mg-nursery" id="mg-work-scene">
        <div class="mg-hint">Babysitting! Tap each toy before it floats away! Catch 5 of 8 👶</div>
        <div id="mg-float-el" class="mg-float-item" style="opacity:0;pointer-events:none;">🧸</div>
        <div class="mg-progress" id="mg-work-progress">Caught: 0 / 5</div>
      </div>`;
    const scene = $("#mg-work-scene");
    const floatEl = document.getElementById("mg-float-el");
    const prog = document.getElementById("mg-work-progress");
    let score = 0, attempt = 0, activeTimer = null;
    const TOTAL = 8, NEED = 5;

    function spawnNext() {
      if (scene._pqWon || attempt >= TOTAL) return;
      const toy = toys[attempt % toys.length];
      const lp = 10 + Math.random() * 65;
      const tp = 20 + Math.random() * 50;
      floatEl.textContent = toy;
      floatEl.style.left = lp + "%";
      floatEl.style.top  = tp + "%";
      floatEl.classList.remove("fading");
      floatEl.style.opacity = "1";
      floatEl.style.pointerEvents = "auto";
      attempt++;

      activeTimer = setTimeout(() => {
        floatEl.classList.add("fading");
        floatEl.style.pointerEvents = "none";
        setTimeout(spawnNext, 400);
      }, 1600);
    }

    floatEl.addEventListener("click", () => {
      if (activeTimer) clearTimeout(activeTimer);
      floatEl.classList.add("fading");
      floatEl.style.pointerEvents = "none";
      score++;
      prog.textContent = "Caught: " + score + " / " + NEED;
      if (score >= NEED) { workMinigameWin(scene, job); return; }
      setTimeout(spawnNext, 350);
    });

    setTimeout(spawnNext, 400);
  }

  /* ── 6. DELIVERY: tap stops in order 1→4 ── */
  function mountWorkDeliveryRun(job) {
    const pos = [[12,28],[80,32],[20,65],[72,62]];
    const order = [1,2,3,4];
    for (let i = order.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [order[i],order[j]]=[order[j],order[i]]; }
    $("#minigame-body").innerHTML = `
      <div class="mg-scene mg-street" id="mg-work-scene">
        <div class="mg-hint">Delivery run! Drop off packages at stops <strong>1 → 2 → 3 → 4</strong> in order 🚲</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId,"happy",46)}</div>
        ${pos.map((p,i)=>`<button class="mg-tap-pad" data-step="${order[i]}" style="left:${p[0]}%;top:${p[1]}%;">📦${order[i]}</button>`).join("")}
        <div class="mg-progress" id="mg-work-progress">Next stop: 1</div>
      </div>`;
    const scene = $("#mg-work-scene"); let need = 1;
    scene.querySelectorAll(".mg-tap-pad").forEach(btn => {
      btn.addEventListener("click", function() {
        if (scene._pqWon || this.classList.contains("collected")) return;
        if (parseInt(this.dataset.step) !== need) {
          this.classList.add("mg-tap-wrong");
          setTimeout(()=>this.classList.remove("mg-tap-wrong"), 280);
          return;
        }
        this.classList.add("collected"); need++;
        $("#mg-work-progress").textContent = need <= 4 ? "Next stop: " + need : "All delivered!";
        if (need > 4) workMinigameWin(scene, job);
      });
    });
  }

  /* ── 7. GARAGE SALE: tap the 5 🪙 coins hidden among other items ── */
  function mountWorkGarageSort(job) {
    const targets = ["🪙","🪙","🪙","🪙","🪙"];
    const decoys  = ["📺","🖼️","👟","🧴","🎷","🧩","🕹️","🪞"];
    const shuffled = [...targets, ...decoys.slice(0,7)].sort(()=>Math.random()-0.5);
    const cols = 4, rows = 3;
    const positions = [];
    for (let r=0;r<rows;r++) for(let c=0;c<cols&&positions.length<shuffled.length;c++) {
      positions.push([8+c*23, 22+r*24]);
    }
    $("#minigame-body").innerHTML = `
      <div class="mg-scene mg-garage" id="mg-work-scene">
        <div class="mg-hint">Garage sale! Find and tap all 5 🪙 coins among the clutter 📦</div>
        <div class="mg-play-pet mg-play-pet-static">${petSVG(state.petId,"happy",42)}</div>
        ${shuffled.map((ic,i)=>`<button class="mg-bubble-btn" data-gi="${i}" data-is-coin="${ic==='🪙'?1:0}" style="left:${positions[i][0]}%;top:${positions[i][1]}%;">${ic}</button>`).join("")}
        <div class="mg-progress" id="mg-work-progress">Coins: 0 / 5</div>
      </div>`;
    const scene = $("#mg-work-scene"), prog = $("#mg-work-progress");
    let found = 0;
    scene.querySelectorAll("[data-gi]").forEach(btn => {
      btn.addEventListener("click", function() {
        if (scene._pqWon || this.classList.contains("collected")) return;
        if (this.dataset.isCoin === "1") {
          this.classList.add("collected"); found++;
          prog.textContent = "Coins: " + found + " / 5";
          if (found >= 5) workMinigameWin(scene, job);
        } else {
          this.style.background = "rgba(239,83,80,0.25)";
          this.style.transform = "scale(0.88)";
          setTimeout(()=>{ this.style.background=""; this.style.transform=""; }, 350);
        }
      });
    });
  }

  /* ── 8. TECH HELP: tap 5 bugs 🐛 as they appear one at a time ── */
  function mountWorkBugSquash(job) {
    const bugSpots = [[15,30],[70,25],[45,50],[20,68],[80,62],[50,22],[35,72],[75,55]];
    $("#minigame-body").innerHTML = `
      <div class="mg-scene mg-office" id="mg-work-scene">
        <div class="mg-hint">Tech help! Squash the bugs as they appear — catch 5 🐛 💻</div>
        <div id="mg-bug-el" class="mg-float-item" style="opacity:0;pointer-events:none;">🐛</div>
        <div class="mg-progress" id="mg-work-progress">Bugs squashed: 0 / 5</div>
      </div>`;
    const scene = $("#mg-work-scene");
    const bugEl  = document.getElementById("mg-bug-el");
    const prog   = document.getElementById("mg-work-progress");
    let squashed = 0, wave = 0, bugTimer = null;
    const NEED = 5;

    function nextBug() {
      if (scene._pqWon || wave >= NEED + 3) return;
      const sp = bugSpots[wave % bugSpots.length];
      bugEl.style.left = sp[0] + "%";
      bugEl.style.top  = sp[1] + "%";
      bugEl.classList.remove("fading");
      bugEl.style.opacity = "1";
      bugEl.style.pointerEvents = "auto";
      wave++;

      bugTimer = setTimeout(() => {
        bugEl.classList.add("fading");
        bugEl.style.pointerEvents = "none";
        setTimeout(nextBug, 350);
      }, 1400);
    }

    bugEl.addEventListener("click", () => {
      if (bugTimer) clearTimeout(bugTimer);
      bugEl.classList.add("fading");
      bugEl.style.pointerEvents = "none";
      squashed++;
      prog.textContent = "Bugs squashed: " + squashed + " / " + NEED;
      if (squashed >= NEED) { workMinigameWin(scene, job); return; }
      setTimeout(nextBug, 300);
    });

    setTimeout(nextBug, 400);
  }

  // ═══════════════════════════════════════ AI CHAT ═══════════════════════════════════════

  // API key loaded from localStorage (entered by user in the chat tab)
  const DEFAULT_GEMINI_KEY = "AIzaSyCPu2treIhFYBMB2OSBW-owPRCYiN2uMFk";
  let GEMINI_API_KEY = localStorage.getItem("pq_gemini_key") || DEFAULT_GEMINI_KEY;

  function renderChat() {
    const iface = document.getElementById("chat-interface");
    if (!iface) return;
    iface.classList.remove("hidden");

    GEMINI_API_KEY = localStorage.getItem("pq_gemini_key") || DEFAULT_GEMINI_KEY;

    if (!document.getElementById("chat-messages")) {
      iface.innerHTML = chatHtml();
    }
    if (state.chatHistory.length === 0) {
      appendChatMsg("ai", "Hi! I'm " + state.petName + " " + pet().emoji + "! Talk to me — I'm all ears! 🐾");
    }
    bindChatEvents();
  }

  function chatHtml() {
    return `<div class="chat-messages" id="chat-messages"></div>
      <div class="chat-input-row">
        <input type="text" id="chat-input" class="chat-input-field" placeholder="Ask about your pet..." maxlength="300" autocomplete="off">
        <button class="chat-send-btn" id="chat-send-btn">➤</button>
      </div>
      <div style="text-align:center;flex-shrink:0;">
        <button id="chat-reset-key-btn" style="background:none;border:none;color:#aaa;font-size:11px;cursor:pointer;padding:4px 8px;">🔑 Change API Key</button>
      </div>`;
  }

  function bindChatEvents() {
    const sendBtn   = document.getElementById("chat-send-btn");
    const chatInput = document.getElementById("chat-input");

    // Use named handler so we can safely call bindChatEvents multiple times
    // without stacking duplicate listeners
    if (sendBtn && !sendBtn._pqChatBound) {
      sendBtn._pqChatBound = true;
      sendBtn.addEventListener("click", submitChat);
    }
    const resetKeyBtn = document.getElementById("chat-reset-key-btn");
    if (resetKeyBtn && !resetKeyBtn._pqBound) {
      resetKeyBtn._pqBound = true;
      resetKeyBtn.addEventListener("click", () => {
        const newKey = prompt("Enter a new Gemini API key (leave blank to use the default key):");
        if (newKey === null) return; // cancelled
        if (newKey.trim().length >= 20) {
          GEMINI_API_KEY = newKey.trim();
          localStorage.setItem("pq_gemini_key", GEMINI_API_KEY);
        } else {
          GEMINI_API_KEY = DEFAULT_GEMINI_KEY;
          localStorage.removeItem("pq_gemini_key");
        }
        state.chatHistory = [];
        const iface2 = document.getElementById("chat-interface");
        if (iface2) iface2.innerHTML = "";
        renderChat();
      });
    }

    if (chatInput && !chatInput._pqChatBound) {
      chatInput._pqChatBound = true;
      chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitChat();
      });
    }
  }

  function appendChatMsg(role, text) {
    const msgs = document.getElementById("chat-messages");
    if (!msgs) return;
    const div = document.createElement("div");
    div.className = "chat-msg " + role;
    if (role === "ai") {
      div.innerHTML = `<div class="chat-sender">${pet().emoji} ${state.petName}</div><div class="chat-bubble">${escapeHtml(text)}</div>`;
    } else {
      div.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
    }
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  async function submitChat() {
    const input = document.getElementById("chat-input");
    const text = input ? input.value.trim() : "";
    if (!text) return;
    input.value = "";

    if (!GEMINI_API_KEY) {
      GEMINI_API_KEY = DEFAULT_GEMINI_KEY; return;
    }

    appendChatMsg("user", text);
    state.chatHistory.push({ role: "user", parts: [{ text }] });

    // Typing indicator
    const msgs = document.getElementById("chat-messages");
    const typing = document.createElement("div");
    typing.className = "chat-msg ai chat-typing";
    typing.innerHTML = `<div class="chat-bubble">Thinking…</div>`;
    if (msgs) { msgs.appendChild(typing); msgs.scrollTop = msgs.scrollHeight; }

    try {
      const m = getMood();
      const systemCtx = `You ARE ${state.petName}, a ${pet().name} (${pet().emoji}) in the PetQuest virtual pet game. Speak in first person AS the pet — use a playful, expressive, and cute personality fitting a ${pet().name}. React to your own current state: mood is ${m.label}, hunger: ${Math.round(state.stats.hunger)}%, happiness: ${Math.round(state.stats.happiness)}%, energy: ${Math.round(state.stats.energy)}%, health: ${Math.round(state.stats.health)}%, cleanliness: ${Math.round(state.stats.cleanliness)}%. Owner has $${state.coins}. Never break character. Keep responses fun, short, and under 80 words.`;

      const historyToSend = state.chatHistory.slice(-10);
      const messages = historyToSend.length === 1
        ? [{ role: "user", parts: [{ text: systemCtx + "\n\nUser: " + text }] }]
        : [
            { role: "user", parts: [{ text: systemCtx }] },
            { role: "model", parts: [{ text: "Got it! I'm ready to help with " + state.petName + "." }] },
            ...historyToSend
          ];

      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: messages }),
        }
      );

      if (typing.parentNode) typing.remove();

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        appendChatMsg("ai", "⚠️ " + (errData?.error?.message || "API error " + resp.status));
        return;
      }

      const data = await resp.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
      state.chatHistory.push({ role: "model", parts: [{ text: reply }] });
      appendChatMsg("ai", reply);

    } catch (err) {
      if (typing.parentNode) typing.remove();
      appendChatMsg("ai", "⚠️ Connection error. Please check your API key and network.");
    }
  }

  // ═══════════════════════════════════════ WORK TAB ═══════════════════════════════════════

  function renderWork() {
    $("#work-container").innerHTML = `
      <div class="work-balance-hero">
        <div class="wb-label">Your balance</div>
        <div class="wb-amount" id="work-balance-display">$${state.coins}</div>
        <div class="wb-hint">Tap a job to get paid. Buying food, toys, vet care, and other pet items subtracts from this balance.</div>
      </div>
      <div class="work-section-title">Pick up work</div>
      <div class="work-job-list">
        ${WORK_JOBS.map((j) => `
          <button type="button" class="work-job-card" data-job="${j.id}">
            <span class="wj-icon">${j.icon}</span>
            <div class="wj-body">
              <div class="wj-title">${j.label}</div>
              <div class="wj-desc">${j.desc}</div>
            </div>
            <span class="wj-pay">+$${j.pay}</span>
          </button>
        `).join("")}
      </div>`;
  }

  // ═══════════════════════════════════════ REPORTS ═══════════════════════════════════════

  function renderReports(filter) {
    filter = filter || "all";
    const icons = { feed: "🍖", play: "🎾", rest: "💤", clean: "🛁", vet: "💊", work: "💼", quiz: "🧠" };
    const colors = { feed: "#FF9800", play: "#4CAF50", rest: "#9C27B0", clean: "#2196F3", vet: "#F44336", work: "#2E7D32", quiz: "#1565C0" };

    if (state.expenses.length === 0) {
      $("#reports-container").innerHTML = `<div class="reports-wrap"><div class="reports-title">Transaction history</div><div class="reports-empty"><div class="re-icon">📊</div><div>No transactions yet — work and quiz rewards will show as <strong>earned</strong>; pet care purchases as <strong>spent</strong>.</div></div></div>`;
      return;
    }

    let totalEarned = 0;
    let totalSpent = 0;
    state.expenses.forEach((e) => {
      const a = Number(e.amount) || 0;
      if (e.isIncome === true) totalEarned += a;
      else totalSpent += a;
    });

    const btnBase = "border:none;border-radius:12px;padding:8px 18px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.15s;";
    const btnAll     = `style="${btnBase}background:${filter==="all"     ? "#1A237E" : "#eee"};color:${filter==="all"     ? "white" : "#555"};"`;
    const btnIncome  = `style="${btnBase}background:${filter==="income"  ? "#2e7d32" : "#eee"};color:${filter==="income"  ? "white" : "#555"};"`;
    const btnExpense = `style="${btnBase}background:${filter==="expense" ? "#c62828" : "#eee"};color:${filter==="expense" ? "white" : "#555"};"`;

    const summary = `
      <div class="reports-summary">
        <div class="rs-card rs-earn" id="rpt-btn-income" style="cursor:pointer;outline:${filter==="income" ? "2.5px solid #2e7d32" : "none"};outline-offset:2px;">
          <div class="rs-label">Total earned</div>
          <div class="rs-val income">+$${totalEarned.toFixed(0)}</div>
          <div class="rs-sub">Tap to filter income</div>
        </div>
        <div class="rs-card rs-spend" id="rpt-btn-expense" style="cursor:pointer;outline:${filter==="expense" ? "2.5px solid #c62828" : "none"};outline-offset:2px;">
          <div class="rs-label">Total spent</div>
          <div class="rs-val spend">-$${totalSpent.toFixed(0)}</div>
          <div class="rs-sub">Tap to filter expenses</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0 2px 8px;">
        <div class="reports-section-label" style="margin:0">
          ${filter==="all" ? "All transactions" : filter==="income" ? "Income only" : "Expenses only"}
        </div>
        ${filter !== "all" ? `<button id="rpt-btn-all" ${btnAll}>Show all</button>` : ""}
      </div>`;

    const filtered = [...state.expenses].reverse().filter(e => {
      if (filter === "income")  return e.isIncome === true;
      if (filter === "expense") return e.isIncome !== true;
      return true;
    }).slice(0, 40);

    const rows = filtered.map((e) => {
      const inc = e.isIncome === true;
      const title = e.label || (e.type.charAt(0).toUpperCase() + e.type.slice(1));
      const timeStr = new Date(e.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const dateStr = new Date(e.date).toLocaleDateString([], { month: "short", day: "numeric" });
      const ic = icons[e.type] || (inc ? "💵" : "💸");
      const col = colors[e.type] || (inc ? "#2E7D32" : "#757575");
      const amt = inc
        ? `<div class="tx-amount income">+$${Number(e.amount).toFixed(0)}</div>`
        : `<div class="tx-amount" style="color:${col}">-$${Number(e.amount).toFixed(0)}</div>`;
      return `
      <div class="tx-row">
        <div class="tx-icon-wrap" style="background:${col}22">${ic}</div>
        <div style="flex:1;min-width:0"><div class="tx-type">${title}</div><div class="tx-date">${inc ? "Earned" : "Spent"} · ${dateStr} ${timeStr}</div></div>
        ${amt}
      </div>`;
    }).join("");

    const emptyMsg = filtered.length === 0
      ? `<div class="reports-empty"><div class="re-icon">${filter==="income" ? "💵" : "💸"}</div><div>No ${filter} transactions yet.</div></div>`
      : rows;

    $("#reports-container").innerHTML = `<div class="reports-wrap"><div class="reports-title">Transaction history</div>${summary}${emptyMsg}</div>`;

    // Wire up filter buttons
    const incBtn = document.getElementById("rpt-btn-income");
    const expBtn = document.getElementById("rpt-btn-expense");
    const allBtn = document.getElementById("rpt-btn-all");
    if (incBtn)  incBtn.addEventListener("click",  () => renderReports(filter === "income"  ? "all" : "income"));
    if (expBtn)  expBtn.addEventListener("click",  () => renderReports(filter === "expense" ? "all" : "expense"));
    if (allBtn)  allBtn.addEventListener("click",  () => renderReports("all"));
  }

  // ═══════════════════════════════════════ INIT ═══════════════════════════════════════

  document.addEventListener("DOMContentLoaded", () => {
    initSetup();
  });

})();

