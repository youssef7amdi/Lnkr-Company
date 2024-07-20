import Select from 'react-select';

function SelectPhoneCode({ options, searchOption, setSearchOption }) {
  return (
    <Select
      className="w-[13rem]"
      defaultValue={searchOption}
      onChange={setSearchOption}
      options={options}
      formatGroupLabel={formatGroupLabel}
      isSearchable={false}
    />
  );
}

export default SelectPhoneCode;

var formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);
var groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 9,
};
var groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 10,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};
