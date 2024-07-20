import Select from 'react-select';

import { useGetServices } from './services/useGetServices';

function ChooseService({ onChange, chooseServiceLoading }) {
  const { data, servicesLoading } = useGetServices();
  const options = data.map((service) => {
    return { value: service, label: service };
  });

  return (
    <div className="mt-5 flex w-full items-center justify-center gap-[2.4rem] rounded-lg bg-green-100 py-[2.4rem] text-green-700 ">
      <h3 className="font-semibold">Choose Service:</h3>
      <Select
        isLoading={servicesLoading || chooseServiceLoading}
        isDisabled={chooseServiceLoading}
        options={options}
        defaultValue={options.at(0)}
        className="w-[40rem] text-black"
        isSearchable={false}
        onChange={onChange}
      />
    </div>
  );
}

export default ChooseService;
