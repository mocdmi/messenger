import { Button, LabelInput } from '@/components';
import { Block } from '@/core';
import { FormField, ThemeProps } from './types';

export default function blankTheme<TKey extends string>({
    config,
    props,
    submitLabel,
    handleInputChange,
    handleInputBlur,
}: ThemeProps<TKey>): Record<string, Block> {
    const children: Record<string, Block> = {};

    (Object.entries(config.formFields) as Array<[TKey, FormField]>).forEach(
        ([fieldName, field]) => {
            children[field.component] = new LabelInput({
                'theme-blank': true,
                'align-right': true,
                'placeholder-right': true,
                name: fieldName,
                value: props.form[fieldName].value ?? '',
                type: field.type,
                autocomplete: field.autocomplete,
                onChange: (e: Event) => handleInputChange(e, fieldName),
                onBlur: (e: Event) => handleInputBlur(e, fieldName, field.component),
            }) as Block;
        },
    );

    children.SubmitButton = new Button({
        'theme-default': true,
        label: submitLabel,
        type: 'submit',
    }) as Block;

    return children;
}
