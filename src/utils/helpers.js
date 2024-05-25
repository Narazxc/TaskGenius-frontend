import { format, formatDistance, parseISO } from "date-fns";

export const countTasksByStatus = (tasks, status) => {
  if (!status) return tasks.length;

  const todoTasks = tasks.filter((task) => task.status === status);
  const todoCount = todoTasks.length;
  return todoCount;
};

export const countTasksByPriority = (tasks, priority) => {
  if (!priority) return tasks.length;

  const todoTasks = tasks.filter((task) => task.priority === priority);
  const todoCount = todoTasks.length;
  return todoCount;
};

// Helper function to check if an object is empty
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function getFormattedDate(date) {
  let formattedDate;
  const initialDate = date;
  formattedDate = new Date(initialDate).toISOString().split("T")[0]; // Converts to YYYY-MM-DD format
  return formattedDate;
}
//

export function getFormattedDateTime(date) {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "yyyy-MM-dd HH:mm:ss"); // Specify your desired format
  return formattedDate; // Output: 2024-04-30 16:00:00
}

// from now to deaDate
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");
// .replace("in", "In");
