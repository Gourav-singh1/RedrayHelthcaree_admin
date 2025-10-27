import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../redux/actions/ProductsAction";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PrimaryButton from "../shared/Button/PrimaryButton";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import SparePartsForm from "../components/SparePartsForm";
import { deleteSpareParts, getSpareparts } from "../redux/actions/SparepartsAction";

function SpareParts() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const sparepart = useSelector((state) => state.sparepart.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpareparts());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setVisible(true);
  };

  const handleDelete = (event, rowData) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to delete this product?",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => {
        dispatch(deleteSpareParts(rowData._id, setLoading));
      },
      reject: () => {},
    });
  };

  const addHandle = () => {
    setEditData(null);
    setVisible(true);
  };

  return (
    <>
      <section>
        <div className="container py-4">
          <div className="flex align-items-center justify-content-between pb-3">
            <h2 className="text-3xl font-semibold">Spare Parts</h2>
            <PrimaryButton onClick={addHandle} label="Add Spare Parts" />
          </div>
          <div className="card shadow-2 p-4">
            <DataTable value={sparepart} tableStyle={{ minWidth: "50rem" }}>
              {/* <Column field="_id" header="ID" className="py-3" /> */}
              <Column field="name" header="Name" className="py-3" />
              <Column
                header="Image"
                body={(rowData) => (
                  <img
                    src={rowData.image}
                    alt={rowData.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "20px",
                      objectFit: "cover",
                      padding: "10px",
                    }}
                  />
                )}
              />
              <Column
                header="Actions"
                body={(rowData) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(rowData)}
                      className="p-button p-button-sm p-button-info py-2 px-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, rowData)}
                      className="p-button p-button-sm p-button-danger py-2 px-3"
                    >
                      Delete
                    </button>
                  </div>
                )}
              />
            </DataTable>
          </div>
        </div>
        <SparePartsForm
          visible={visible}
          setVisible={setVisible}
          editData={editData}
          setEditData={setEditData}
        />
        <ConfirmPopup className="custom-confirm-popup" />
      </section>
    </>
  );
}

export default SpareParts;
