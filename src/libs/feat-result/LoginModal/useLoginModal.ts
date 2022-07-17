import { useAuthContext } from "@libs/provider-auth/AuthContext";

type UseLoginModalProps = {
  onClose(): void;
  opened: boolean;
};

export function useLoginModal({ opened, onClose }: UseLoginModalProps) {
  const { login } = useAuthContext();
  const signIn = () => {
    login({ onCompleted: onClose });
  };
  return { opened, onClose, signIn };
}
