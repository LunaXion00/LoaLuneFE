import { useState, useEffect } from "react";

const useTagFilter = (data) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [allTags, setAllTags] = useState([]);

  // 태그 목록 추출
  useEffect(() => {
    const tagSet = new Set();
    data.forEach((item) => item.tags?.forEach((tag) => tagSet.add(tag)));
    setAllTags([...tagSet]);
  }, [data]);

  // 필터링 로직 적용
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          selectedTags.every((tag) => item.tags?.includes(tag))
        )
      );
    }
  }, [data, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return {
    allTags,
    selectedTags,
    toggleTag,
    filteredData,
  };
};

export default useTagFilter;