import { Button, Modal } from "@libs/share-ui";
import { bind } from "@libs/util-structure";
import { useLoginModal } from "./useLoginModal";

export const LoginModal = bind(useLoginModal, ({ onClose, opened, signIn }) => (
  <Modal title="Sign up and Save your record" opened={opened} onClose={onClose}>
    <Button color="primary" fill onClick={signIn}>
      Sign in with google
    </Button>
  </Modal>
));
