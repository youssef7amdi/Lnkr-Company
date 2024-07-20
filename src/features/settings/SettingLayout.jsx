import { useSearchParams } from 'react-router-dom';
import SortBy from '../../ui/SortBy';
import { useEffect, useState } from 'react';
import PhysicianSettings from './PhysicianSettings';
import ClinicSettings from './ClinicSettings';
import ManageCards from './ManageCards';
import FilterWithQueries from '../../ui/FilterWithQueries';

const settingCategories = [
  {
    label: 'Physician Settings',
    value: 'physician',
    categoryItems: [
      { label: 'User', value: 'user' },
      { label: 'Profile', value: 'profile' },
      { label: 'Professional', value: 'professional' },
      { label: 'Shift', value: 'shift' },
      { label: 'Service', value: 'service' },
      { label: 'Syndicate', value: 'Syndicate' },
    ],
  },
  {
    label: 'Clinic Settings',
    value: 'clinic',
    categoryItems: [
      { label: 'Basic Info', value: 'basicInfo' },
      { label: 'Address', value: 'address' },
      { label: 'Legal', value: 'legal' },
      { label: 'media', value: 'media' },
    ],
  },
  { label: 'Manage Cards', value: 'manageCards', categoryItems: [] },
];

function SettingLayout() {
  const [filterOptions, setFilterOptions] = useState();
  const [searchParams] = useSearchParams();
  const settingCategory = searchParams.get('category') || 'physician';

  useEffect(
    function () {
      if (settingCategory) {
        const newFilterOptions = settingCategories.find(
          function getFilterOptions(category) {
            return category.value === settingCategory;
          },
        )?.categoryItems;
        setFilterOptions(newFilterOptions);
      }
    },
    [settingCategory],
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[3rem] font-semibold">{settingCategory}</h1>
        <div className="flex items-center gap-[1.6rem]">
          <FilterWithQueries options={filterOptions} filterField="item" />
          <SortBy options={settingCategories} sortField="category" />
        </div>
      </div>
      <main>
        {settingCategory && settingCategory == 'physician' && (
          <PhysicianSettings />
        )}
        {settingCategory && settingCategory == 'clinic' && <ClinicSettings />}
        {settingCategory && settingCategory == 'manageCards' && <ManageCards />}
      </main>
    </>
  );
}

export default SettingLayout;
