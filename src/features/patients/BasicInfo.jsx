import DataItem from '../../ui/DataItem';
import DataShowingLayout from '../../ui/DataShowingLayout';
import Error from '../../ui/Error';

function BasicInfo({ basicInfo }) {
  const {
    name,
    maritalStatus,
    smoking,
    bloodType,
    familyHistory,
    alcohol,
    drugAllergy,
    foodAllergy,
  } = basicInfo;

  return (
    <>
      {Object.keys(basicInfo).length == 0 && (
        <div className="flex justify-center">
          <Error>No Data To Show</Error>
        </div>
      )}
      {Object.keys(basicInfo).length > 0 && (
        <DataShowingLayout heading={`Basic Information`}>
          <DataItem label="Name" value={name} />
          <DataItem label="Marital Status" value={maritalStatus} />
          <DataItem label="Smoking" value={smoking} />
          <DataItem label="Blood Type" value={bloodType} />
          <DataItem label="Family History" value={familyHistory} />
          <DataItem label="Alcohol" value={alcohol} />
          <DataItem
            label="Drug Allergy"
            value={drugAllergy ? drugAllergy : '-'}
          />
          <DataItem
            label="Food Allergy"
            value={foodAllergy ? foodAllergy : '-'}
          />
        </DataShowingLayout>
      )}
    </>
  );
}

export default BasicInfo;
