
export const ValorantTier = Object.freeze({
    RADIANT: "레디언트",

    IMMORTAL_3: "불멸 3",
    IMMORTAL_2: "불멸 2",
    IMMORTAL_1: "불멸 1",

    ASCENDANT_3: "초월자 3",
    ASCENDANT_2: "초월자 2",
    ASCENDANT_1: "초월자 1",

    DIAMOND_3: "다이아몬드 3",
    DIAMOND_2: "다이아몬드 2",
    DIAMOND_1: "다이아몬드 1",

    PLATINUM_3: "플래티넘 3",
    PLATINUM_2: "플래티넘 2",
    PLATINUM_1: "플래티넘 1",

    GOLD_3: "골드 3",
    GOLD_2: "골드 2",
    GOLD_1: "골드 1",

    SILVER_3: "실버 3",
    SILVER_2: "실버 2",
    SILVER_1: "실버 1",
    
    BRONZE_3: "브론즈 3",
    BRONZE_2: "브론즈 2",
    BRONZE_1: "브론즈 1",

    IRON_3: "아이언 3",
    IRON_2: "아이언 2",
    IRON_1: "아이언 1",
  });

  export const baseTierConfigs = {
    '레디언트': {
      color: '#928445'
    },
    '불멸': { 
      color: '#a73871'
    },
    '초월자': {
      color: '#10633a'
    },
    '다이아몬드': {
      color: '#f096f2'
    },
    '플래티넘': {
      color: '#39a3b2'
    },
    '골드': {
      color: '#f3ebb4'
    },
    '실버': {
      color: '#c1c6c4'
    },
    '브론즈': {
      color: '#553b08'
    },
    '아이언': {
      color: '#595959'
    }
  };
  
  export const parseTier = (tier) => {
    if (tier === 'RADIANT') {
        return {
          koreanTier: '레디언트',
          division: null,
          color: baseTierConfigs['레디언트'].color
        };
      }
    
      const [baseTier, division] = tier.split('_');
      
      const koreanTierMap = {
        IMMORTAL: '불멸',
        ASCENDANT: '초월자',
        DIAMOND: '다이아몬드',
        PLATINUM: '플래티넘',
        GOLD: '골드',
        SILVER: '실버',
        BRONZE: '브론즈',
        IRON: '아이언'
      };
    
      return {
        koreanTier: koreanTierMap[baseTier] || '알수없음',
        division: division || null,
        color: baseTierConfigs[koreanTierMap[baseTier]]?.color || '#d3d3d3'
      };
  };