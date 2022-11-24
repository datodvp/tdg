import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  users: Array<{
    id: number;
    name: string;
    gender: string;
    email: string;
    address: {
      street: string;
      city: string;
    };
    phone: string;
  }>;
  loading: boolean;
  fetchUsers: VoidFunction;
  removeUser: (userId: number) => void;
  addUser: (
    name: string,
    gender: string,
    email: string,
    street: string,
    city: string,
    phone: string
  ) => void;
  updateUser: (
    userId: number,
    name: string,
    gender: string,
    email: string,
    street: string,
    city: string,
    phone: string
  ) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        users: [],
        loading: true,
        fetchUsers: async () => {
          const response = await fetch('http://localhost:5000/users');
          const usersData = await response.json();
          set({ users: usersData });
        },
        removeUser: (userId: number) => {
          set((state) => ({
            users: state.users.filter((user) => user.id !== userId),
          }));
        },
        addUser: (name, gender, email, street, city, phone) => {
          const newUser = {
            id: Math.floor(Math.random() * 1000 + 200),
            name: name,
            gender: gender,
            email: email,
            address: {
              street: street,
              city: city,
            },
            phone: phone,
          };
          set((state) => ({
            users: [...state.users, { ...newUser }],
          }));
        },
        updateUser: (userId, name, gender, email, street, city, phone) => {
          set((state) => ({
            users: state.users.map((u) =>
              u.id !== userId
                ? u
                : {
                    id: userId,
                    name: name,
                    gender: gender,
                    email: email,
                    address: {
                      street: street,
                      city: city,
                    },
                    phone: phone,
                  }
            ),
          }));
        },
      }),
      {
        name: 'user-storage',
      }
    )
  )
);

export default useUserStore;
