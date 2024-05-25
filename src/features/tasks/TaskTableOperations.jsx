import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function TaskTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterdField="status"
        options={[
          { value: "all", label: "All" },
          { value: "to-do", label: "To do" },
          { value: "in-progress", label: "In progress" },
          { value: "on-hold", label: "On hold" },
          { value: "completed", label: "Completed" },
        ]}
      />

      <SortBy
        options={[
          { value: "createdAt-desc", label: "Sort by date (recent first)" },
          { value: "createdAt-asc", label: "Sort by date (earlier first)" },
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "priority-asc", label: "Sort by priority (low first)" },
          { value: "priority-desc", label: "Sort by priority (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default TaskTableOperations;
