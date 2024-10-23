import { Button } from "~/components/ui/button";
import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";
import { CloseButton } from "~/components/close-modal-button";

export default async function PhotoModal(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;

  const {
    id: photoId
  } = params;

  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return (
    <Modal>
      <FullPageImageView id={idAsNumber} children={<CloseButton />} />
    </Modal>
  );
}
