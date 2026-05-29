export type PropertyStat = { label: string; value: string };
export type PropertyDetail = { label: string; value: string };
export type ThesisPoint = { num: string; title: string; italicWord: string; desc: string; tags: string[] };
export type LocationFact = { key: string; value: string };

export type Property = {
  slug: string;
  id: string;
  img: string;
  imgAlt: string;
  images: { src: string; alt: string; caption: string }[];
  badge: string;
  badgeAccent: boolean;
  date: string;
  location: string;
  region: string;
  type: string;
  filter: "residential" | "commercial" | "industrial" | "retail" | "mixed";
  /** Plain text title — first part before the italic word(s) */
  titlePrefix: string;
  /** The italic green word(s) in the headline */
  italicWord: string;
  /** Short overlay caption on the hero image */
  imageCaption: string;
  /** Italic word in the hero image caption */
  imageCaptionItalic: string;
  lede: string;
  desc: string;
  stats: PropertyStat[];
  details: PropertyDetail[];
  thesisPoints: ThesisPoint[];
  locationHeading: string;
  locationHeadingItalic: string;
  locationDesc: string;
  locationFacts: LocationFact[];
};

const properties: Property[] = [
  {
    slug: "spire-portfolio",
    id: "01",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_10_hx3pfn.png",
    imgAlt: "Spire Portfolio — three-bedroom houses, Chesterfield & Mansfield",
    images: [
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_10_hx3pfn.png", alt: "Spire Portfolio — streetview, Chesterfield", caption: "Chesterfield · E. Midlands — three-bedroom freehold streetscape" },
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/0_w1z5et.jpg", alt: "Spire Portfolio — residential streetscape", caption: "Typical unit exterior — traditional construction" },
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg", alt: "Spire Portfolio — typical unit exterior", caption: "Freehold terrace — fully-let, 100% occupancy" },
    ],
    badge: "Just acquired",
    badgeAccent: true,
    date: "May 2026",
    location: "Chesterfield & Mansfield",
    region: "E. Midlands",
    type: "Residential portfolio",
    filter: "residential",
    titlePrefix: "Spire Portfolio —",
    italicWord: "built to hold.",
    imageCaption: "Acquired off-market from a",
    imageCaptionItalic: "motivated vendor.",
    lede: "68 fully-let three-bedroom freehold houses across Chesterfield and Mansfield. Acquired off-market with 100% occupancy and strong transport links. A cornerstone East Midlands addition.",
    desc: "68 fully-let three-bedroom freehold houses across Chesterfield and Mansfield, featuring a mix of traditional and non-traditional construction. Acquired off-market with 100% occupancy, excellent local amenities, and strong transport links to Sheffield and Nottingham. A cornerstone addition to our East Midlands residential book.",
    stats: [
      { label: "Units", value: "68" },
      { label: "Occupancy", value: "100%" },
      { label: "Tenure", value: "Freehold" },
      { label: "Target IRR", value: "13%" },
    ],
    details: [
      { label: "Location", value: "Chesterfield & Mansfield" },
      { label: "Asset type", value: "Residential portfolio" },
      { label: "Construction", value: "Mix — traditional / non-trad" },
      { label: "Acquired", value: "May 2026" },
      { label: "Tenure", value: "Freehold" },
      { label: "Management", value: "In-house" },
      { label: "Target IRR", value: "13%" },
    ],
    thesisPoints: [
      {
        num: "i.",
        title: "Off-market, from a",
        italicWord: "motivated vendor.",
        desc: "Sourced directly with no competitive process. The off-market route allowed us to move quickly and structure terms that worked for both sides — no auction premium, no agent intermediary.",
        tags: ["Off-market", "Proprietary sourcing"],
      },
      {
        num: "ii.",
        title: "Below replacement cost in",
        italicWord: "the East Midlands.",
        desc: "68 freehold houses acquired at a meaningful discount to replacement cost. The gap between land value, build cost, and purchase price underpins our margin of safety and the long-term hold case.",
        tags: ["Sub-replacement", "Mispriced"],
      },
      {
        num: "iii.",
        title: "Zero vacancy from",
        italicWord: "day one.",
        desc: "100% occupancy on completion. Strong local rental demand and an established tenant base mean income begins compounding immediately with no lease-up risk and no void exposure.",
        tags: ["Fully let", "Income-first", "Managed in-house"],
      },
    ],
    locationHeading: "Established rental markets,",
    locationHeadingItalic: "strong transport links.",
    locationDesc: "Chesterfield and Mansfield sit at the heart of the East Midlands commuter corridor, with direct rail access to Sheffield, Nottingham, and Derby. Deep local employment and a structural undersupply of quality rental stock underpin demand.",
    locationFacts: [
      { key: "Catchment", value: "Chesterfield S40 & Mansfield NG18 — established East Midlands commuter towns" },
      { key: "Rail links", value: "Direct services to Sheffield (25 min), Nottingham (30 min), Derby (20 min)" },
      { key: "Employment", value: "Strong local healthcare, retail, and logistics employment base" },
      { key: "Amenities", value: "Town centres, primary schools, and retail parks within easy reach of all units" },
      { key: "Demand", value: "Structural undersupply of quality 3-bed rental stock; minimal void history" },
    ],
  },
  {
    slug: "northampton-portfolio",
    id: "02",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.14.52_f7b7ve.png",
    imgAlt: "Northampton Portfolio — terraced houses, Baker Street",
    images: [
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.14.52_f7b7ve.png", alt: "Northampton terraced houses — Baker Street portfolio", caption: "Northampton · NN1 — Baker Street, terraced freehold" },
    ],
    badge: "Acquired",
    badgeAccent: false,
    date: "Mar 2026",
    location: "Northampton · NN1",
    region: "East Midlands",
    type: "HMO portfolio",
    filter: "residential",
    titlePrefix: "Northampton —",
    italicWord: "sixteen terraced freeholds.",
    imageCaption: "16 freehold houses with",
    imageCaptionItalic: "66 bedrooms.",
    lede: "A freehold collection of 16 terraced houses with 66 bedrooms across Baker Street, Freehold Street, and St Paul's Road — all within 1.5km of the station.",
    desc: "A freehold collection of 16 terraced houses with 66 bedrooms across Baker Street, Freehold Street, and St Paul's Road — all within 1.5km of the station. Strong rental coverage and clear value-add through HMO licensing uplift.",
    stats: [
      { label: "Houses", value: "16" },
      { label: "Beds", value: "66" },
      { label: "Yield", value: "8.7%" },
    ],
    details: [
      { label: "Location", value: "Northampton · NN1" },
      { label: "Asset type", value: "HMO portfolio" },
      { label: "Houses", value: "16" },
      { label: "Bedrooms", value: "66" },
      { label: "Acquired", value: "Mar 2026" },
      { label: "Tenure", value: "Freehold" },
      { label: "Yield", value: "8.7%" },
    ],
    thesisPoints: [
      {
        num: "i.",
        title: "HMO yield play —",
        italicWord: "66 bedrooms.",
        desc: "66 bedrooms across 16 houses offers strong per-unit yield well above vanilla residential. Licensing uplift through proper HMO management provides further upside as we work through the portfolio.",
        tags: ["HMO", "High yield"],
      },
      {
        num: "ii.",
        title: "Freehold tenure,",
        italicWord: "clean title.",
        desc: "Full freehold control over every asset — no ground rent exposure, no leasehold risk, no landlord consent requirements. Simplifies asset management and future disposals considerably.",
        tags: ["Freehold", "Clean title"],
      },
      {
        num: "iii.",
        title: "Station proximity,",
        italicWord: "low void risk.",
        desc: "All 16 properties sit within 1.5km of Northampton station, placing them in the highest-demand rental catchment in the town. A deep tenant pool and strong transport links minimise void periods structurally.",
        tags: ["Transport links", "Low vacancy risk"],
      },
    ],
    locationHeading: "Prime Northampton station",
    locationHeadingItalic: "catchment.",
    locationDesc: "NN1 is Northampton's highest-demand rental postcode — walkable to the station, the town centre, and the university campus. Baker Street and St Paul's Road sit in a cluster of Victorian terraces with historically low void rates.",
    locationFacts: [
      { key: "Catchment", value: "NN1 — prime inner Northampton, walkable to station" },
      { key: "Rail links", value: "Northampton station (Avanti/LNR) ~12 min walk; London Euston 56 min" },
      { key: "University", value: "University of Northampton campus within 2km" },
      { key: "Amenities", value: "Town centre retail, schools, and healthcare within walking distance" },
      { key: "Demand", value: "Deep professional and student tenant pool; strong HMO licensing track record" },
    ],
  },
  {
    slug: "tower-bridge-quarter",
    id: "07",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754229584/TBR_003_l9b8s3.jpg",
    imgAlt: "Tower Bridge Quarter — South Bank mixed-use commercial",
    images: [
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754229584/TBR_003_l9b8s3.jpg", alt: "Tower Bridge Quarter — main elevation, SE1", caption: "South Bank · SE1 — nine-building freehold, Tower Bridge Road" },
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/8.Barry-31RZD_v61kgp.jpg", alt: "Tower Bridge Quarter — retail frontage", caption: "Ground-floor retail — Brewdog, Foxtons, Chestertons" },
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890809/portfolio_by_abby__image36_qx5h2n.png", alt: "Tower Bridge Quarter — street-level view", caption: "Street elevation — prime SE1 frontage" },
    ],
    badge: "Acquired",
    badgeAccent: false,
    date: "Jan 2026",
    location: "South Bank · SE1",
    region: "London",
    type: "Mixed-use commercial",
    filter: "commercial",
    titlePrefix: "Tower Bridge",
    italicWord: "Quarter.",
    imageCaption: "Nine buildings, 39,582 sq ft —",
    imageCaptionItalic: "prime SE1.",
    lede: "Nine buildings totalling 39,582 sq ft in prime South Bank, London. Fully let to Brewdog, Foxtons, Chestertons and others. £899,875 annual income, freehold.",
    desc: "Nine buildings totalling 39,582 sq ft in prime South Bank, London. Fully let to Brewdog, Foxtons, Chestertons and others. £899,875 annual income, freehold, with excellent transport links to Tower Bridge and The Shard. A rare Zone 1 commercial freehold acquired at a yield rarely available in this postcode.",
    stats: [
      { label: "Buildings", value: "9" },
      { label: "Sq ft", value: "39.5k" },
      { label: "Income p.a.", value: "£900k" },
    ],
    details: [
      { label: "Location", value: "South Bank · SE1" },
      { label: "Asset type", value: "Mixed-use commercial" },
      { label: "Buildings", value: "9" },
      { label: "Total sq ft", value: "39,582" },
      { label: "Acquired", value: "Jan 2026" },
      { label: "Tenure", value: "Freehold" },
      { label: "Annual income", value: "£899,875" },
    ],
    thesisPoints: [
      {
        num: "i.",
        title: "Prime SE1 —",
        italicWord: "steps from Tower Bridge.",
        desc: "Steps from Tower Bridge, The Shard, and the Thames Path. One of London's most resilient commercial micro-markets — tourist footfall, city workers, and riverside residents provide a permanently deep tenant pool.",
        tags: ["Prime London", "SE1"],
      },
      {
        num: "ii.",
        title: "Blue-chip tenants,",
        italicWord: "institutional-grade income.",
        desc: "Brewdog, Foxtons, Chestertons — established operators with strong covenant strength. Institutional-quality income from day one with a diversified rent roll across nine buildings and multiple tenants.",
        tags: ["Strong covenant", "Diversified income"],
      },
      {
        num: "iii.",
        title: "Freehold commercial,",
        italicWord: "acquired at yield.",
        desc: "39,582 sq ft freehold in Zone 1 London, fully let at £900k income p.a. Acquired at a yield rarely achievable in this postcode. Long-term capital appreciation underpins the hold case alongside current income.",
        tags: ["Freehold", "Capital growth"],
      },
    ],
    locationHeading: "Prime South Bank,",
    locationHeadingItalic: "steps from Tower Bridge.",
    locationDesc: "SE1 is one of London's most sought-after commercial addresses — the South Bank corridor from Waterloo to Tower Bridge carries the highest footfall of any riverside stretch in the capital.",
    locationFacts: [
      { key: "Catchment", value: "South Bank · SE1 — prime Zone 1 London, Tower Bridge Road" },
      { key: "Transport", value: "London Bridge (Jubilee/Northern) ~8 min walk; Tower Hill nearby" },
      { key: "Footfall", value: "South Bank draws 14m+ visitors annually; highest-footfall riverside corridor" },
      { key: "Tenants", value: "Brewdog, Foxtons, Chestertons — national and international covenants" },
      { key: "Demand", value: "Prime Zone 1 commercial rarely available; supply severely constrained" },
    ],
  },
  {
    slug: "newlands-croft",
    id: "03",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954163/11_qsbhoy.jpg",
    imgAlt: "Newlands Croft — Bromley, Lennard Road SE20",
    images: [
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954163/11_qsbhoy.jpg", alt: "Newlands Croft, Lennard Road SE20", caption: "Lennard Road · SE20 — 12 refurbished flats" },
    ],
    badge: "Stabilised",
    badgeAccent: false,
    date: "2022",
    location: "Bromley · SE20",
    region: "London",
    type: "Residential block",
    filter: "residential",
    titlePrefix: "Newlands",
    italicWord: "Croft.",
    imageCaption: "12 flats, fully redeveloped,",
    imageCaptionItalic: "managed in-house.",
    lede: "Originally built in the 1940s as 16 flats, redeveloped into 12 spacious flats on Lennard Road SE20. Managed in-house by our team.",
    desc: "Originally built in the 1940s as 16 flats, redeveloped into 12 spacious, high-quality apartments on Lennard Road SE20. Fully managed in-house by the Crestbourne team. A stabilised London residential asset generating consistent income in the Overground corridor.",
    stats: [
      { label: "Units", value: "12" },
      { label: "Yield", value: "6.9%" },
      { label: "Held since", value: "2022" },
    ],
    details: [
      { label: "Location", value: "Lennard Road, SE20" },
      { label: "Asset type", value: "Residential block" },
      { label: "Construction", value: "1940s, redeveloped" },
      { label: "Acquired", value: "2022" },
      { label: "Yield", value: "6.9%" },
      { label: "Units", value: "12" },
      { label: "Management", value: "In-house" },
    ],
    thesisPoints: [
      {
        num: "i.",
        title: "Redevelopment to",
        italicWord: "stabilise.",
        desc: "Converted from 16 substandard flats into 12 high-quality units. The redevelopment compressed yield on cost and created a fully modernised asset ready for long-term in-house management.",
        tags: ["Redevelopment", "Value-add"],
      },
      {
        num: "ii.",
        title: "In-house management,",
        italicWord: "no outsourcing.",
        desc: "Managed entirely by the Crestbourne team from day one. No managing agent fees, no principal-agent misalignment — just direct oversight of every tenancy and repair decision.",
        tags: ["In-house", "Operator-led"],
      },
      {
        num: "iii.",
        title: "London residential,",
        italicWord: "long hold.",
        desc: "SE20 sits in the Overground corridor with strong long-term capital growth dynamics. A steady income asset with structural demand underpinning the vacancy floor across a deep Bromley rental market.",
        tags: ["London", "Long-hold"],
      },
    ],
    locationHeading: "SE20 Overground corridor,",
    locationHeadingItalic: "deep rental demand.",
    locationDesc: "Lennard Road SE20 sits in Penge — a Bromley Overground stop with improving tenant demographics, good schools, and direct links to London Bridge and Victoria. Structural undersupply of quality converted flats in the area.",
    locationFacts: [
      { key: "Catchment", value: "Lennard Road, Penge · SE20 — Bromley borough" },
      { key: "Overground", value: "Penge East (Southeastern) & Anerley station within short walk" },
      { key: "Links", value: "Direct to London Bridge (20 min), Victoria (25 min)" },
      { key: "Amenities", value: "Penge High St, primary schools, and Crystal Palace Park nearby" },
      { key: "Demand", value: "Strong demand from professional tenants and young families in SE London" },
    ],
  },
  {
    slug: "london-portfolio",
    id: "04",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/0_sqbh8z.jpg",
    imgAlt: "London residential portfolio — Greater London properties",
    images: [
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/0_sqbh8z.jpg", alt: "London portfolio property", caption: "Greater London — 10 freehold residential properties" },
    ],
    badge: "Just let",
    badgeAccent: false,
    date: "2025",
    location: "Greater London",
    region: "London",
    type: "Residential portfolio",
    filter: "residential",
    titlePrefix: "London",
    italicWord: "Portfolio.",
    imageCaption: "10 freehold properties across",
    imageCaptionItalic: "Greater London.",
    lede: "10 freehold properties across Croydon, Edmonton, Walthamstow, and Romford. Strong rental yields and capital growth potential in established commuter catchments.",
    desc: "10 freehold properties across Croydon, Edmonton, Walthamstow, and Romford. Strong rental yields and capital growth potential in established commuter catchments with deep tenant pools and solid transport links into central London.",
    stats: [
      { label: "Properties", value: "10" },
      { label: "Tenure", value: "Freehold" },
      { label: "Held since", value: "2025" },
    ],
    details: [
      { label: "Location", value: "Greater London" },
      { label: "Boroughs", value: "Croydon, Edmonton, Walthamstow, Romford" },
      { label: "Asset type", value: "Residential portfolio" },
      { label: "Acquired", value: "2025" },
      { label: "Tenure", value: "Freehold" },
      { label: "Properties", value: "10" },
    ],
    thesisPoints: [
      {
        num: "i.",
        title: "Commuter belt",
        italicWord: "diversification.",
        desc: "Spread across four established Greater London markets. Each borough sits on a key commuter rail corridor with deep rental demand from the professional and family tenant segments.",
        tags: ["Diversified", "Commuter belt"],
      },
      {
        num: "ii.",
        title: "Freehold residential,",
        italicWord: "clean title.",
        desc: "10 freehold residential properties with no leasehold complications. Clean titles, direct management, and no service charge exposure — straightforward to hold and to exit.",
        tags: ["Freehold", "Clean title"],
      },
      {
        num: "iii.",
        title: "Capital growth with",
        italicWord: "current yield.",
        desc: "London residential at meaningful yield — rare in the current market. The commuter corridor dynamic provides both immediate income and a credible capital appreciation runway.",
        tags: ["Yield", "Capital growth"],
      },
    ],
    locationHeading: "London commuter corridor,",
    locationHeadingItalic: "diversified across four boroughs.",
    locationDesc: "Croydon, Edmonton, Walthamstow, and Romford all share strong Overground, Elizabeth line, or National Rail connectivity into central London. Established residential markets with deep and historically stable tenant demand.",
    locationFacts: [
      { key: "Boroughs", value: "Croydon (CR), Edmonton (N18), Walthamstow (E17), Romford (RM)" },
      { key: "Transport", value: "Elizabeth line, Overground, and National Rail coverage across all four locations" },
      { key: "Links", value: "Central London within 30–45 min from all properties" },
      { key: "Demand", value: "Deep professional and family tenant market across all four boroughs" },
      { key: "Tenure", value: "10 freeholds — no ground rent, no leasehold risk" },
    ],
  },
  {
    slug: "west-midlands-portfolio",
    id: "05",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/0_w1z5et.jpg",
    imgAlt: "West Midlands residential portfolio — Birmingham, Walsall, Dudley",
    images: [
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/0_w1z5et.jpg", alt: "West Midlands portfolio property", caption: "Birmingham & Walsall — 10 freehold residential properties" },
    ],
    badge: "Stabilised",
    badgeAccent: false,
    date: "2024",
    location: "Birmingham & Walsall",
    region: "West Midlands",
    type: "Residential portfolio",
    filter: "residential",
    titlePrefix: "West Midlands",
    italicWord: "Portfolio.",
    imageCaption: "10 freeholds, fully let —",
    imageCaptionItalic: "compounding quietly.",
    lede: "10 freehold properties across Birmingham, Walsall, Dudley, and West Bromwich. Fully let with strong local rental demand and excellent transport links.",
    desc: "10 freehold properties across Birmingham, Walsall, Dudley, and West Bromwich. Excellent transport links via the West Midlands Metro and National Rail network. Fully let with strong local rental demand across all four markets.",
    stats: [
      { label: "Properties", value: "10" },
      { label: "Tenure", value: "Freehold" },
      { label: "Held since", value: "2024" },
    ],
    details: [
      { label: "Location", value: "Birmingham & Walsall" },
      { label: "Region", value: "West Midlands" },
      { label: "Asset type", value: "Residential portfolio" },
      { label: "Acquired", value: "2024" },
      { label: "Tenure", value: "Freehold" },
      { label: "Properties", value: "10" },
    ],
    thesisPoints: [
      {
        num: "i.",
        title: "Regional diversification,",
        italicWord: "four markets.",
        desc: "Spread across Birmingham, Walsall, Dudley, and West Bromwich. Each location benefits from the region's deep industrial and commuter employment base and strong transport infrastructure.",
        tags: ["West Midlands", "Diversified"],
      },
      {
        num: "ii.",
        title: "Metro connectivity,",
        italicWord: "low void risk.",
        desc: "All properties within easy reach of the West Midlands Metro and rail network. Transport connectivity drives tenant quality and structurally minimises void periods across all four locations.",
        tags: ["Transport", "Low void"],
      },
      {
        num: "iii.",
        title: "Fully let,",
        italicWord: "income compounding.",
        desc: "100% occupancy across the portfolio on acquisition. In a market with structural undersupply of quality rental stock, income begins compounding immediately with no lease-up risk.",
        tags: ["Fully let", "Income-first"],
      },
    ],
    locationHeading: "West Midlands Metro corridor,",
    locationHeadingItalic: "deep employment base.",
    locationDesc: "Birmingham, Walsall, Dudley, and West Bromwich form part of the West Midlands conurbation — the UK's second largest urban economy. The Metro network provides connectivity across all four markets and a deep professional tenant pool.",
    locationFacts: [
      { key: "Catchment", value: "Birmingham, Walsall, Dudley, West Bromwich — West Midlands conurbation" },
      { key: "Metro", value: "West Midlands Metro stops within reach of all properties" },
      { key: "Rail", value: "National Rail connections from Birmingham New Street and Walsall" },
      { key: "Employment", value: "Deep manufacturing, logistics, and services employment base" },
      { key: "Demand", value: "Structural undersupply of quality 3-bed rental stock across all four locations" },
    ],
  },
  {
    slug: "north-west-portfolio",
    id: "06",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg",
    imgAlt: "North West portfolio — Manchester, Worsley Road",
    images: [
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg", alt: "North West portfolio, Worsley Road", caption: "Manchester — Worsley Road, typical residential" },
    ],
    badge: "Long-hold",
    badgeAccent: false,
    date: "2021",
    location: "Manchester & Liverpool",
    region: "North West",
    type: "Residential portfolio",
    filter: "residential",
    titlePrefix: "North West",
    italicWord: "Portfolio.",
    imageCaption: "Held since 2021 —",
    imageCaptionItalic: "income compounding.",
    lede: "Properties across Manchester, Liverpool, Blackpool, Leeds, and Bradford. 8.4% yield across a long-hold portfolio of 5 northern freehold properties.",
    desc: "Properties across Manchester, Liverpool, Blackpool, Leeds, and Bradford. Strong rental yields and deep tenant demand across established northern markets. Acquired in 2021 and held through the rate cycle — a patient capital success story.",
    stats: [
      { label: "Properties", value: "5" },
      { label: "Yield", value: "8.4%" },
      { label: "Held since", value: "2021" },
    ],
    details: [
      { label: "Location", value: "Manchester & Liverpool" },
      { label: "Region", value: "North West" },
      { label: "Asset type", value: "Residential portfolio" },
      { label: "Acquired", value: "2021" },
      { label: "Yield", value: "8.4%" },
      { label: "Properties", value: "5" },
    ],
    thesisPoints: [
      {
        num: "i.",
        title: "Northern yield",
        italicWord: "premium.",
        desc: "8.4% yield across a portfolio of five northern properties — a return rarely achievable in London at comparable quality. Northern markets reward patient capital with strong income and improving capital values.",
        tags: ["High yield", "Patient capital"],
      },
      {
        num: "ii.",
        title: "Deep tenant demand,",
        italicWord: "low vacancy.",
        desc: "Manchester, Liverpool, and surrounding markets have some of the UK's tightest rental supply relative to demand. Graduate and professional tenant pools are large, growing, and well-qualified.",
        tags: ["Tenant demand", "Supply shortage"],
      },
      {
        num: "iii.",
        title: "Held through the cycle,",
        italicWord: "compounding.",
        desc: "Acquired in 2021 and held through the rate cycle. The income has compounded steadily; the equity has de-risked. This is the Crestbourne long-horizon model working exactly as designed.",
        tags: ["Long-hold", "Income compounding"],
      },
    ],
    locationHeading: "Northern markets,",
    locationHeadingItalic: "strong tenant demand.",
    locationDesc: "Manchester, Liverpool, Blackpool, Leeds, and Bradford share deep rental markets with strong employment bases and structurally undersupplied quality stock. The northern powerhouse corridor continues to attract tenant and investor interest.",
    locationFacts: [
      { key: "Markets", value: "Manchester, Liverpool, Blackpool, Leeds, Bradford — Northern Powerhouse corridor" },
      { key: "Transport", value: "Northern Rail and Avanti connections across all locations" },
      { key: "Employment", value: "Deep media, financial services, manufacturing, and logistics employment" },
      { key: "Universities", value: "Multiple Russell Group universities within the catchment area" },
      { key: "Demand", value: "Structural undersupply; graduate and professional tenants in large volume" },
    ],
  },
  {
    slug: "barry-retail-parade",
    id: "08",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/8.Barry-31RZD_v61kgp.jpg",
    imgAlt: "Barry Retail Parade — Holton Road, South Wales",
    images: [
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/8.Barry-31RZD_v61kgp.jpg", alt: "Barry Retail Parade, Holton Road", caption: "Holton Road · Barry CF63 — 13 retail units, 53,500 sq ft" },
    ],
    badge: "Stabilised",
    badgeAccent: false,
    date: "2023",
    location: "Barry · CF63",
    region: "South Wales",
    type: "Retail parade",
    filter: "commercial",
    titlePrefix: "Barry Retail",
    italicWord: "Parade.",
    imageCaption: "Anchored by Boots, Iceland,",
    imageCaptionItalic: "and Greggs.",
    lede: "13 retail units across 53,500 sq ft on Holton Road, Barry. Anchored by Boots, Iceland, Greggs, TUI, NatWest, and Poundland. £401,550 annual income.",
    desc: "13 retail units across 53,500 sq ft on Holton Road, Barry. Anchored by Boots, Iceland, Greggs, TUI, NatWest, and Poundland. £401,550 annual income. The dominant retail destination in Barry town centre.",
    stats: [
      { label: "Units", value: "13" },
      { label: "Sq ft", value: "53.5k" },
      { label: "Income p.a.", value: "£402k" },
      { label: "Held since", value: "2023" },
    ],
    details: [
      { label: "Location", value: "Holton Road, Barry" },
      { label: "Region", value: "South Wales" },
      { label: "Asset type", value: "Retail parade" },
      { label: "Acquired", value: "2023" },
      { label: "Units", value: "13" },
      { label: "Total sq ft", value: "53,500" },
      { label: "Income p.a.", value: "£401,550" },
    ],
    thesisPoints: [
      {
        num: "i.",
        title: "Institutional anchor",
        italicWord: "tenants.",
        desc: "Boots, Iceland, Greggs, TUI, NatWest, Poundland — a roll call of national covenant tenants. Anchor tenants drive footfall for the smaller units and underpin income resilience across the parade.",
        tags: ["Strong covenant", "Anchor tenants"],
      },
      {
        num: "ii.",
        title: "High-yield retail,",
        italicWord: "regional.",
        desc: "£402k annual income from 53,500 sq ft freehold retail acquired at a yield well above institutional benchmarks. Regional retail at the right price offers asymmetric return potential.",
        tags: ["High yield", "Regional retail"],
      },
      {
        num: "iii.",
        title: "Town centre",
        italicWord: "dominance.",
        desc: "Holton Road is Barry's primary retail artery. The parade holds a near-monopoly position on comparison and convenience retail in the catchment — a difficult position to replicate.",
        tags: ["Dominant location", "Barriers to entry"],
      },
    ],
    locationHeading: "Barry's dominant",
    locationHeadingItalic: "retail destination.",
    locationDesc: "Holton Road is Barry's primary retail street. The town of 55,000 has limited alternative retail provision, meaning the parade captures a disproportionate share of comparison and convenience retail spend.",
    locationFacts: [
      { key: "Catchment", value: "Barry CF63 — town population ~55,000, South Wales coast" },
      { key: "Rail", value: "Barry station (Barry Line) ~5 min walk; Cardiff Central 25 min" },
      { key: "Retail", value: "Dominant position — no competing retail parks within town catchment" },
      { key: "Anchors", value: "Boots, Iceland, Greggs, TUI, NatWest, Poundland — all in situ" },
      { key: "Footfall", value: "Primary shopping street for the Barry catchment; high repeat footfall" },
    ],
  },
  {
    slug: "cheltenham-parade",
    id: "09",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890809/portfolio_by_abby__image36_qx5h2n.png",
    imgAlt: "Cheltenham Parade — retail and office, central Cheltenham",
    images: [
      { src: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890809/portfolio_by_abby__image36_qx5h2n.png", alt: "Cheltenham Parade, central Cheltenham", caption: "Central Cheltenham · GL50 — 11 retail units with office uppers" },
    ],
    badge: "Stabilised",
    badgeAccent: false,
    date: "2022",
    location: "Cheltenham · GL50",
    region: "Gloucestershire",
    type: "Retail & office",
    filter: "mixed",
    titlePrefix: "Cheltenham",
    italicWord: "Parade.",
    imageCaption: "11 units, £188k income —",
    imageCaptionItalic: "compounding.",
    lede: "11 retail units with office upper floors in central Cheltenham. £187,500 annual income from a diversified tenant mix in a prime town centre location.",
    desc: "11 retail units with office upper floors in central Cheltenham. £187,500 annual income from a diversified tenant mix in a prime town centre location. Cheltenham GL50 is one of England's most prosperous retail postcodes.",
    stats: [
      { label: "Units", value: "11" },
      { label: "Income p.a.", value: "£188k" },
      { label: "Held since", value: "2022" },
    ],
    details: [
      { label: "Location", value: "Central Cheltenham" },
      { label: "Region", value: "Gloucestershire" },
      { label: "Asset type", value: "Retail & office" },
      { label: "Acquired", value: "2022" },
      { label: "Units", value: "11" },
      { label: "Income p.a.", value: "£187,500" },
    ],
    thesisPoints: [
      {
        num: "i.",
        title: "Affluent catchment,",
        italicWord: "prime GL50.",
        desc: "Cheltenham GL50 is one of England's most prosperous town centre postcodes — high average household income, strong independent retail culture, and low vacancy rates on prime streets.",
        tags: ["Affluent market", "Prime town centre"],
      },
      {
        num: "ii.",
        title: "Mixed-use income,",
        italicWord: "two revenue streams.",
        desc: "Retail ground floors topped by office upper floors provide diversified income streams — two tenant profiles, two rent cycles, one freehold structure. Simplifies the hold; complicates any exit for a buyer.",
        tags: ["Mixed-use", "Diversified income"],
      },
      {
        num: "iii.",
        title: "Stabilised,",
        italicWord: "quietly compounding.",
        desc: "Acquired, stabilised, and now quietly compounding. £188k annual income from an 11-unit parade in a location that rewards patient long-term ownership and punishes short-term thinking.",
        tags: ["Stabilised", "Long-hold"],
      },
    ],
    locationHeading: "Prime Cheltenham,",
    locationHeadingItalic: "affluent GL50.",
    locationDesc: "Central Cheltenham is one of England's most sought-after town centre retail and office markets. GL50 carries high average household income and a strong independent retail culture alongside established national operators.",
    locationFacts: [
      { key: "Catchment", value: "Central Cheltenham · GL50 — prime Regency town centre" },
      { key: "Rail", value: "Cheltenham Spa station (GWR) ~10 min; London Paddington 2h 10m" },
      { key: "Demographics", value: "Above-average household income; professional and retiree-heavy catchment" },
      { key: "Retail", value: "Prime pedestrianised town centre; low vacancy rates on comparable streets" },
      { key: "Office", value: "Strong demand for upper-floor office from professional services firms" },
    ],
  },
];

export default properties;

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return properties.map((p) => p.slug);
}

export function getRelatedProperties(slug: string, filter: string, count = 3): Property[] {
  const sameFilter = properties.filter((p) => p.slug !== slug && p.filter === filter);
  const others = properties.filter((p) => p.slug !== slug && p.filter !== filter);
  return [...sameFilter, ...others].slice(0, count);
}
