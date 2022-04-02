import { Modal, Form } from 'tea-component';
import { useForm } from 'react-hook-form';
import Buttons from '@/components/baseUI/Buttons';
import Controller from '@/components/form/Controller';
import Comp from '@/components/form';
import { formData } from '../constance';

interface indexProp {
  onConfirm: (params) => void;
  visible: boolean;
  onClose: () => void;
  info?: any;
  title: string;
}

const IndexModal = (props: indexProp) => {
  const { onConfirm, visible, onClose, info, title } = props;

  const { control, handleSubmit, formState } = useForm({ mode: 'all' });

  // 提交事件
  const onSubmit = (values) => {
    onConfirm({ ...values });
    onClose();
  };

  // 获取表单字段状态
  const getStatus = (meta) => {
    if (!meta?.isDirty && !formState.isSubmitted) {
      return undefined;
    }
    return meta.invalid ? 'error' : 'success';
  };

  const renderformData = () => Object.keys(formData).map((item) => (
    <Controller
      control={control}
      formState={formState}
      getStatus={getStatus}
      defaultValue={info ? info[item] : ''}
      key={item}
      name={item}
      validate={formData[item].validate}
      labelValue={item}
      renderComp={(value, onChange) => (
        <Comp
          value={value}
          onChange={onChange}
          placeholder={item}
          type={formData[item].type}
          options={formData[item].options}
          disabled={formData[item].disabled}
        />
      )}
    />
  ));

  return (
    <Modal visible={visible} caption={title} onClose={onClose}>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form>{renderformData()}</Form>
          <Form.Action>
            <Buttons onCancel={onClose} loading={formState.isSubmitting} />
          </Form.Action>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default IndexModal;
