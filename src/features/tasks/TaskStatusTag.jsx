const statuses = [
  { text: "To do", bgColor: `bg-[#868e96]` },
  { text: "On hold", bgColor: `bg-[#ff6b6b]` },
  { text: "In progress", bgColor: `bg-[#fcc419]` },
  { text: "Completed", bgColor: `bg-[#51cf66]` },
];

function TaskStatusTag({ statusText }) {
  const matchingStatus = statuses.find(
    (s) => statusText.toLowerCase() === s.text.toLowerCase(),
  );
  const status = matchingStatus;

  return (
    <span
      className={`${status.bgColor} inline-block self-start justify-self-start rounded-full px-4 py-0.5 text-sm text-white`}
    >
      {status.text}
    </span>
  );
}

export default TaskStatusTag;
