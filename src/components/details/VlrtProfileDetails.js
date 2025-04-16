import {Tag} from 'antd';
import { VlrtTierBadge } from '../VlrtTierBadge';

const VlrtProfileDetails = ({ characters }) => (
    <div className="grid grid-cols-2 gap-6 mt-2">
      {characters.map((char, index) => (
        <div
        key={index}
        style={{
          padding: "4px",
          marginBottom: "1px",
        }}
      >
          <div className="flex items-center justify-between mb-2">
            <div style={{ display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                <span className="font-semibold">{char.CharacterName}</span>
                    <VlrtTierBadge tier={char.Tier} rr={char.RankRating} />
                    <Tag color="default" style={{ marginLeft: "auto" }}>
                    {char.server}
                    </Tag>
                </div>
            </div>
        </div>
      ))}
    </div>
  );

  export default VlrtProfileDetails;                                