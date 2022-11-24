import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Button } from 'reactstrap';
import useUserStore from '../store/useUserStore';
import ModalAdd from './ModalAdd';
import ModalUpdate from './ModalUpdate';

const Table = () => {
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const removeUser = useUserStore((state) => state.removeUser);
  const [userId, setUserId] = useState(3);

  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    fetchUsers();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: TableColumn<any>[] = [
    {
      name: 'ID',
      selector: (row) => row.id,
      maxWidth: '50px',
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Address',
      selector: (row) => (
        <>
          {' '}
          {row.address.street}, {row.address.city}{' '}
        </>
      ),
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: <ModalAdd />,
      cell: (row) => (
        <Button
          color="danger"
          size="sm"
          block
          style={{ maxWidth: 100 }}
          onClick={() => {
            removeUser(row.id);
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      <ModalUpdate toggleModal={toggleModal} userId={userId} />
      <DataTable
        title="Users Data"
        columns={columns}
        data={users}
        pagination
        onRowDoubleClicked={(row) => {
          setUserId(row.id);
          setToggleModal(!toggleModal);
        }}
        highlightOnHover
      />
    </div>
  );
};

export default Table;
