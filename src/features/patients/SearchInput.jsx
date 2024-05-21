import Button from '../../ui/Button';

function SearchInput({ patientPhone, setPatientPhone, onClick }) {
  return (
    <section className="mt-[3rem] flex w-[550px] justify-center gap-[0.6rem]">
      <input
        type="text"
        className="grow rounded-[7px] border border-gray-400 px-[1.2rem] py-[0.8rem] text-[1.6rem] focus:outline-brand-500"
        placeholder="Patient Phone No.."
        autoComplete="tel"
        value={patientPhone}
        onChange={(e) => setPatientPhone(e.target.value)}
      />
      <Button type="button" sort="primary" onClick={onClick}>
        Search
      </Button>
    </section>
  );
}

export default SearchInput;
