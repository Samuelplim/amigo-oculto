import { ControllerProps as AControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { InputProps } from '../Input/Input';
export interface ControlledProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<AControllerProps<TFieldValues, TName>, 'render'> {
    label?: string;
    input?: InputProps;
}
