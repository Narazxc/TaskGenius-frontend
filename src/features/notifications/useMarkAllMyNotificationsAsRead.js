import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { markAllMyNotificationsAsRead } from "../../services/apiNotifications";

export function useMarkAllMyNotificationsAsRead() {
  const queryClient = useQueryClient();
  const { mutate: markAllNotifyAsRead, isLoading: isUpdating } = useMutation({
    mutationFn: markAllMyNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });

      toast.success("All notifications are marked as read");
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, markAllNotifyAsRead };
}
