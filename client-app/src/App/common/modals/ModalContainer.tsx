import { Modal } from "semantic-ui-react"
import { UseStore } from "../../store/store"
import { observer } from "mobx-react-lite"


const ModalContainer = () => {
const {modalStore}=UseStore()
  return (
    <Modal open={modalStore.modal.open} size="large" onClose={modalStore.closeModal}>
        <Modal.Content>
            {modalStore.modal.body}
        </Modal.Content>
    </Modal>
  )
}

export default observer(ModalContainer)