import { Button } from "~/components/ui/button";
import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";
import { CloseButton } from "~/components/close-modal-button";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return (
    <Modal>
      <FullPageImageView id={idAsNumber} children={<CloseButton />} />
    </Modal>
  );
}
