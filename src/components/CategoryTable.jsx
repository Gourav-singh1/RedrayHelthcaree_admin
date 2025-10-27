import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategory } from "../redux/actions/CategoryAction";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CategoryForm from "./CategoryForm";
import PrimaryButton from "../shared/Button/PrimaryButton";

function CategoryTable() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.data);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const [editData, setEditData] = useState();

  const handleEdit = (rowData) => {
    setVisible(true);
    console.log(rowData);
    setEditData(rowData);
  };
  const handleDelete = (rowData) => {
    const id = rowData._id;
    console.log(id);
    dispatch(deleteCategory(id));
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
            <h2 className="text-3xl font-semibold ">Category</h2>
            <PrimaryButton onClick={() => addHandle()} label="Add Category" />
          </div>
          <div className="card shadow-2 p-4">
            <DataTable value={category} tableStyle={{ minWidth: "50rem" }}>
              {/* <Column field="_id" header="I'd" className="py-3"></Column> */}
              <Column field="name" header="Category" className="py-3"></Column>
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
                      onClick={() => handleDelete(rowData)}
                      className="p-button p-button-sm p-button-danger py-2 px-3"
                    >
                      Delete
                    </button>
                  </div>
                )}
              />
            </DataTable>
            <CategoryForm
              setVisible={setVisible}
              visible={visible}
              editData={editData}
              setEditData={setEditData}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default CategoryTable;
