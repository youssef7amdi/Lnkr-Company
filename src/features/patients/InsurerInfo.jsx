import DataShowingLayout from '../../ui/DataShowingLayout';
import Error from '../../ui/Error';

function InsurerInfo({ insurerInfo }) {
  if (Object.keys(insurerInfo).length == 0)
    return (
      <div className="flex justify-center">
        <Error>No Data To Show</Error>
      </div>
    );

  return (
    <DataShowingLayout heading={`Insurer Information`}>
      insurer
    </DataShowingLayout>
  );
}

export default InsurerInfo;
