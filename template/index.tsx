import { useEffect, useState } from 'react';
import { Table, Dropdown, List, Button, Card } from 'tea-component';
import DelModal from '@/components/modals/DelModal';
import AddOrEditModal from './components/AddOrEditModal';
import './index.scss';
import { onCloseModalComp, onShowModalComp } from '@/common/util';
import intl from '@/common/intl';
import Pagination from '@/components/baseUI/Pagination';
import { autotip } from 'tea-component/lib/table/addons';
import { pageObjFace } from '@/api/common/type';

const Index = (props) => {
  /** 页面数据 */
  const [rows, setRows] = useState<IDataRow[]>([]);
  const [loading, setLoading] = useState(true);

  /** 显隐标识 addOrEditModal */
  const [addOrEditVisible, setAddOrEditVisible] = useState(false);

  /** 显隐标识 DelModal */
  const [delVisible, setDelVisible] = useState(false);

  /** 记录当前点击数据 */
  const [current, setCurrent] = useState<any>(null);

  // 分隔页参数
  const [pageObjData, setPageObjData] = useState<pageObjFace>({
    recordCount: 0,
    pageSize: 10,
    pageIndex: 1,
  });

  const fetchList = async ({ pageIndex = 1, pageSize = 10 } = {}) => {
    setLoading(true);
    setRows([]);
    const { data } = await getList({ page: pageIndex, pageSize });
    setRows(data.rows);
    setLoading(false);
    setPageObjData({ recordCount: data.total, pageIndex, pageSize });
  };

  const fetchDel = () => del({ id: current.id }).then(() => fetchList());

  const fetchEdit = (values) => edit({ ...values }).then(() => fetchList());

  const fetchAdd = (values) => add({ ...values }).then(() => fetchList());

  useEffect(() => {
    fetchList();
  }, []);

  /**
   * 表头数据
   */

  // 表单渲染
  const renderTable = () => (
    <Card>
      <Table
        verticalTop={false}
        records={rows}
        // @ts-ignore
        columns={columns}
        addons={[
          autotip({
            isLoading: loading,
          }),
        ]}
      />
      <Pagination
        recordCount={pageObjData.recordCount}
        onPagingChange={(query) => fetchList(query)}
        pageSize={pageObjData.pageSize}
        pageIndex={pageObjData.pageIndex}
        rightBarVisible={true}
        pageSizeVisible={true}
      />
    </Card>
  );

  // 新增或修改弹窗
  const renderAddOrEditModal = () => (
    <AddOrEditModal
      onConfirm={current ? fetchEdit : fetchAdd}
      visible={addOrEditVisible}
      onClose={() => onCloseModalComp(setAddOrEditVisible, setCurrent)}
      info={current ? current : null}
      title={current ? intl('EDIT') : intl('NEW_ITEM')}
    />
  );

  // 删除弹窗
  const renderDelModal = () => (
    <DelModal
      visible={delVisible}
      onConfirm={fetchDel}
      onClose={() => onCloseModalComp(setDelVisible, setCurrent)}
    />
  );

  return (
    <div>
      {renderTable()}
      {delVisible && renderDelModal()}
      {addOrEditVisible && renderAddOrEditModal()}
    </div>
  );
};

export default Index;
