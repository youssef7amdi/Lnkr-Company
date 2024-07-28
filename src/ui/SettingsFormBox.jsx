import Button from './Button';

function SettingsFormBox({
  onSubmit,
  onClose,
  isEditable,
  setIsEditable,
  children,
}) {
  return (
    <div className="flex flex-col gap-[1.6rem] px-[2.4rem] py-[1.2rem]">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-[1.6rem] px-[2.4rem] py-[1.2rem]"
      >
        {children}
        <div className="mr-4 space-x-4 pt-4 text-right">
          {isEditable && (
            <>
              <Button
                type="button"
                onClick={() => {
                  onClose();
                  setIsEditable(false);
                }}
                sort="secondary"
              >
                Close
              </Button>
              <Button type="submit" sort="primary">
                Save
              </Button>
            </>
          )}
          {!isEditable && (
            <Button
              type="button"
              sort="primary"
              onClick={() => setIsEditable(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SettingsFormBox;
