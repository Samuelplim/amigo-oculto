'use client';
import { Controller, FieldValues } from 'react-hook-form';
import { Typography } from '../Typography';
import { ControlledProps } from './model';
import { Input } from '../Input';

export const InputControlled = <T extends FieldValues>({
    control,
    name,
    label,
    input,
    disabled,
}: ControlledProps<T>) => {
    return (
        <div className="space-y-2">
            <label>{label}</label>
            <Controller
                control={control}
                disabled={disabled}
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <>
                        {<Input {...field} {...input} />}
                        {error?.message && (
                            <Typography.Text variant={'warning'} size={'sm'}>
                                {error.message}
                            </Typography.Text>
                        )}
                    </>
                )}
            />
        </div>
    );
};
