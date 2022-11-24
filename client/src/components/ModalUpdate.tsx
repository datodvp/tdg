import React, { useEffect, useState } from 'react';
import useUserStore from '../store/useUserStore';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';

// import { Select } from '../Styles/Styles';

const ModalUpdate = ({
  toggleModal,
  userId,
}: {
  toggleModal: boolean;
  userId: number;
}) => {
  const users = useUserStore((state) => state.users);
  const updateUser = useUserStore((state) => state.updateUser);
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  const [userData, setUserData] = useState({
    id: 0,
    name: '',
    gender: '',
    email: '',
    address: {
      street: '',
      city: '',
    },
    phone: '',
  });

  const userInputs = () => {
    const userToUpdate = users.find((u) => u.id === userId);
    setUserData({
      id: userId,
      name: userToUpdate?.name || '',
      gender: userToUpdate?.gender || '',
      email: userToUpdate?.email || '',
      address: {
        street: userToUpdate?.address.street || '',
        city: userToUpdate?.address.city || '',
      },
      phone: userToUpdate?.phone || '',
    });
  };

  useEffect(() => {
    userInputs();
    toggle();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleModal]);
  const checkFormValidity = () => {
    const requiredFields = document.querySelector('form') as HTMLFormElement;
    const fields = requiredFields.querySelectorAll('[required]');
    let isValid = true;

    fields.forEach((field) => {
      if (!(field as HTMLInputElement).checkValidity()) {
        isValid = false;
      }
    });

    return isValid;
  };

  const saveUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // e.preventDefault();
    if (checkFormValidity()) {
      e.preventDefault();
      const { name, gender, email, address, phone } = userData;
      updateUser(
        userId,
        name,
        gender,
        email,
        address.street,
        address.city,
        phone
      );
      toggle();
    } else {
      console.log('FORM IS NOT VALID');
    }
  };

  return (
    <div>
      {/* <Button color="primary" onClick={toggle} style={{ width: 100 }}>
        Add User
      </Button> */}
      <Modal
        isOpen={modal}
        toggle={toggle}
        // className={this.props.className}
      >
        <ModalHeader toggle={toggle}>Update User</ModalHeader>
        <form>
          <ModalBody style={{ gap: 30 }}>
            <Label for="name">Name:</Label>
            <Input
              id="name"
              className="mb-3"
              required
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />

            <Label for="gender">Gender:</Label>
            <Input
              id="gender"
              required
              type="select"
              className="mb-3"
              value={userData.gender}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
            >
              <option value="" disabled>
                choose gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
            </Input>

            <Label for="email">Email:</Label>
            <Input
              id="email"
              type="email"
              required
              className="mb-3"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <Label for="street">street:</Label>
            <Input
              id="street"
              required
              value={userData.address.street}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address, street: e.target.value },
                })
              }
            />

            <Label for="city">city:</Label>
            <Input
              id="city"
              className="mb-3"
              required
              value={userData.address.city}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...userData.address, city: e.target.value },
                })
              }
            />

            <Label for="phone">Phone:</Label>
            <Input
              id="phone"
              type="tel"
              className="mb-3"
              required
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              onClick={(e) => {
                saveUser(e);
              }}
            >
              Save Update
            </Button>{' '}
            <Button
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                toggle();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUpdate;
