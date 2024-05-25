import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ name, email, password, passwordConfirm }) =>
      signUpApi({ name, email, password, passwordConfirm }),

    onSuccess: () => {
      //   queryClient.setQueriesData(["user"], user);
      toast.success(
        "Account created successfully, Please login with your credentials",
        { duration: 5000 },
      );
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { signUp, isLoading };
}
