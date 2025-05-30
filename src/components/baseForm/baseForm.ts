import { isEqual } from '@/helpers';
import {
    BaseFormProps,
    FormConfig,
    FormField,
    FormFieldState,
    SubmitButtonProps,
    ThemeProps,
} from './types';
import { Block } from '@/core';
import { LabelInput } from '@/components';

// TODO: Сделать, чтобы при не успешной отправке формы поля не сбрасывались
export default abstract class BaseForm<
    TProps extends BaseFormProps,
    TKey extends string = string,
> extends Block<TProps> {
    public readonly props: TProps;
    private config: FormConfig<TKey>;
    readonly children: Record<string, Block>;

    protected constructor(
        props: TProps,
        config: FormConfig<TKey>,
        submitButtonProps: SubmitButtonProps,
        buildChildren: (props: ThemeProps<TKey>) => Record<string, Block>,
    ) {
        const children: Record<string, Block> = buildChildren({
            config,
            props,
            submitLabel: submitButtonProps.label,
            handleInputChange: (e: Event, fieldName: TKey) => this.handleInputChange(e, fieldName),
            handleInputBlur: (e: Event, fieldName: TKey, component: string) =>
                this.handleInputBlur(e, fieldName, component),
        });

        super(
            'form',
            {
                ...props,
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: (e: Event) => this.handleSubmit(e),
                },
            },
            children,
        );

        this.props = props;
        this.config = config;
        this.children = children;
    }

    resetForm(): void {
        const newFormState: Record<TKey, FormFieldState> = {} as Record<TKey, FormFieldState>;

        (Object.entries(this.config.formFields) as Array<[TKey, FormField]>).forEach(
            ([fieldName, field]) => {
                const input = this.children[field.component] as LabelInput;

                input.setProps({
                    ...input.props,
                    value: '',
                    error: '',
                });

                newFormState[fieldName] = { value: '', error: '' };
            },
        );

        this.setProps({
            ...this.props,
            form: newFormState,
        });
    }

    private handleInputChange(e: Event, fieldName: TKey): void {
        const el = e.target as HTMLInputElement;

        this.setProps({
            ...this.props,
            form: {
                ...this.props.form,
                [fieldName]: {
                    ...this.props.form[fieldName],
                    value: el.value,
                },
            },
        });
    }

    private handleInputBlur(e: Event, fieldName: TKey, componentName: string): void {
        const el = e.target as HTMLInputElement;
        const input = this.children[componentName] as LabelInput;
        let error = '';

        if (fieldName in this.config.validators) {
            const validator = this.config.validators[fieldName];
            error = validator(el.value);
        }

        input.setProps({
            ...input.props,
            error: error,
        });

        this.setProps({
            ...this.props,
            form: {
                ...this.props.form,
                [fieldName]: {
                    ...this.props.form[fieldName],
                    value: el.value,
                    error: error,
                },
            },
        });
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        const errors: Record<string, string> = {};
        const formValues: Record<TKey, string> = {} as Record<TKey, string>;

        (Object.entries(this.config.formFields) as Array<[TKey, FormField]>).forEach(
            ([fieldName, field]) => {
                const input = this.children[field.component] as Block;
                const currentValue = this.props.form[fieldName].value;

                formValues[fieldName] = currentValue;

                if (input) {
                    input.setProps({
                        error: '',
                        value: currentValue,
                    });
                }
            },
        );

        Object.entries(this.props.form).forEach(([key, { value }]) => {
            if (key in this.config.validators) {
                const typedKey = key as TKey;
                const error = this.config.validators[typedKey](value);

                if (error) {
                    const fieldConfig = this.config.formFields[typedKey];
                    if (fieldConfig) {
                        const input = this.children[fieldConfig.component] as Block;
                        errors[key] = error;
                        input.setProps({
                            error,
                            value,
                        });
                    }
                }
            }
        });

        this.onSubmit(e, errors);
    }

    protected abstract onSubmit(e: Event, errors: Record<string, string>): void;

    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        if (!isEqual(oldProps, newProps)) {
            Object.entries(newProps.form).forEach(([key, value]) => {
                const field = this.config.formFields[key as TKey];
                const input = this.children[field.component] as Block;

                if (input) {
                    input.setProps({ value: value.value });
                }
            });

            return true;
        }

        return false;
    }
}
