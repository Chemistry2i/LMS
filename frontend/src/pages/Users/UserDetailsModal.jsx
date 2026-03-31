import React from 'react';
import BaseModal from '../../components/Modals/BaseModal';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="User Details" size="md">
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Username:</span> {user.username}
        </div>
        <div>
          <span className="font-semibold">First Name:</span> {user.first_name}
        </div>
        <div>
          <span className="font-semibold">Last Name:</span> {user.last_name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {user.role}
        </div>
        <div>
          <span className="font-semibold">Joined:</span> {user.created_at ? user.created_at.split('T')[0] : ''}
        </div>
      </div>
    </BaseModal>
  );
};

export default UserDetailsModal;
