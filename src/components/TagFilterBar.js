import React from "react";
import { Tag } from "antd";

const TagFilterBar = ({ allTags, selectedTags, onToggle }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {allTags.map((tag) => (
        <Tag
          key={tag}
          color={selectedTags.includes(tag) ? "purple" : "default"}
          style={{ cursor: "pointer", fontSize: "14px", padding: "5px 10px" }}
          onClick={() => onToggle(tag)}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
};

export default TagFilterBar;