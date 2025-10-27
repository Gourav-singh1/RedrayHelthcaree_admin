import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  getSpareparts,
} from "../redux/actions/SparepartsAction";
import { getStats } from "../redux/actions/StatsAction";
import StateForm from "../components/stateForm";

function StatePage() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const stats = useSelector((state) => state.stats.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpareparts());
    dispatch(getStats());
  }, [dispatch]);

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setVisible(true);
  };

  const addHandle = () => {
    setEditData(null);
    setVisible(true);
  };

  console.log(stats);
  return (
    <>
      <section>
        <div className="container py-4">
          <div className="flex align-items-center justify-content-between pb-3">
            <h2 className="text-3xl font-semibold">State</h2>
            {/* <PrimaryButton onClick={addHandle} label="Add Spare Parts" /> */}
          </div>
          <div className="card shadow-2 p-4">
            <DataTable value={[stats]} tableStyle={{ minWidth: "50rem" }}>
              {/* <Column field="_id" header="ID" className="py-3" /> */}
              <Column
                field="totalInstallations"
                header="totalInstallations"
                className="py-3"
              />
              <Column
                field="happyCustomers"
                header="Happy Customers"
                className="py-3"
              />
              <Column
                field="citiesCovered"
                header="Cities Covered"
                className="py-3"
              />
              <Column
                field="countriesCovered"
                header="Countries Covered"
                className="py-3"
              />
              <Column
                header="Actions"
                body={(rowData) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(rowData)}
                      className="p-button p-button-sm p-button-info py-2 px-3"
                    >
                      Update
                    </button>
                  </div>
                )}
              />
            </DataTable>
          </div>
        </div>
        <StateForm
          visible={visible}
          setVisible={setVisible}
          editData={editData}
          setEditData={setEditData}
        />
      </section>
    </>
  );
}

export default StatePage;
