'use client';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { User } from 'next-auth';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import Menu from '@/components/Menu';
import RentModal from '../modals/RentModal';
import Modal from '../modals/Modal';
import AuthModal from '../modals/AuthModal';
import { menuItems } from '@/utils/constants';

interface UserMenuProps {
  user?: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();

  const redirect = (url: string) => {
    router.push(url);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <Modal>
          {/* <Modal.Trigger name={user ? 'share' : 'Login'}>
            <button
              type="button"
              className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-bold text-[#585858] transition hover:bg-neutral-100 md:block"
            >
              Share your home
            </button>
          </Modal.Trigger> */}
          <Menu>
            <Menu.Toggle id="user-menu">
              <button
                type="button"
                className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition duration-300 hover:shadow-md md:px-2 md:py-1"
              >
                <AiOutlineMenu />
                <div className="hidden md:block">
                  <Avatar src={user?.image} />
                </div>
              </button>
            </Menu.Toggle>
            <Menu.List className="rounded-xl bg-white text-sm shadow-[0_0_36px_4px_rgba(0,0,0,0.075)]">
              {user ? (
                <>
                  {menuItems.map((item) => (
                    <MenuItem
                      label={item.label}
                      onClick={() => redirect(item.path)}
                      key={item.label}
                    />
                  ))}

                  <Modal.Trigger name="share">
                    <MenuItem label="Share your home" />
                  </Modal.Trigger>
                  <hr />
                  <MenuItem label="Log out" onClick={signOut} />
                </>
              ) : (
                <>
                  <Modal.Trigger name="Login">
                    <MenuItem label="Log in" />
                  </Modal.Trigger>

                  <Modal.Trigger name="Sign up">
                    <MenuItem label="Sign up" />
                  </Modal.Trigger>
                </>
              )}
            </Menu.List>
          </Menu>
          <Modal.Window name="Login">
            <AuthModal name="Login" />
          </Modal.Window>
          <Modal.Window name="Sign up">
            <AuthModal name="Sign up" />
          </Modal.Window>
          <Modal.Window name="share">
            <RentModal />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
};

export default UserMenu;
