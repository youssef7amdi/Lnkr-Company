import { useParams, useSearchParams } from 'react-router-dom';
import { patientRecords } from '../../data/data';
import DataShowingLayout from '../../ui/DataShowingLayout';
import DataItem from '../../ui/DataItem';
import Table, { TableContext } from '../../ui/Table';
import { useContext } from 'react';

function Prescription() {
  const [searchParams] = useSearchParams();
  const { id: patientId } = useParams();
  const dataId = searchParams.get('id');
  const {
    id: prescriptionId,
    dateAndTime,
    prescribedDrugs,
    diagnosis,
    generalComment,
  } = patientRecords
    .find((record) => patientId == record.id)
    .prescriptions.find((prescription) => dataId == prescription.id);

  const { generalDiagnosis, detailedDiagnosis, generalCondition } = diagnosis;

  return (
    <DataShowingLayout
      heading={`Prescription #${dataId} of Patient #${patientId}`}
      highlightLabel={generalComment ? 'General Comment' : null}
      highlightValue={generalComment}
    >
      <h3 className="basis-full text-[1.8rem] font-bold text-black">
        Time & ID:
      </h3>
      <DataItem label="Date & Time" value={dateAndTime} />
      <DataItem label="Id" value={prescriptionId} />

      <h3 className="mt-5 basis-full text-[1.8rem] font-bold text-black">
        Diagnosis:
      </h3>
      <DataItem label="General Diagnosis" value={generalDiagnosis} />
      <DataItem label="Detailed Diagnosis" value={detailedDiagnosis} />
      <DataItem label="General Condition" value={generalCondition} />

      <h3 className=" mt-5 basis-full text-[1.8rem] font-bold text-black">
        Prescribed Drugs:
      </h3>
      <div className="flex grow justify-center">
        <div className="basis-4/6">
          <Table columns="grid-cols-[1fr_1fr]">
            <Table.Header>
              <div className="text-center">Drug Info</div>
              <div className="text-center">Quantity</div>
            </Table.Header>

            <Table.Body
              data={prescribedDrugs}
              render={(drug) => <DrugRow key={drug.name} drug={drug} />}
            />
          </Table>
        </div>
      </div>
    </DataShowingLayout>
  );
}

export default Prescription;

function DrugRow({ drug }) {
  const { columns, rowGrid } = useContext(TableContext);
  const { name: tradeName, activeIngredient, directions, quantity } = drug;

  return (
    <Table.Row>
      <div
        role="row"
        className={`${rowGrid} ${columns} px-[2.4rem] py-[1.2rem] text-center `}
      >
        <div className="flex flex-col gap-[0.5rem] font-[sono] text-[1.4rem] font-[500] text-gray-600">
          <span className="text-[1.6rem] font-[600]">{tradeName}</span>
          <span className="text-[1rem] text-gray-600">{activeIngredient}</span>
          <span className="text-[1.1rem]">{directions}</span>
        </div>
        <div className="font-[sono] text-[1.4rem] font-[500] text-gray-700">
          {quantity}
        </div>
      </div>
    </Table.Row>
  );
}
