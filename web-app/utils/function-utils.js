import noop from 'lodash/noop';

export const getInitialName = (name) =>
    name
        .split(' ')
        .map((x) => x.charAt(0))
        .join('')
        .substr(0, 2)
        .toUpperCase();

export const closeConfirmationModalObject = {
    open: false,
    onConfirmYesAction: noop,
    onConfirmNoAction: noop,
};

export const formatMoney = (amount) =>
    amount.toLocaleString('ID', {
        style: 'currency',
        currency: 'IDR',
    });

export const dateFormat = Object.freeze({
    INDONESIA_LONG: Symbol('INDONESIA_LONG'),
    SYSTEM: Symbol('SYSTEM'),
});

export const formatDate = (theDate, format = dateFormat.INDONESIA_LONG) => {
    const date = new Date(theDate);
    let dateTimeFormatter;

    switch (format) {
        case dateFormat.INDONESIA_LONG:
            dateTimeFormatter = new Intl.DateTimeFormat('ID', {
                dateStyle: 'long',
            });
            break;

        case dateFormat.SYSTEM:
            dateTimeFormatter = new Intl.DateTimeFormat('sv-SE');
            break;

        default:
            break;
    }
    return dateTimeFormatter.format(date);
};
