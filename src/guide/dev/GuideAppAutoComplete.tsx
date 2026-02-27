import AppAutoComplete from '@/components/common/AppAutoComplete';
import Config from '@/config/Config';

const basicOptions = [
  { value: 'user1', label: '안용성1' },
  { value: 'user2', label: '안용성2' },
  { value: 'user3', label: '안용성3' },
  { value: 'user4', label: '안용성4' },
  { value: 'user5', label: '안용성5' },
  { value: 'user6', label: '안용성6' },
  { value: 'user7', label: '안용성7' },
  { value: 'user8', label: '안용성8' },
  { value: 'user9', label: '안용성9' },
  { value: 'user10', label: '안용성10' },
];

function GuideAppAutoComplete() {
  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              AppAutoComplete :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/GuideAppAutoComplete.tsx`}
              >
                GuideAppAutoComplete
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppAutoComplete
              id="test"
              value={[]}
              options={basicOptions}
              isMultiple={true}
              filterOption={() => true}
              isValueString
              isClearable
              required
            />
            <hr className="line"></hr>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideAppAutoComplete;
