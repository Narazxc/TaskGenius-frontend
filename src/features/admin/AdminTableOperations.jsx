import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function AdminTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterdField="role"
        options={[
          { value: "all", label: "All" },
          { value: "user", label: "User" },
          { value: "admin", label: "Admin" },
        ]}
      />

      <SortBy
        options={[
          { value: "createdAt-desc", label: "Sort by date (recent first)" },
          { value: "createdAt-asc", label: "Sort by date (earlier first)" },
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default AdminTableOperations;
