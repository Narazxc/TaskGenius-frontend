import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateNotification as updateNotificationApi } from "../../services/apiNotifications";

export function useUpdateNotification() {
  const queryClient = useQueryClient();
  const { mutate: updateNotification, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newNotificationData, id }) =>
      updateNotificationApi(newNotificationData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateNotification };
}
