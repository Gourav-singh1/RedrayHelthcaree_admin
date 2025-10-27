import { Dialog } from "primereact/dialog";
import React from "react";
import CategoryForm from "./CategoryForm";

function DialogForm({ visible, setVisible ,editData }) {
  return (
    <>
      <div className="card flex justify-content-center bg_lightDark">
        <Dialog
          className=""
          draggable={false}
          closable={false}
          visible={visible}
          modal
          // style={{ width: "50rem" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <CategoryForm setVisible={setVisible} editData={editData} />
        </Dialog>
      </div>
    </>
  );
}

export default DialogForm;
