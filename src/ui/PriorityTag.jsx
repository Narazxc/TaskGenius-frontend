const prios = [
  { text: "High", bgColor: `bg-[#5f3dc4]` },
  { text: "Medium", bgColor: `bg-[#7950f2]` },
  { text: "Low", bgColor: `bg-[#b197fc]` },
];

function PriorityTag({ priorityText }) {
  let tag;

  const matchingPriority = prios.find(
    (p) => priorityText.toLowerCase() === p.text.toLowerCase(),
  );
  tag = matchingPriority; // Assign the matching object, or undefined if not found

  return (
    <div
      className={`${tag.bgColor} inline-block self-start justify-self-start rounded-full px-4 py-0.5 text-sm text-white`}
    >
      <span>{tag.text}</span>
    </div>
  );
}

export default PriorityTag;
