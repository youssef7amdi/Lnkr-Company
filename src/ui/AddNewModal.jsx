import Button from './Button';
import Modal from './Modal';

function AddNewModal({ modalLabel, buttonLabel, children }) {
  return (
    <Modal>
      <Modal.Open opens={`${modalLabel}`}>
        <Button type="button" sort="primary">
          {buttonLabel}
        </Button>
      </Modal.Open>

      <Modal.Window
        name={`${modalLabel}`}
        minWidth="min-w-[90rem]"
        height="h-5/6"
        overflow="overflow-auto"
      >
        {children}
      </Modal.Window>
    </Modal>
  );
}

export default AddNewModal;
