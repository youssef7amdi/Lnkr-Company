import { BiLoaderAlt } from 'react-icons/bi';

function SpinnerMini() {
  return (
    <div className="flex w-full items-center justify-center">
      <BiLoaderAlt className="h-[2.4rem] w-[2.4rem] animate-spin " />
    </div>
  );
}

export default SpinnerMini;
