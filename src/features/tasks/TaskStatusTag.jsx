import { useDarkMode } from "../../hooks/useDarkMode";

const statuses = [
  { text: "To do", bgColor: `bg-[#868e96]` },
  { text: "On hold", bgColor: `bg-[#ff6b6b]` },
  { text: "In progress", bgColor: `bg-[#fcc419]` },
  { text: "Completed", bgColor: `bg-[#51cf66]` },
];

const statusesDark = [
  {
    text: "To do",
    bgColor: `bg-[#868e96]/90`,
    textColor: `dark:text-[#eff7ff]`,
  },
  {
    text: "On hold",
    bgColor: `bg-[#ff6b6b]/90`,
    textColor: `dark:text-[#f9ecec]`,
  },
  {
    text: "In progress",
    bgColor: `bg-[#fcc419]/90`,
    textColor: `dark:text-[#fffdf5]`,
  },
  {
    text: "Completed",
    bgColor: `bg-[#51cf66]/90`,
    textColor: `dark:text-[#f8fff9]`,
  },
];

function TaskStatusTag({ statusText }) {
  const { isDarkMode } = useDarkMode();

  let statusArr;
  if (isDarkMode) {
    statusArr = statusesDark;
  } else {
    statusArr = statuses;
  }

  const matchingStatus = statusArr.find(
    (s) => statusText.toLowerCase() === s.text.toLowerCase(),
  );
  const status = matchingStatus;

  return (
    <span
      className={`${status.bgColor} ${status.textColor} inline-block self-start justify-self-start rounded-full px-4 py-0.5 text-sm text-white`}
    >
      {status.text}
    </span>
  );
}

export default TaskStatusTag;
