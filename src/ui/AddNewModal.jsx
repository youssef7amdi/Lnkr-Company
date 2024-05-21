import { useParams } from 'react-router-dom';
import Button from './Button';
import Modal from './Modal';

function AddNewModal({ buttonLabel, children }) {
  const { dataToShow } = useParams();

  return (
    <Modal>
      <Modal.Open opens={`${dataToShow}`}>
        <Button type="button" sort="primary">
          {buttonLabel}
        </Button>
      </Modal.Open>

      <Modal.Window
        name={`${dataToShow}`}
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
