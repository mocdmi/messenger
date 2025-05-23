export type InputType = 'text' | 'password' | 'email';
export type FormValidator = (value: string) => string;

export interface FormField {
    component: string;
    label: string;
    type: InputType;
    autocomplete?: string;
}

export type FormFieldState = {
    value: string;
    error: string;
};

export interface BaseFormProps {
    form: Record<string, FormFieldState>;
}

export interface FormConfig<TKey extends string> {
    formFields: Record<TKey, FormField>;
    validators: Record<TKey, FormValidator>;
}

export interface SubmitButtonProps {
    label: string;
}

export interface ThemeProps<TKey extends string> {
    config: FormConfig<TKey>;
    props: BaseFormProps;
    submitLabel: string;
    handleInputChange: (e: Event, fieldName: TKey) => void;
    handleInputBlur: (e: Event, fieldName: TKey, component: string) => void;
}
