import React, { useState } from 'react';
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

const ModalAdd = () => {
  const addUser = useUserStore((state) => state.addUser);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    gender: '',
    email: '',
    street: '',
    city: '',
    phone: '',
  });

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
      const { name, gender, email, street, city, phone } = userData;
      addUser(name, gender, email, street, city, phone);
      toggle();
    } else {
      console.log('FORM IS NOT VALID');
    }
  };

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ width: 100 }}>
        Add User
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        // className={this.props.className}
      >
        <ModalHeader toggle={toggle}>Add User</ModalHeader>
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
              value={userData.street}
              onChange={(e) =>
                setUserData({ ...userData, street: e.target.value })
              }
            />

            <Label for="city">city:</Label>
            <Input
              id="city"
              className="mb-3"
              required
              value={userData.city}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
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
              Add User
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

export default ModalAdd;
