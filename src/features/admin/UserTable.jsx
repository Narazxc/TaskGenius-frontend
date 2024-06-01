import { PulseLoader } from "react-spinners";
import { useUsers } from "./useUsers";
import UserRow from "./UserRow";
import { IoAlarmOutline, IoSearchOutline } from "react-icons/io5";
import Fuse from "fuse.js";
import AdminTableOperations from "./AdminTableOperations";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserTable() {
  const navigate = useNavigate();
  const { isLoading, users } = useUsers();
  const [userQuery, setUserQuery] = useState("");
  const [userResults, setUserResults] = useState([]);

  // useEffect(() => {
  //   if (userQuery !== "") {
  //     navigate("/admin");
  //   }
  // }, [userQuery, navigate]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center ">
        <PulseLoader color="#4a1d96" speedMultiplier={0.75} size={24} />
      </div>
    );

  const fuseUser = new Fuse(users, { keys: [`name`] });

  function handleSearchUsers(string) {
    setUserResults(fuseUser.search(string).slice(0, 5));
  }

  // console.log(userQuery);
  // console.log(userResults);

  if (users.length === 0) return <p>No users could be found.</p>;

  // border-gray-100 text-black dark:border-opacity-30

  return (
    <>
      <div className="mb-4 flex justify-between">
        <div className="flex items-center gap-2 rounded-md border border-gray-100 bg-dashboard-block p-2 shadow-sm focus:border-2 focus:border-purple-800 focus:ring-0 dark:border-opacity-20 dark:focus:border-purple-800">
          <IoSearchOutline />
          <input
            className="border-none bg-dashboard-block p-0 ring-0 focus:border-none focus:ring-0 active:border-none"
            type="text"
            placeholder="John doe"
            value={userQuery}
            onChange={(e) => {
              setUserQuery(e.target.value);
              handleSearchUsers(e.target.value);
            }}
          />
        </div>

        <div>
          <AdminTableOperations />
        </div>
      </div>
      {/* _id: userId, name, email, photo, role, createdAt */}
      <div className="">
        <table className="w-full rounded-lg border-[0.5px] border-white/20 bg-card-background dark:text-[#efeff1]">
          <thead className=" text-left">
            <tr className="grid w-full grid-cols-[150px_1fr_100px_200px_1fr_1fr_1fr] grid-rows-[40px] items-center gap-10 px-[24px] py-[16px] text-sm uppercase">
              <th className="">User id</th>
              <th className="">name</th>
              <th className="flex items-center gap-2">
                <span>photo</span>
              </th>
              <th className="">email</th>
              <th className="">role</th>
              <th className="">Created at</th>
              {/* <th className=""></th> */}
              {/* font-[600] */}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-white/5">
            {userResults.length > 0
              ? userResults.map((el) => (
                  <UserRow key={el.item._id} user={el.item} />
                ))
              : users &&
                users.map((user) => <UserRow key={user._id} user={user} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserTable;
