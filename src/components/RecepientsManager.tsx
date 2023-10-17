import { useState, useEffect } from 'react';
import { useRecipientsData } from './RecipientsDataProvider';
import Search from './Search';

interface RecipientProps {
    email: string;
    isSelected: boolean;
}

//funtion to group emails according to their organization
const groupRecipientsByOrganization = (recipients: RecipientProps[]) => {
    const groupedRecipients = {};
  
    recipients.forEach((recipient) => {
      const organizationName = recipient.email.split('@')[1];
      if (!groupedRecipients[organizationName]) {
        groupedRecipients[organizationName] = [];
      }
      groupedRecipients[organizationName].push(recipient);
    });
  
    return groupedRecipients;
};

//rendering grouped emails together
const renderGroupedRecipients = (groupedRecipients: { [key: string]: RecipientProps[] }, onSelect:any, onSelectOrganization: any) => {
    return Object.entries(groupedRecipients).map(([organizationName, recipients]) => (
        <div key={organizationName}>
        {recipients.length > 1 && (
        <div className='flex justify-between items-center'>
            <h4 className='text-lg font-medium mb-2'>{organizationName}</h4>
            <input type="checkbox" onChange={() => onSelectOrganization(organizationName)} />
        </div>
        )}
        <ul className='border border-slate-400 rounded-md'>
            {recipients.map((recipient) => (
            <li className='px-2 cursor-pointer' key={recipient.email} onClick={() => onSelect(recipient)}>
                {recipient.email}
            </li>
            ))}
        </ul>
        </div>
    ));
};

const RecipientsManager = () => {
  const [availableRecipients, setAvailableRecipients] = useState([]);
  const { recipientsData, updateRecipientsData } = useRecipientsData();

  useEffect(() => {
    setAvailableRecipients(recipientsData);
  }, [recipientsData]);

  const handleSelectRecipient = (recipient: any) => {
    const updatedRecipients = recipientsData.map((r) =>
      r.email === recipient.email ? { ...r, isSelected: !recipient.isSelected } : r
    );
    updateRecipientsData(updatedRecipients);
  };

    const handleSelectOrganization = (organizationName: string) => {
        const recipientsToSelect = availableRecipients.filter(recipient => recipient.email.includes(`@${organizationName}`));
        const updatedRecipients = recipientsData.map((recipient) =>
            recipientsToSelect.some((r) => r.email === recipient.email) ? { ...recipient, isSelected: !recipient.isSelected } : recipient
        );
        
        updateRecipientsData(updatedRecipients);
    };

  const options = availableRecipients.map((recipient) => ({
    email: recipient.email,
    isSelected: recipient.isSelected,
  }));

  const availableGroupedRecipients = groupRecipientsByOrganization(
    availableRecipients.filter((recipient) => !recipient.isSelected)
  );

  const selectedGroupedRecipients = groupRecipientsByOrganization(
    availableRecipients.filter((recipient) => recipient.isSelected)
  );

  return (
    <div className='w-screen h-[95vh] flex flex-row gap-8 justify-center items-center'>
      <div className=' w-64 h-min-[50vh] flex flex-col p-4 border-2 rounded-xl relative gap-2'>
        <h3 className='text-xl font-semibold -top-4 absolute bg-white'>Available Recipients</h3>
        <Search options={options} onSelect={handleSelectRecipient} />
        {renderGroupedRecipients(availableGroupedRecipients, handleSelectRecipient, handleSelectOrganization)}
      </div>

      <div className=' w-64 h-[50vh] flex flex-col gap-2 p-4 border-2 rounded-xl relative'>
        <h3 className='text-xl font-semibold -top-4 absolute bg-white'>Selected Recipients</h3>
        {renderGroupedRecipients(selectedGroupedRecipients, handleSelectRecipient, handleSelectOrganization)}
      </div>
    </div>
  );
};

export default RecipientsManager;