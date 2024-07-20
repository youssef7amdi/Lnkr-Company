import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getLocalStorage,
  setLocalStorage,
} from '../../utils/localStorageUtils';

import { useCookiesAccess } from '../../contexts/CookiesAccessProvider';
import { useChooseClinic } from './services/useChooseClinic';

import ClinicCheckbox from './ClinicCheckbox';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';

function ChooseClinicForm() {
  const { removeCookie } = useCookiesAccess();
  const navigate = useNavigate();
  const { chooseClinic, chooseClinicStatus } = useChooseClinic();
  const isChoosingClinic = chooseClinicStatus === 'pending';

  const dentistData = getLocalStorage('dentist');
  const clinicArray = dentistData?.clinic;
  const [chosenClinic, setChosenClinic] = useState(clinicArray?.at(0));

  useEffect(
    function () {
      if (!dentistData) {
        removeCookie('access_token');

        navigate('/login', { replace: true });
      }
    },
    [dentistData, removeCookie, navigate],
  );

  function onChooseClinic() {
    const clinicObject = { clinic: chosenClinic };
    chooseClinic(clinicObject, {
      onSuccess: () => {
        setLocalStorage('clinic', clinicObject);
      },
    });
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-gray-100 bg-white px-[4rem] py-[2.4rem] text-[1.4rem]">
      <div className="flex justify-center gap-x-[1.4rem] py-[1.2rem]">
        {clinicArray &&
          clinicArray.map((clinic) => (
            <ClinicCheckbox
              clinic={clinic}
              active={clinic === chosenClinic}
              disabled={isChoosingClinic || clinic === chosenClinic}
              key={clinic}
              onClick={() => setChosenClinic(clinic)}
            />
          ))}
      </div>

      <div className="flex flex-col py-[1.2rem]">
        <Button
          sort="registration"
          onClick={onChooseClinic}
          disabled={isChoosingClinic}
        >
          {!isChoosingClinic ? 'Choose' : <SpinnerMini />}
        </Button>
      </div>
    </div>
  );
}

export default ChooseClinicForm;
