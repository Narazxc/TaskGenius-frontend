function TaskCountCard({
  icon,
  taskCount,
  text,
  iconBgColor,
  isCollabTaskMode,
}) {
  // bg - gray - 300;
  return (
    <div className="col-span-2 h-[152px] rounded-md bg-white">
      {/* bg-red-400 */}
      <div className="flex h-full items-center justify-between px-8">
        <div>
          <span className="mb-3 text-4xl font-[500]">{taskCount}</span>
          <p className="text-lg text-[#495057]">{text}</p>
        </div>
        <div className={`rounded-full ${iconBgColor} p-4`}>{icon}</div>
      </div>
    </div>
  );
}

export default TaskCountCard;
