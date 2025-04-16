import { parseTier } from "../config/VlrtTierConfig";

export const VlrtTierBadge = ({ tier, rr, style }) => {
  const { koreanTier, division, color } = parseTier(tier);

  return (
    <div
      style={{
        backgroundColor: color , // 30% 투명도 추가
        padding: "3px 12px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        ...style
      }}
    >
      <span style={{ 
        fontWeight: "bold", 
        color: "white",
        fontSize: 14
      }}>
        {koreanTier} {division && `${division}`}
      </span>
      {rr !== undefined && (
        <span style={{ 
          color: "white",
          fontSize: 10,
          fontWeight: 500
        }}>
          {rr} RR
        </span>
      )}
    </div>
  );
};