import { FaUserCircle } from 'react-icons/fa';
import { FaStethoscope } from 'react-icons/fa6';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import DataShowingLayout from '../../ui/DataShowingLayout';
import DataItem from '../../ui/DataItem';

function SearchResult({ result }) {
  const { id, name, mobile, insurer, medicalNetwork, service } = result;
  const navigate = useNavigate();

  function handleAccessProfile() {
    navigate(`/patient/${id}`);
  }

  return (
    <>
      <DataShowingLayout
        headingIcon={<FaUserCircle className="h-[3.2rem] w-[3.2rem]" />}
        heading={`#${id} patient found`}
        highlightIcon={
          <FaStethoscope className="h-[2.4rem] w-[2.4rem] text-current" />
        }
        highlightLabel="Service"
        highlightValue={service}
        footer="Last visit at Tue, Feb 05 2024, 3:35 PM"
      >
        <DataItem label="Name" value={name} />
        <DataItem label="Mobile" value={mobile} />
        <DataItem label="Insurer" value={insurer} />
        <DataItem label="Medical Network" value={medicalNetwork} />
      </DataShowingLayout>

      <div className="flex h-[4rem] self-end">
        <Button type="button" sort="primary" onClick={handleAccessProfile}>
          Access Profile
        </Button>
      </div>
    </>
  );
}

export default SearchResult;
