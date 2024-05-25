function ActivityList({ children }) {
  // bg-purple-400
  return (
    <ul className="flex max-h-[600px] flex-col divide-y overflow-hidden overflow-y-auto rounded-md p-4 shadow-inner scrollbar-thin">
      {/* bg-gray-200 */}
      {/* gap-2 */}
      {children}
    </ul>
  );
}

export default ActivityList;
