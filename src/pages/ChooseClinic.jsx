import ChooseClinicForm from '../features/authentication/ChooseClinicForm';

import Logo from '../ui/Logo';

function ChooseClinic() {
  return (
    <div className="grid min-h-screen grid-cols-[48rem] content-center justify-center gap-[3.2rem] bg-gray-50 ">
      <Logo />
      <h1 className="text-center text-[3rem] font-[600] leading-[1.4]">
        Choose Clinic
      </h1>
      <ChooseClinicForm />
    </div>
  );
}

export default ChooseClinic;
