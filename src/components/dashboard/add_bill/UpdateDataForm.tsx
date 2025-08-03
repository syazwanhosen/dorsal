import { useState, FC, FormEvent } from 'react';
import { DateRange } from 'react-day-picker';
import { Label } from '@radix-ui/react-label';

// Components
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/buttons/button';
import { Input } from '@/components/ui/input';
import { PeriodDatePicker } from '@/components/ui/period-date-picker';

// Types
import { UpdateDataFormState } from '@/types';

const initialState: UpdateDataFormState = {
    billing: {
        billingDate: '',
        invoiceNumber: '',
    },
    patient: {
        fullName: '',
        patientId: '',
    },
    service: {
        description: '',
        amountPayable: '',
    },
};

export const UpdateDataForm: FC = () => {
    const [formState, setFormState] = useState<UpdateDataFormState>(initialState);
    const [autoHideFields, setAutoHideFields] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | Date[] | DateRange | undefined>(undefined);

    const handleChange = (
        section: keyof UpdateDataFormState,
        field: string,
        value: string
    ) => {
        setFormState((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert(JSON.stringify(formState));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl space-y-6 rounded-lg shadow-sm"
        >
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="auto-hide"
                    checked={autoHideFields}
                    onCheckedChange={(val) => setAutoHideFields(Boolean(val))}
                    label="Automatically hides specific fields"
                    variant="default"
                />
            </div>

            {/* Billing and Invoice Info */}
            <section>
                <h3 className="text-md mb-3 font-semibold text-gray-700">
                    Billing and Invoice Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <Label className="mb-1 block text-sm text-gray-600">Billing Date</Label>
                        <PeriodDatePicker
                            value={selectedDate}
                            onChange={setSelectedDate}
                            placeholder="DD/MM/YYYY"
                            className='w-full'
                        />
                    </div>
                    <div>
                        <Label className="mb-1 block text-sm text-gray-600">Invoice Number</Label>
                        <Input
                            type="text"
                            placeholder="Enter invoice number"
                            value={formState.billing.invoiceNumber}
                            onChange={(e) => handleChange('billing', 'invoiceNumber', e.target.value)}
                            className='border-gray-300 focus-visible:ring-0'
                        />
                    </div>
                </div>
            </section>

            {/* Patient Info */}
            <section>
                <h3 className="text-md mb-3 font-semibold text-gray-700">Patient Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <Label className="mb-1 block text-sm text-gray-600">Full Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter full name"
                            value={formState.patient.fullName}
                            onChange={(e) => handleChange('patient', 'fullName', e.target.value)}
                            className='border-gray-300 focus-visible:ring-0'
                        />
                    </div>
                    <div>
                        <Label className="mb-1 block text-sm text-gray-600">Patient ID</Label>
                        <Input
                            type="text"
                            placeholder="Enter patient ID"
                            value={formState.patient.patientId}
                            onChange={(e) => handleChange('patient', 'patientId', e.target.value)}
                            className='border-gray-300 focus-visible:ring-0'
                        />
                    </div>
                </div>
            </section>

            {/* Description of Services */}
            <section>
                <Label className="mb-1 block text-sm text-gray-600">Description of Services</Label>
                <Input
                    type="text"
                    placeholder="Enter description of service"
                    value={formState.service.description}
                    onChange={(e) => handleChange('service', 'description', e.target.value)}
                    className='border-gray-300 focus-visible:ring-0'
                />
            </section>

            {/* Amount Payable */}
            <section>
                <Label className="mb-1 block text-sm text-gray-600">Amount Payable</Label>
                <Input
                    type="text"
                    placeholder="Enter amount payable"
                    value={formState.service.amountPayable}
                    onChange={(e) => handleChange('service', 'amountPayable', e.target.value)}
                    className='border-gray-300 focus-visible:ring-0'
                />
            </section>

            {/* Submit */}
            <div className="flex justify-end mt-6">
                <Button type="submit" className="w-auto min-w-[120px] bg-purple">
                    Submit
                </Button>
            </div>
        </form>
    );
};
