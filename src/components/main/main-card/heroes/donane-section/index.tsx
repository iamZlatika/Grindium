import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { donate } from './useDonate';
import { Label } from '@/components/ui/label';
import { convertDonationToExp, convertExpToDonation, isValidNumberInput } from './helpers';

interface DonateFormProps {
  heroId: number | undefined;
}

const DonateForm = ({ heroId }: DonateFormProps) => {
  const [donateSum, setDonateSum] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = () => {
    if (!heroId || donateSum.length === 0) return;
    donate(heroId, donateSum);
  };

  const updateSyncedFields = (type: 'donate' | 'experience', value: string) => {
    if (!isValidNumberInput(value)) return;
    if (type === 'donate') {
      setDonateSum(value);
      setExperience(convertDonationToExp(value));
    } else {
      setExperience(value);
      setDonateSum(convertExpToDonation(value));
    }
  };
  return (
    <>
      <div className="ml-2">
        <Label>Your payment</Label>
        <Input
          value={donateSum}
          onChange={(e) => updateSyncedFields('donate', e.target.value)}
          inputMode="decimal"
          className="mt-2"
          placeholder="You will pay"
        />
      </div>
      <div className="ml-2">
        <Label>Your experience</Label>
        <Input
          value={experience}
          onChange={(e) => updateSyncedFields('experience', e.target.value)}
          inputMode="decimal"
          className="mt-2"
          placeholder="You will get"
        />
      </div>
      <Button disabled={!heroId || donateSum.length === 0} onClick={handleSubmit} className="ml-2">
        Donate
      </Button>
    </>
  );
};

export default DonateForm;
