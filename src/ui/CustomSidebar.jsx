import viteLogo from "/vite.svg";
import MainNav from "./MainNav";

function CustomSidebar({ isOpen, onHandleSidebar }) {
  // const [isOpen, setIsOpen] = useState(false);

  // function handleOpenSidebar() {
  //   console.log("hello");
  //   setIsOpen((isOpen) => !isOpen);
  // }

  // "w-[70px]" : "w-[20px]"
  // "w-[4rem]" : "w-[17rem]"

  // `${
  //       isOpen ? "w-[1rem]" : "w-[17rem]"
  //     }

  // px-[2.4rem] py-[3.2rem]

  // px-[1.2rem] py-[2.4rem]
  // ;
  return (
    <aside
      className={`relative row-span-full row-start-2 bg-purple-900 px-1  ${
        isOpen ? "w-80" : "w-[84px]"
      } transition-width text-white  duration-300 ease-in-out`}
    >
      <img
        src={viteLogo}
        alt="vite logo"
        className="border-dark-purple absolute right-[-18px] top-9 z-[999] cursor-pointer rounded-full border-2 bg-white"
        onClick={onHandleSidebar}
      />
      {/* <div>Sidebar</div> */}
      {/* <button className="absolute">open</button> */}
      <MainNav isOpen={isOpen} />
    </aside>
  );
}

export default CustomSidebar;
