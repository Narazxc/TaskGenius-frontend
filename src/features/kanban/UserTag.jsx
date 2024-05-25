import { IoCloseOutline } from "react-icons/io5";

export function UserTag({ userId, name, onDeleteTag }) {
  //
  // console.log(userId)
  return (
    <div className="flex items-center justify-center gap-4 rounded-md bg-purple-300 px-4 py-1">
      <span>{name}</span>
      <span className="cursor-pointer" onClick={() => onDeleteTag(userId)}>
        <IoCloseOutline className="rounded-full bg-purple-400 text-lg text-purple-600 transition-colors duration-200 hover:bg-red-200 hover:text-red-500" />
      </span>
    </div>
  );
}
