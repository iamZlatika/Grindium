import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { donate } from '../hooks/useDonate';

interface DonateFormProps {
  heroId: number | undefined;
}

const DonateForm = ({ heroId }: DonateFormProps) => {
  const [donateSum, setDonateSum] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDonateSum(value);
  };
  const handleDonate = (heroId: number | undefined, donateSum: string) => {
    if (!heroId || donateSum.length <= 0) return;
    donate(heroId, donateSum);
  };
  return (
    <>
      <Input value={donateSum} onChange={handleChange} className="ml-2" />
      <Button
        disabled={!heroId || donateSum.length <= 0}
        onClick={() => handleDonate(heroId, donateSum)}
        className="ml-2"
      >
        Donate
      </Button>
    </>
  );
};

export default DonateForm;
