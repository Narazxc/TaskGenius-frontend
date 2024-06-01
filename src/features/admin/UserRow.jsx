import { format } from "date-fns";
import { url } from "../../utils/constants";
import DropDownForAdminTable from "./DropDownForAdminTable";

function UserRow({ user }) {
  const { _id: userId, name, email, photo, role } = user;
  let { createdAt } = user;

  // console.log(user);

  let formattedDate;
  let formattedTime;

  if (createdAt) {
    formattedDate = format(createdAt, "MMMM dd, yyyy");
    formattedTime = format(createdAt, "h:mm a");
  }

  return (
    <>
      <tr className="grid w-full grid-cols-[150px_1fr_100px_200px_1fr_1fr_1fr] grid-rows-[40px] items-center gap-10 bg-gray-100 px-[24px] py-[12px] last:rounded-b-lg dark:bg-[#0f0f0f]">
        <td className="truncate">{userId}</td>
        <td className="truncate">{name}</td>
        <td>
          <div className="flex items-center gap-4">
            <img
              className="h-10 w-10 rounded-full"
              src={`${user.photo && url + `${user.photo}`}`}
              alt={`Photo of ${user.name}`}
            />
          </div>
        </td>
        <td className="truncate">{email}</td>
        <td className="">{role}</td>
        <td className="text-md flex flex-col justify-center">
          {!createdAt ? (
            "unavailable"
          ) : (
            <div>
              {formattedDate} <br />
              <span className="text-sm text-black/50 dark:text-white/50">
                {formattedTime}
              </span>
            </div>
          )}
        </td>

        {/* <td className="">
          <div className="relative flex h-full w-full items-center justify-center">
            <DropDownForAdminTable userId={userId} />
          </div>
        </td> */}
      </tr>
    </>
  );
}

export default UserRow;
